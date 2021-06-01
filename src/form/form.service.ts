import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Student } from "../models/Student.entity";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { FormAnswerDto, FormAnswerFieldDto, FormDto, FormFieldDto, CreateFormAnswerRequest } from "./dto";
import { PermissionDeniedException } from "../exceptions";
import { Academician } from "../models/Academician.entity";
import { InstuteMember } from "../models/InstuteMember.entity";
import { ControllerUserObject } from "auth/strategies/jwt.strategy";
import { FormValidator } from "./form.validator";
import { ThesisTopicProposalState } from "../models/ThesisTopicProposal.entity";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private readonly formsRepo: EntityRepository<Form>,
    @InjectRepository(FormAnswer) private readonly formAnswersRepo: EntityRepository<FormAnswer>,
    @InjectRepository(FormField) private readonly formFieldsRepo: EntityRepository<FormField>,
    @InjectRepository(FormAnswerField) private readonly formAnswerFieldsRepo: EntityRepository<FormAnswerField>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
    @InjectRepository(Academician) private readonly academicanRepo: EntityRepository<Academician>,
    @InjectRepository(InstuteMember) private readonly instuteMemberRepo: EntityRepository<InstuteMember>,
    private validator: FormValidator,
  ) {}

  async getAll(): Promise<FormDto[]> {
    const forms = await this.formsRepo.findAll({ populate: ["form_fields"] });
    const result = forms.map((form) => {
      const formDto = FormDto.from(form);
      const formFields = form.form_fields.getItems();

      formFields.forEach((formField) => formDto.fields.push(FormFieldDto.from(formField)));

      return formDto;
    });

    return result;
  }

  async getOne(id: number): Promise<FormDto> {
    const form = await this.formsRepo.findOneOrFail({ id }, { populate: ["form_fields"] });
    const formDto = FormDto.from(form);
    const formFields = form.form_fields.getItems();

    formFields.forEach((formField) => formDto.fields.push(FormFieldDto.from(formField)));

    return formDto;
  }

  async getAnswers(user: ControllerUserObject, id: number): Promise<FormAnswerDto[]> {
    const models = await this.formAnswersRepo.find({ form: id, [user.role.toLowerCase()]: { id: user.id } }, [
      "answers",
    ]);

    const mapped = models.map(FormAnswerDto.from);
    for (let i = 0; i < mapped.length; i++) {
      const model = models[i];
      const dto = mapped[i];
      model.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));
    }

    return mapped;
  }

  async getAnswer(user: ControllerUserObject, id: number): Promise<FormAnswerDto> {
    const model = await this.formAnswersRepo.findOneOrFail({ id }, ["answers"]);
    const person = await this.getPerson(user);

    if (user.role === "STUDENT" && !this.validator.itItTheirFormAnswer(person, model))
      throw new PermissionDeniedException("The students can only see their form answers.");

    const dto = FormAnswerDto.from(model);
    model.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }

  async answer(user: ControllerUserObject, id: number, data: CreateFormAnswerRequest): Promise<FormAnswerDto> {
    const person = await this.getPerson(user);
    const form = await this.formsRepo.findOneOrFail({ id: id }, ["form_fields"]);

    if (!this.validator.hasAccessToAnswerForm(person, form))
      throw new PermissionDeniedException("The user is not subject of the given form.");

    if (person instanceof Student && !this.validator.isPreviousStepsDone(person, form))
      throw new PermissionDeniedException("The previous steps should be completed.");

    const fields = form.form_fields.getItems();

    const answer = new FormAnswer(form, person);
    data.fields.forEach(({ id, value }) =>
      answer.answers.add(
        new FormAnswerField(
          fields.find((f) => f.id === id),
          value,
          answer,
        ),
      ),
    );

    const studentIdField = fields.find((f) => f.type === 9999);
    if (studentIdField) {
      const studentIdAnswer = data.fields.find((f) => f.id === studentIdField.id);
      if (studentIdAnswer) {
        const student = await this.studentsRepo.findOneOrFail(Number(studentIdAnswer.value), ["proposes"]);
        if (form.id == 1) {
          const proposal = student.proposes.getItems().find((p) => p.advisor.id === person.id);
          if (proposal) proposal.status = ThesisTopicProposalState.FINISHED;
        }
        student.step_no += 1;
        this.studentsRepo.persist(student);
      }
    }

    await this.formsRepo.persistAndFlush(answer);
    this.studentsRepo.persist(person);

    const dto = FormAnswerDto.from(answer);
    answer.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }

  async updateAnswer(user: ControllerUserObject, id: number, data: CreateFormAnswerRequest): Promise<FormAnswerDto> {
    const formAnswer = await this.formAnswersRepo.findOneOrFail(
      { id: id, [user.role.toLowerCase()]: { id: user.id } },
      ["answers"],
    );
    const fields = formAnswer.answers.get();

    data.fields.forEach((field) => (fields.find((f) => f.id == field.id).value = field.value));

    await this.formAnswersRepo.flush();

    const dto = FormAnswerDto.from(formAnswer);
    formAnswer.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }

  private async getPerson(user: ControllerUserObject): Promise<Student | Academician | InstuteMember> {
    switch (user.role) {
      case "STUDENT":
        return await this.studentsRepo.findOneOrFail({ id: user.id });
      case "ACADEMICIAN":
        return await this.academicanRepo.findOneOrFail({ id: user.id });
      case "INSTITUTE_MEMBER":
        return await this.instuteMemberRepo.findOneOrFail({ id: user.id });
      default:
        return Promise.reject(new Error("Invalid user role."));
    }
  }
}

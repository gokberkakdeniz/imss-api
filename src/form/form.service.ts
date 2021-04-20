import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Student } from "../models/Student.entity";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { FormAnswerDto, FormAnswerFieldDto, FormDto, FormFieldDto, CreateFormAnswerRequest } from "./dto";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private readonly formsRepo: EntityRepository<Form>,
    @InjectRepository(FormAnswer) private readonly formAnswersRepo: EntityRepository<FormAnswer>,
    @InjectRepository(FormField) private readonly formFieldsRepo: EntityRepository<FormField>,
    @InjectRepository(FormAnswerField) private readonly formAnswerFieldsRepo: EntityRepository<FormAnswerField>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
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
    const form = await this.formsRepo.findOne({ id }, { populate: ["form_fields"] });
    const formDto = FormDto.from(form);
    const formFields = form.form_fields.getItems();

    formFields.forEach((formField) => formDto.fields.push(FormFieldDto.from(formField)));

    return formDto;
  }

  async getAnswers(id: number): Promise<FormAnswerDto[]> {
    const models = await this.formAnswersRepo.find({ form: id }, ["answers"]);

    const mapped = models.map(FormAnswerDto.from);
    for (let i = 0; i < mapped.length; i++) {
      const model = models[i];
      const dto = mapped[i];
      model.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));
    }

    return mapped;
  }

  async getAnswer(id: number): Promise<FormAnswerDto> {
    const model = await this.formAnswersRepo.findOneOrFail({ id }, ["answers"]);

    const dto = FormAnswerDto.from(model);
    model.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }

  async answer(userId: number, id: number, data: CreateFormAnswerRequest): Promise<FormAnswerDto> {
    // TODO: validate data
    const student = await this.studentsRepo.findOneOrFail({ id: userId });
    const form = await this.formsRepo.findOneOrFail({ id: id }, ["form_fields"]);
    const fields = form.form_fields.getItems();

    const answer = new FormAnswer(form, student);
    data.fields.forEach(({ id, value }) =>
      answer.answers.add(
        new FormAnswerField(
          fields.find((f) => f.id === id),
          value,
          answer,
        ),
      ),
    );

    await this.formsRepo.persistAndFlush(answer);

    const dto = FormAnswerDto.from(answer);
    answer.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }

  async updateAnswer(userId: number, id: number, data: CreateFormAnswerRequest): Promise<FormAnswerDto> {
    const formAnswer = await this.formAnswersRepo.findOneOrFail({ id: id, student: { id: userId } }, ["answers"]);
    const fields = formAnswer.answers.get();

    data.fields.forEach((field) => (fields.find((f) => f.id == field.id).value = field.value));

    await this.formAnswersRepo.flush();

    const dto = FormAnswerDto.from(formAnswer);
    formAnswer.answers.getItems().forEach((af) => dto.fields.push(FormAnswerFieldDto.from(af)));

    return dto;
  }
}

import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { CreateFormAnswerRequest, FormDto, FormFieldDto } from "./dto";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private readonly formsRepo: EntityRepository<Form>,
    @InjectRepository(FormAnswer) private readonly formAnswersRepo: EntityRepository<FormAnswer>,
    @InjectRepository(FormField) private readonly formFieldsRepo: EntityRepository<FormField>,
    @InjectRepository(FormAnswerField) private readonly formAnswerFieldsRepo: EntityRepository<FormAnswerField>,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAnswer(id: number): Promise<unknown> {
    // const form = await this.formAnswersRepo.findOne({ id });
    // return form;
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async answer(userId: number, id: number, data: CreateFormAnswerRequest): Promise<unknown> {
    // const form = await this.formsRepo.findOne({ id: id });

    // const answer = new FormAnswer();
    // const answerFields = data.fields.map((answerFieldDto) => new FormAnswerField());

    // const form = await this.formsRepo.findOne({ id: id });
    // if (!form) throw new Error("Form does not exist!");
    // const formField = await this.formFieldsRepo.findOne({ id: fields[0].field.id });
    // if (!formField) throw new Error("Form Field does not exist!");
    // //TODO check all fields to be has same field id
    // const formAnswer = new FormAnswer(form.name, form.sender_role, form.receiver_role, form);

    // await this.formsRepo.persistAndFlush(formAnswer);

    // return data;

    return null;
  }
}

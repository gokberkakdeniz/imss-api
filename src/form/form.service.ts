import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { FormDetailDto } from "./dto/form-detail";
import { SubmitFormRequestDto, SubmitFormResultDto } from "./dto/submit-form";

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private readonly formsRepo: EntityRepository<Form>,
    @InjectRepository(FormAnswer) private readonly formAnswersRepo: EntityRepository<FormAnswer>,
    @InjectRepository(FormField) private readonly formFieldsRepo: EntityRepository<FormField>,
    @InjectRepository(FormAnswerField) private readonly formAnswerFieldsRepo: EntityRepository<FormAnswerField>,
  ) {}

  async getAll(): Promise<(FormDetailDto | unknown)[]> {
    const forms = await this.formsRepo.findAll();
    return forms.map(
      (form: Form) =>
        ({ id: form.id, name: form.name, receiverRole: form.receiver_role, fields: form.form_fields } as FormDetailDto),
    );
  }

  async getOne(id: number): Promise<Form | unknown> {
    const form = await this.formsRepo.findOne({ id });

    return form;
  }

  async getAnswer(id: number): Promise<FormAnswer | unknown> {
    const form = await this.formAnswersRepo.findOne({ id });

    return form;
  }

  async create(data: SubmitFormRequestDto): Promise<SubmitFormResultDto> {
    const { id, fields } = data;

    const form = await this.formsRepo.findOne({ id: id });
    if (!form) throw new Error("Form does not exist!");
    const formField = await this.formFieldsRepo.findOne({ id: fields[0].field.id });
    if (!formField) throw new Error("Form Field does not exist!");
    //TODO check all fields to be has same field id
    const formAnswer = new FormAnswer(form.name, form.sender_role, form.receiver_role, form);

    await this.formsRepo.persistAndFlush(formAnswer);

    return data;
  }
}

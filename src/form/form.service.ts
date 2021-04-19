import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { FormDetailDto } from "./dto/form-detail";

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
    //TODO map coming forms to form detal dto
    return forms;
  }

  async getOne(id: number): Promise<FormDetailDto | unknown> {
    const form = await this.formsRepo.findOne(id);
    //TODO map coming form to form detail dto
    return form;
  }
}

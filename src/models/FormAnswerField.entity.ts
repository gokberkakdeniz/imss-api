import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { FormAnswer } from "./FormAnswer.entity";
import { FormField } from "./FormField.entity";

@Entity()
export class FormAnswerField {
  @PrimaryKey()
  id!: number;

  @Property()
  value: string;

  @ManyToOne()
  field!: FormField;

  @ManyToOne()
  form_answer!: FormAnswer;

  constructor(field: FormField, value: string, form_answer: FormAnswer) {
    this.field = field;
    this.value = value;
    this.form_answer = form_answer;
  }
}

import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
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
}

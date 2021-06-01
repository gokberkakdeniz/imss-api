import { Collection, Entity, Enum, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
import { FormAnswerField } from "./FormAnswerField.entity";

export enum FormFieldType {
  TEXT = 0,
  CHECKBOX = 1,
  SELECT = 2,
  DATE = 3,
  RADIO = 4,
  HIDDEN_STUDENT_ID = 9999,
}
@Entity()
export class FormField {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Enum()
  type: FormFieldType;

  @ManyToOne()
  form!: Form;

  @OneToMany(() => FormAnswerField, (faf) => faf.field)
  field_answer = new Collection<FormAnswerField>(this);
}

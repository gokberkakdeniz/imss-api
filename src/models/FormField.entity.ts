import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
import { FormAnswerField } from "./FormAnswerField.entity";

@Entity()
export class FormField {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  type: number;

  @ManyToOne()
  form!: Form;

  @OneToOne(() => FormAnswerField, (faf) => faf.field)
  field_answer!: FormAnswerField;
}

import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
import { FormAnswerField } from "./FormAnswerField.entity";
import { Student } from "./Student.entity";

@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  sender_role: number;

  @Property()
  receiver_role: number;

  @Property()
  template_url: number;

  @ManyToOne()
  student!: Student;

  @OneToMany(() => FormAnswerField, (fa) => fa.form_answer)
  answers = new Collection<FormAnswerField>(this);

  @ManyToOne()
  forms: Form;
}

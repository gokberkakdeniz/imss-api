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
  sender_role: string;

  @Property()
  receiver_role: string;

  @Property()
  template_url: string;

  @ManyToOne()
  student!: Student;

  @OneToMany(() => FormAnswerField, (fa) => fa.form_answer)
  answers = new Collection<FormAnswerField>(this);

  @ManyToOne()
  forms: Form;

  constructor(name: string, sender_role: string, receiver_role: string, fields:Collection<FormAnswerField>,form: Form) {
    this.name = name;
    this.sender_role = sender_role;
    this.receiver_role = receiver_role;
    this.answers = fields;
    this.forms = form;
  }
}

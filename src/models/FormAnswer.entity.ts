import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";
import { FormAnswerField } from "./FormAnswerField.entity";
import { Student } from "./Student.entity";

@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @Property()
  template_url: string;

  @ManyToOne()
  student!: Student;

  @OneToMany(() => FormAnswerField, (faf) => faf.form_answer)
  answers = new Collection<FormAnswerField>(this);

  @ManyToOne()
  form: Form;

  constructor(form: Form, student: Student) {
    this.form = form;
    this.student = student;
  }
}

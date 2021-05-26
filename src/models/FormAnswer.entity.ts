import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { SISBRole } from "external-services/obs-bridge";
import { Academician } from "./Academician.entity";
import { Form } from "./Form.entity";
import { FormAnswerField } from "./FormAnswerField.entity";
import { InstuteMember } from "./InstuteMember.entity";
import { Student } from "./Student.entity";

@Entity()
export class FormAnswer {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ nullable: true })
  student: Student;

  @ManyToOne({ nullable: true })
  academician: Academician;

  @ManyToOne({ nullable: true })
  institute_member: InstuteMember;

  @OneToMany(() => FormAnswerField, (faf) => faf.form_answer)
  answers = new Collection<FormAnswerField>(this);

  @ManyToOne()
  form: Form;

  constructor(form: Form, person: Student | Academician | InstuteMember) {
    this.form = form;

    if (person instanceof Student) {
      this.student = person;
    } else if (person instanceof Academician) {
      this.academician = person;
    } else if (person instanceof InstuteMember) {
      this.institute_member = person;
    }
  }

  getSender(): Student | Academician | InstuteMember {
    return this.academician || this.institute_member || this.student;
  }

  getSenderRole(): SISBRole {
    const person = this.getSender();

    if (person instanceof Student) {
      return "STUDENT";
    } else if (person instanceof Academician) {
      return "ACADEMICIAN";
    } else if (person instanceof InstuteMember) {
      return "INSTITUTE_MEMBER";
    }
  }
}

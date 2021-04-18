import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Academician } from "./Academician.entity";
import { Student } from "./Student.entity";

@Entity()
export class ThesisTopicProposal {
  @PrimaryKey()
  id!: number;

  @Property()
  title: string;

  @Property()
  description: string;

  @ManyToOne()
  student!: Student;

  @ManyToOne()
  advisor!: Academician;

  // TODO: acceptance/rejection field

  constructor(title: string, description: string, student: Student, advisor: Academician) {
    this.title = title;
    this.description = description;
    this.student = student;
    this.advisor = advisor;
  }
}

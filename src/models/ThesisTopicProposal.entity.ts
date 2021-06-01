import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Academician } from "./Academician.entity";
import { Student } from "./Student.entity";

export enum ThesisTopicProposalState {
  WAITING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
  FINISHED = 3,
}

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

  @Enum()
  status = ThesisTopicProposalState.WAITING;

  constructor(title: string, description: string, student: Student, advisor: Academician) {
    this.title = title;
    this.description = description;
    this.student = student;
    this.advisor = advisor;
  }
}

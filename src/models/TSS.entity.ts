import { Collection, Entity, ManyToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Academician } from "./Academician.entity";
import { Student } from "./Student.entity";

@Entity()
export class TSS {
  @PrimaryKey()
  id!: number;

  @Property()
  date: Date;

  @Property()
  place: string;

  @Property()
  plagiarism_rate: number;

  @OneToOne()
  student!: Student;

  @ManyToMany()
  juries = new Collection<Academician>(this);

  constructor(date: Date, place: string, plagiarism_rate: number, student: Student, juries: Academician[]) {
    this.date = date;
    this.place = place;
    this.plagiarism_rate = plagiarism_rate;
    this.student = student;
    juries.forEach((jury) => this.juries.add(jury));
  }
}

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
  plagiarism_rate: number;

  @OneToOne()
  student!: Student;

  @ManyToMany()
  juries = new Collection<Academician>(this);
}

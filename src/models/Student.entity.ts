import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Academician } from "./Academician.entity";
import { ThesisTopicProposal } from "./ThesisTopicProposal.entity";

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @Property()
  obs_user_id: string;

  @Property()
  step_no: number;

  @ManyToOne()
  advisor!: Academician;

  @OneToMany(() => ThesisTopicProposal, (ttp) => ttp.student)
  proposes = new Collection<Student>(this);
}

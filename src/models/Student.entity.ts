import { Collection, Entity, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Academician } from "./Academician.entity";
import { FormAnswer } from "./FormAnswer.entity";
import { ThesisTopicProposal } from "./ThesisTopicProposal.entity";
import { TSS } from "./TSS.entity";

@Entity()
export class Student {
  @PrimaryKey()
  id!: number;

  @Property()
  obs_user_id!: number;

  @Property()
  step_no: number;

  @ManyToOne()
  advisor!: Academician;

  @OneToMany(() => ThesisTopicProposal, (ttp) => ttp.student)
  proposes = new Collection<ThesisTopicProposal>(this);

  @OneToMany(() => FormAnswer, (fa) => fa.student)
  answers = new Collection<Student>(this);

  @OneToOne(() => TSS, (tss) => tss.student)
  tss!: TSS;
}

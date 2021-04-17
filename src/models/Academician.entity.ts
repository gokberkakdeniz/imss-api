import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Student } from "./Student.entity";
import { ThesisTopicProposal } from "./ThesisTopicProposal.entity";
import { TSS } from "./TSS.entity";

@Entity()
export class Academician {
  @PrimaryKey()
  id!: number;

  @Property()
  obs_user_id: string;

  @OneToMany(() => Student, (student) => student.advisor)
  advised_students = new Collection<Student>(this);

  @ManyToMany(() => TSS, (tss) => tss.juries)
  assigned_tsss = new Collection<TSS>(this);

  @OneToMany(() => ThesisTopicProposal, (ttp) => ttp.advisor)
  thesis_topic_proposals = new Collection<Academician>(this);
}

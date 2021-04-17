import { Entity, ManyToOne, OneToOne, Property } from "@mikro-orm/core";

@Entity()
export class FormAnswerField {
  id: number;

  @ManyToOne()
  formAnswerId: number;

  @OneToOne()
  formFieldId: number;

  @Property()
  value: string;
}

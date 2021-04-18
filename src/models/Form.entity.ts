import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { FormAnswer } from "./FormAnswer.entity";
import { FormField } from "./FormField.entity";
import { InstuteMember } from "./InstuteMember.entity";

@Entity()
export class Form {
  @PrimaryKey()
  id!: number;

  @Property()
  name: string;

  @Property()
  sender_role: string;

  @Property()
  receiver_role: string;

  @ManyToMany()
  instute_members = new Collection<InstuteMember>(this);

  @OneToMany(() => FormField, (ff) => ff.form)
  form_fields = new Collection<FormField>(this);

  @OneToMany(() => FormAnswer, (fa) => fa.forms)
  answers = new Collection<FormAnswer>(this);
}

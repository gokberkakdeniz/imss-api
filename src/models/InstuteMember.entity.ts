import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Form } from "./Form.entity";

@Entity()
export class InstuteMember {
  @PrimaryKey()
  id!: number;

  @Property()
  obs_user_id: number;

  @Property()
  role: string;

  @ManyToMany(() => Form, (form) => form.instute_members)
  forms = new Collection<Form>(this);
}

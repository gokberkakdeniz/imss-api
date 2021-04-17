import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Academician {
  @PrimaryKey()
  id!: number;

  @Property()
  obs_user_id: string;
}

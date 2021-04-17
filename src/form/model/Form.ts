import { SISBRole } from "../../external-services/obs-bridge";
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Form {
  @PrimaryKey()
  id: number;
  @Property()
  name: string;
  @Property()
  senderRole: SISBRole;
  @Property()
  receiverRole: SISBRole;
  @Property()
  templateURL: string;
}

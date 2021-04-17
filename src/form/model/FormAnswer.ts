import { SISBRole } from "../../external-services/obs-bridge";
import { Entity, ManyToOne, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { FormField } from "./FormField";

@Entity()
export class FormAnswer {
  @PrimaryKey()
  id: number;
  @Property()
  name: string;
  @OneToOne()
  senderId: number;
  @Property()
  receiverRole: SISBRole;
  @ManyToOne(() => FormField) // Burdan emin değiliz
  formFieldId: number;
  @OneToOne()
  formId: number;
}

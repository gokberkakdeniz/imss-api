
import { Collection } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerField } from "../../models/FormAnswerField.entity";
import { FormField } from "../../models/FormField.entity";

export class FormAnswerDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiverRole: string;
  @ApiProperty()
  fields: Collection<FormAnswerField>;
}

export class FormDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiverRole: string;
  @ApiProperty()
  fields: Collection<FormField>;
}

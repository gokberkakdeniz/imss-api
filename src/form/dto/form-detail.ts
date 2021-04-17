import { FormAnswerField } from "../model/FormAnswerField";
import { ApiProperty } from "@nestjs/swagger";
import { FormField } from "../model/FormField";

export class FormAnswerDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiverRole: string;
  senderId: number;
  @ApiProperty()
  fields: FormAnswerField[];
}

export class FormDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  receiverRole: string;
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  fields: FormField[];
}

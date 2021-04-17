import { FormAnswerField } from "../model/FormAnswerField";
import { ApiProperty } from "@nestjs/swagger";

export class SubmitFormResultDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fields: FormAnswerField[];
}

export class SubmitFormRequestDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  fields: FormAnswerField[];
}

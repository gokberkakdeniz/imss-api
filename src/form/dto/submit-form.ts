
import { Collection } from "@mikro-orm/core";
import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerField } from "../../models/FormAnswerField.entity";

export class SubmitFormResultDto {
  @ApiProperty()
  id: number;
  @ApiProperty({type: [FormAnswerField],})
  fields: Collection<FormAnswerField>;
}

export class SubmitFormRequestDto {
  @ApiProperty()
  id: number;
  @ApiProperty({type: [FormAnswerField],})
  fields: Collection<FormAnswerField>;
}

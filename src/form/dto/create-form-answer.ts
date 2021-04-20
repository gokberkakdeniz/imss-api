import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerFieldDto } from "./form";
import { GetFormAnswerResponse } from "./get-form-answer";

export class CreateFormAnswerRequest {
  @ApiProperty({ type: [FormAnswerFieldDto] })
  fields: FormAnswerFieldDto[];
}

export class CreateFormAnswerResponse extends GetFormAnswerResponse {}

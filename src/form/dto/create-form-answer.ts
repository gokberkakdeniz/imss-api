import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerFieldDto } from "./form";

export class CreateFormAnswerRequest {
  @ApiProperty({ type: [FormAnswerFieldDto] })
  fields: FormAnswerFieldDto[];
}

export class CreateFormAnswerResponse {}

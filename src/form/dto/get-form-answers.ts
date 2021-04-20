import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerDto } from "./form";

export class GetFormAnswersResponse {
  @ApiProperty({ type: [FormAnswerDto] })
  form_answers: FormAnswerDto[];
}

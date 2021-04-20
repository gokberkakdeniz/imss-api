import { ApiProperty } from "@nestjs/swagger";
import { FormAnswerDto } from "./form";

export class GetFormAnswerResponse {
  @ApiProperty()
  form_answer: FormAnswerDto;
}

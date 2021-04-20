import { ApiProperty } from "@nestjs/swagger";
import { FormDto } from "./form";

export class GetFormResponse {
  @ApiProperty()
  form: FormDto;
}

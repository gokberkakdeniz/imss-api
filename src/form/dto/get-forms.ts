import { ApiProperty } from "@nestjs/swagger";
import { FormDto } from "./form";

export class GetFormsResponse {
  @ApiProperty({ type: [FormDto] })
  forms: FormDto[];
}

import { ApiProperty } from "@nestjs/swagger";
import { TSSDto } from "./tss";

export class GetTssDto {
  @ApiProperty({ type: TSSDto })
  tss: TSSDto;
}

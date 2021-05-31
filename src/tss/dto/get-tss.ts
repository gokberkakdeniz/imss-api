import { ApiProperty } from "@nestjs/swagger";
import { TSSDto } from "./tss";

export class GetAllTssDto {
  @ApiProperty({ type: [TSSDto] })
  tsss: TSSDto[];
}

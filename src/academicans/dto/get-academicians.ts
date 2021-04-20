import { ApiProperty } from "@nestjs/swagger";
import { SISBUserDto } from "external-services/obs-bridge";

export class GetAcademiciansResult {}

export class GetAcademiciansOfUserDto {
  @ApiProperty({ type: GetAcademiciansResult })
  data: SISBUserDto[];

  constructor(data: SISBUserDto[]) {
    this.data = data;
  }
}

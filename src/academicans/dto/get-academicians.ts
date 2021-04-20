import { ApiProperty } from "@nestjs/swagger";
import { SISBUserDto } from "external-services/obs-bridge";

export class GetAcademiciansResult {}

export class GetAcademiciansOfUser {
  @ApiProperty({ type: GetAcademiciansResult })
  data: SISBUserDto[];
  constructor(data: SISBUserDto[]) {
    this.data = data;
  }

  static from(model: SISBUserDto[]): GetAcademiciansOfUser {
    const dto = new GetAcademiciansOfUser(model);
    return dto;
  }
}

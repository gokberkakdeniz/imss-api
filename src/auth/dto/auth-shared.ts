import type { SISBRole } from "../../external-services/obs-bridge";
import { ApiProperty } from "@nestjs/swagger";

export class UserDetailsObject {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty({
    enumName: "SISBRole",
    enum: ["STUDENT", "ACADEMICIAN", "INSTITUTE_MEMBER"],
  })
  role: SISBRole;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  department?: string;

  @ApiProperty()
  gpa?: number;

  @ApiProperty()
  semester?: number;
}

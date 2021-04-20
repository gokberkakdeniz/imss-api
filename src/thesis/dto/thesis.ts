import { ApiProperty } from "@nestjs/swagger";
import { Academician } from "../../models/Academician.entity";
import { Student } from "../../models/Student.entity";

export class ThesisTopicProposalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: "number" })
  student: Student;

  @ApiProperty({ type: "number" })
  advisor: Academician;

  @ApiProperty()
  status: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { SISBUserDto } from "external-services/obs-bridge";

export class FailedStudentResponse {
  @ApiProperty({ nullable: false })
  name: string;

  @ApiProperty({ nullable: false })
  gpa: number;

  @ApiProperty({ nullable: false })
  semester: number;

  @ApiProperty({ nullable: false })
  department: string;

  @ApiProperty({ nullable: true })
  reason: string;

  constructor(name: string, gpa: number, semester: number, department: string, reason: string) {
    this.name = name;
    this.gpa = gpa;
    this.semester = semester;
    this.department = department;
    this.reason = reason;
  }

  static from(model: SISBUserDto, reason: string): FailedStudentResponse {
    const dto = new FailedStudentResponse(
      model.name + " " + model.surname,
      model.gpa,
      model.semester,
      model.department,
      reason,
    );

    return dto;
  }
}

export class FailedStudentsResponse {
  @ApiProperty()
  failedStudents: FailedStudentResponse[];
  constructor(students: FailedStudentResponse[]) {
    this.failedStudents = students;
  }
}

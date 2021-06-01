import { Controller, Get, Req } from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/decorators";
import { FailedStudentsResponse, GetStudentStatusResponse } from "./dto";
import { StudentService } from "./student.service";
import { Request } from "express";

@ApiTags("student")
@ApiOAuth2([])
@Controller("student")
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get("status")
  @Roles("STUDENT")
  @ApiOperation({
    summary: "Get students status",
  })
  @ApiResponse({
    status: 200,
    description: "Student status",
    type: GetStudentStatusResponse,
  })
  async getStudentStatus(@Req() req: Request): Promise<GetStudentStatusResponse> {
    const status = await this.studentService.getStudentStatus(req.user);
    return status;
  }

  @Get("failed")
  @Roles("INSTITUTE_MEMBER")
  @ApiOperation({
    summary: "Get failed students",
  })
  @ApiResponse({
    status: 200,
    description: "Failed students",
    type: FailedStudentsResponse,
  })
  async getFailedStudents(@Req() req: Request): Promise<FailedStudentsResponse> {
    const failedStudents = await this.studentService.getFailedStudents(req.user);
    return failedStudents;
  }
}

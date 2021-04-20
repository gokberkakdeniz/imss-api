import { Controller, Get, Req } from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AcademicansService } from "./academicans.service";
import { Request } from "express";
import { Roles } from "auth/decorators";
import { GetAcademiciansOfUser } from "./dto/get-academicians";
@ApiTags("academicians")
@ApiOAuth2([])
@Controller("academicians")
export class AcademicansController {
  constructor(private academicianService: AcademicansService) {}

  @Get()
  @Roles("STUDENT")
  @ApiOperation({ summary: "Get all academicians in the department" })
  @ApiResponse({
    status: 200,
    description: "All academicians",
    type: [GetAcademiciansOfUser],
  })
  async getAcademicians(@Req() req: Request): Promise<GetAcademiciansOfUser> {
    const academicians = await this.academicianService.getAcademicians(req.user.id);
    return academicians;
  }
}

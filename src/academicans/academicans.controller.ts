import { Controller, Get, Req } from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SISBUsersResult } from "external-services/obs-bridge";
import { AcademicansService } from "./academicans.service";
import { Request } from "express";
@ApiTags("academicians")
@ApiOAuth2([])
@Controller("academicians")
export class AcademicansController {
  constructor(private academicianService: AcademicansService) {}

  @Get()
  @ApiOperation({ summary: "Get all academicians" })
  async getAcademicians(@Req() req: Request): Promise<SISBUsersResult> {
    const academicians = await this.academicianService.getAcademicians(req.user.id);
    return academicians;
  }
}

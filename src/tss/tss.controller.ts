import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiBody, ApiOAuth2, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TssService } from "./tss.service";
import { Request } from "express";
import {
  CreateTSSRequest,
  CreateTSSResponse,
  GetAllTssDto,
  GetTssDto,
  UpdateTSSRequest,
  UpdateTSSResponse,
} from "./dto";
import { Roles } from "../auth/decorators";

@ApiTags("tss")
@ApiOAuth2([])
@Controller("tss")
export class TssController {
  constructor(private tssService: TssService) {}

  @Get()
  @ApiOperation({ summary: "Get all thesis defence exam results" })
  @ApiResponse({
    status: 200,
    description: "All thesis defence exam results",
    type: GetAllTssDto,
  })
  async getAll(@Req() req: Request): Promise<GetAllTssDto> {
    const tsss = await this.tssService.getAll(req.user);

    return { tsss };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis defence exam result" })
  @ApiResponse({
    status: 200,
    description: "A thesis defence exam result with given id",
    type: GetTssDto,
  })
  async getOne(@Param("id", ParseIntPipe) id: number, @Req() req: Request): Promise<GetTssDto> {
    const tss = await this.tssService.getOne(req.user, id);

    return { tss };
  }

  @Patch(":id")
  @Roles("INSTITUTE_MEMBER", "ACADEMICIAN")
  @ApiOperation({ summary: "Update a thesis defence exam result" })
  @ApiBody({ type: UpdateTSSRequest })
  @ApiResponse({
    status: 200,
    description: "Updated thesis",
    type: UpdateTSSResponse,
  })
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateTSSRequest,
    @Req() req: Request,
  ): Promise<UpdateTSSResponse> {
    const tss = await this.tssService.updateOne(req.user, id, data);

    return { tss };
  }

  @Post()
  @Roles("INSTITUTE_MEMBER", "ACADEMICIAN")
  @ApiOperation({ summary: "Add thesis defence exam result" })
  @ApiBody({ type: CreateTSSRequest })
  @ApiResponse({
    status: 200,
    description: "Created thesis",
    type: CreateTSSResponse,
  })
  async crate(@Body() data: CreateTSSRequest, @Req() req: Request): Promise<CreateTSSResponse> {
    const tss = await this.tssService.create(req.user, data);

    return { tss };
  }
}

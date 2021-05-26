import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiOAuth2, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ThesisService } from "./thesis.service";
import { Request } from "express";
import { CreateThesisRequest, CreateThesisResponse, GetThesisResponse, GetThesesResponse } from "./dto";
import { Roles } from "../auth/decorators";
import {
  UpdateThesisRequest,
  UpdateThesisResponse,
  UpdateThesisStatusRequest,
  UpdateThesisStatusResponse,
} from "./dto/update-thesis";

@ApiTags("theses")
@ApiOAuth2([])
@Controller("theses")
export class ThesisController {
  constructor(private thesisService: ThesisService) {}

  @Post()
  @ApiOperation({ summary: "Create new thesis" })
  @Roles("STUDENT")
  @ApiBody({ type: CreateThesisRequest })
  @ApiResponse({
    status: 200,
    description: "Created thesis",
    type: CreateThesisResponse,
  })
  async create(@Body() body: CreateThesisRequest, @Req() req: Request): Promise<CreateThesisResponse> {
    const thesis = await this.thesisService.create(req.user, body);

    return { thesis };
  }

  @Get()
  @ApiOperation({ summary: "Get all thesis" })
  @ApiResponse({
    status: 200,
    description: "All theses",
    type: GetThesesResponse,
  })
  async getAll(@Req() req: Request): Promise<GetThesesResponse> {
    const theses = await this.thesisService.getAll(req.user);

    return { theses };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis" })
  @ApiResponse({
    status: 200,
    description: "Thesis with given id",
    type: GetThesisResponse,
  })
  async getOne(@Param("id", ParseIntPipe) id: number, @Req() req: Request): Promise<GetThesisResponse> {
    const thesis = await this.thesisService.getOne(req.user, id);

    return { thesis };
  }

  @Patch(":id")
  @Roles("STUDENT", "ACADEMICIAN")
  @ApiOperation({ summary: "Update a thesis" })
  @ApiBody({ type: UpdateThesisRequest })
  @ApiResponse({
    status: 200,
    description: "Updated thesis",
    type: UpdateThesisResponse,
  })
  async updateOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateThesisRequest,
    @Req() req: Request,
  ): Promise<UpdateThesisResponse> {
    const thesis = await this.thesisService.updateDetails(req.user, id, body);

    return { thesis };
  }

  @Patch(":id/status")
  @Roles("ACADEMICIAN")
  @ApiOperation({ summary: "Accept or reject thesis proposal" })
  @ApiBody({ type: UpdateThesisStatusRequest })
  @ApiResponse({
    status: 200,
    description: "Updated thesis",
    type: UpdateThesisStatusResponse,
  })
  async updateStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateThesisStatusRequest,
    @Req() req: Request,
  ): Promise<UpdateThesisStatusResponse> {
    const thesis = await this.thesisService.updateStatus(req.user, id, body);

    return { thesis };
  }
}

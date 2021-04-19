import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ThesisService } from "./thesis.service";
import { Request } from "express";
import { CreateThesisRequest, CreateThesisResponse, GetThesisResponse, GetThesesResponse } from "./dto";
import { Roles } from "../auth/decorators";
import { UpdateThesisRequest, UpdateThesisResponse } from "./dto/update-thesis";

@ApiTags("theses")
@ApiBearerAuth()
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
    const thesis = await this.thesisService.create(req.user.id, body);

    return { thesis };
  }

  @Get()
  @Roles("INSTITUTE_MEMBER", "ACADEMICIAN")
  @ApiOperation({ summary: "Get all thesis" })
  @ApiResponse({
    status: 200,
    description: "All theses",
    type: GetThesesResponse,
  })
  async getAll(): Promise<GetThesesResponse> {
    const theses = await this.thesisService.getAll();

    return { theses };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis" })
  @ApiResponse({
    status: 200,
    description: "Thesis with given id",
    type: GetThesisResponse,
  })
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<GetThesisResponse> {
    const thesis = await this.thesisService.getOne(id);

    return { thesis };
  }

  @Patch(":id")
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
  ): Promise<UpdateThesisResponse> {
    const thesis = await this.thesisService.updateOne(id, body);

    return { thesis };
  }
}

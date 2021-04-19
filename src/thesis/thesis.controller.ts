import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateThesisRequest, CreateThesisResponse } from "./dto/create-thesis";
import { ThesisService } from "./thesis.service";
import { Request } from "express";
import { GetThesisResponse } from "./dto/get-thesis";

@ApiTags("theses")
@ApiBearerAuth()
@Controller("theses")
export class ThesisController {
  constructor(private thesisService: ThesisService) {}

  @Post()
  @ApiOperation({ summary: "Create new thesis" })
  @ApiBody({ type: CreateThesisRequest })
  async create(@Body() body: CreateThesisRequest, @Req() req: Request): Promise<CreateThesisResponse> {
    const thesis = await this.thesisService.create(req.user?.id, body);

    return { thesis };
  }

  @Get()
  @ApiOperation({ summary: "Get all thesis" })
  getAll(): string {
    return `getAll()`;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis" })
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<GetThesisResponse> {
    const thesis = await this.thesisService.getOne(id);

    return { thesis };
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a thesis" })
  updateOne(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }
}

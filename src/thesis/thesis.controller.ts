import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateThesisRequest } from "./dto/create-thesis";
import { ThesisService } from "./thesis.service";

@ApiTags("theses")
@ApiBearerAuth()
@Controller("theses")
export class ThesisController {
  constructor(private thesisService: ThesisService) {}

  @Post()
  @ApiOperation({ summary: "Create new thesis" })
  @ApiBody({ type: CreateThesisRequest })
  create(@Body() body: CreateThesisRequest, @Req() req): any {
    console.log(req.user);

    return this.thesisService.create(req.user.id, body);
  }

  @Get()
  @ApiOperation({ summary: "Get all thesis" })
  getAll(): string {
    return `getAll()`;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis" })
  getOne(@Param("id", ParseIntPipe) id: number): string {
    return `getOne(${id})`;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a thesis" })
  updateOne(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }
}

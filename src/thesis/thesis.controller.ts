import { Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("theses")
@ApiBearerAuth()
@Controller("theses")
export class ThesisController {
  @Post()
  @ApiOperation({ summary: "Create new thesis" })
  create(): string {
    return "create";
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

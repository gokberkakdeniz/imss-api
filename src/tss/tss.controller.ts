import { Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiOAuth2, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("tss")
@ApiOAuth2([])
@Controller("tss")
export class TssController {
  @Post()
  @ApiOperation({ summary: "Add thesis defence exam result" })
  create(): string {
    return "create";
  }

  @Get()
  @ApiOperation({ summary: "Get all thesis defence exam results" })
  getAll(): string {
    return `getAll()`;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a thesis defence exam result" })
  getOne(@Param("id", ParseIntPipe) id: number): string {
    return `getOne(${id})`;
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a thesis defence exam result" })
  updateOne(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }
}

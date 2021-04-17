import { Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FormService } from "./form.service";

@ApiTags("forms")
@ApiBearerAuth()
@Controller("forms")
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  @ApiOperation({ summary: "Get all forms" })
  getAll(): string {
    return `getAll()`;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a form" })
  getOne(@Param("id", ParseIntPipe) id: number): string {
    return `getOne(${id})`;
  }

  @Post(":id/answer")
  @ApiOperation({ summary: "Fill a form" })
  createAnswer(): string {
    return "createAnswer";
  }

  @Get(":id/answer")
  @ApiOperation({ summary: "Get a form answer" })
  getAnswer(): string {
    return "getAnswer";
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a form" })
  updateOne(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }

  @Patch(":id/answer")
  @ApiOperation({ summary: "Update a form answer" })
  updateOneAnswer(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }
}

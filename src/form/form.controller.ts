import { Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FormDetailDto } from "./dto/form-detail";
import { FormService } from "./form.service";

@ApiTags("forms")
@ApiBearerAuth()
@Controller("forms")
export class FormController {
  constructor(private formService: FormService) {}

  // @ApiBody({ type: CreateThesisRequest })
  // create(@Body() body: CreateThesisRequest, @Req() req): any {
  //   return this.thesisService.create(req.user.id, body);
  // }
  @Get()
  @ApiOperation({ summary: "Get all forms" })
  getAll(): Promise<(FormDetailDto | unknown)[]> {
    return this.formService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a form" })
  getOne(@Param("id", ParseIntPipe) id: number): Promise<FormDetailDto | unknown> {
    return this.formService.getOne(id);
  }

  @Post(":id/answer")
  @ApiOperation({ summary: "Fill a form" })
  //@Body() body: SubmitFormRequestDto, @Req() req
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

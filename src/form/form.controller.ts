import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiOAuth2, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FormAnswerDetailDto, FormDetailDto } from "./dto/form-detail";
import { SubmitFormRequestDto, SubmitFormResultDto } from "./dto/submit-form";
import { FormService } from "./form.service";
@ApiTags("forms")
@ApiOAuth2([])
@Controller("forms")
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  @ApiOperation({ summary: "Get all forms" })
  getAll(): Promise<(FormDetailDto | unknown)[]> {
    return this.formService.getAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a form" })
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<FormDetailDto | unknown> {
    const form = await this.formService.getOne(id);
    return form;
  }

  @Post(":id/answer")
  @ApiOperation({ summary: "Fill a form" })
  @ApiBody({ type: SubmitFormRequestDto })
  async createAnswer(@Body() body: SubmitFormRequestDto): Promise<SubmitFormResultDto> {
    const formAnswer = await this.formService.create(body);
    return formAnswer;
  }

  @Get(":id/answer")
  @ApiOperation({ summary: "Get a form answer" })
  async getAnswer(@Param("id", ParseIntPipe) id: number): Promise<FormAnswerDetailDto | unknown> {
    const formAnswer = await this.formService.getAnswer(id);
    return formAnswer;
  }
  /*
  @Patch(":id")
  @ApiOperation({ summary: "Update a form" })
  updateOne(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }*/

  @Patch(":id/answer")
  @ApiOperation({ summary: "Update a form answer" })
  updateOneAnswer(@Param("id") id: string): string {
    return `updateOne(${id})`;
  }
}

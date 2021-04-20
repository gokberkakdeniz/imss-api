import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiOAuth2, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateFormAnswerRequest, CreateFormAnswerResponse, GetFormResponse, GetFormsResponse } from "./dto";
import { FormService } from "./form.service";
import { Request } from "express";

@ApiTags("forms")
@ApiOAuth2([])
@Controller("forms")
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  @ApiOperation({ summary: "Get all forms" })
  async getAll(): Promise<GetFormsResponse> {
    const forms = await this.formService.getAll();
    return { forms };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a form" })
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<GetFormResponse> {
    const form = await this.formService.getOne(id);
    return { form };
  }

  @Post(":id/answer")
  @ApiOperation({ summary: "Fill a form" })
  @ApiBody({ type: CreateFormAnswerRequest })
  async createAnswer(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: CreateFormAnswerRequest,
    @Req() req: Request,
  ): Promise<CreateFormAnswerResponse> {
    const formAnswer = await this.formService.answer(req.user.id, id, body);
    return formAnswer;
  }

  // @Get(":id/answer")
  // @ApiOperation({ summary: "Get a form answer" })
  // async getAnswer(@Param("id", ParseIntPipe) id: number): Promise<FormAnswerDetailDto | unknown> {
  //   const formAnswer = await this.formService.getAnswer(id);
  //   return formAnswer;
  // }
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

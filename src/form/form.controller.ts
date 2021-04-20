import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiOAuth2, ApiBody, ApiOperation, ApiTags, ApiResponse } from "@nestjs/swagger";
import {
  CreateFormAnswerResponse,
  GetFormResponse,
  GetFormsResponse,
  GetFormAnswerResponse,
  CreateFormAnswerRequest,
  UpdateFormAnswerRequest,
  UpdateFormAnswerResponse,
  GetFormAnswersResponse,
} from "./dto";
import { FormService } from "./form.service";
import { Request } from "express";

@ApiTags("forms")
@ApiOAuth2([])
@Controller("forms")
export class FormController {
  constructor(private formService: FormService) {}

  @Get()
  @ApiOperation({ summary: "Get all forms" })
  @ApiResponse({
    status: 200,
    description: "All forms",
    type: GetFormsResponse,
  })
  async getAll(): Promise<GetFormsResponse> {
    const forms = await this.formService.getAll();
    return { forms };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a form" })
  @ApiResponse({
    status: 200,
    description: "The form idenfied by given id",
    type: GetFormsResponse,
  })
  async getOne(@Param("id", ParseIntPipe) id: number): Promise<GetFormResponse> {
    const form = await this.formService.getOne(id);
    return { form };
  }

  @Post(":id/answer")
  @ApiOperation({ summary: "Fill a form" })
  @ApiBody({ type: CreateFormAnswerRequest })
  @ApiResponse({
    status: 200,
    description: "The created form",
    type: CreateFormAnswerResponse,
  })
  async createAnswer(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: CreateFormAnswerRequest,
    @Req() req: Request,
  ): Promise<CreateFormAnswerResponse> {
    const formAnswer = await this.formService.answer(req.user.id, id, body);
    return { form_answer: formAnswer };
  }

  @Get(":id/answer")
  @ApiOperation({ summary: "Get all form answers" })
  @ApiResponse({
    status: 200,
    description: "The form answer idenfied by given id",
    type: GetFormAnswersResponse,
  })
  async getAnswers(@Param("id", ParseIntPipe) id: number): Promise<GetFormAnswersResponse> {
    const formAnswers = await this.formService.getAnswers(id);
    return { form_answers: formAnswers };
  }

  @Get("answer/:id")
  @ApiOperation({ summary: "Get a form answer" })
  @ApiResponse({
    status: 200,
    description: "The form answer idenfied by given id",
    type: GetFormAnswerResponse,
  })
  async getAnswer(@Param("id", ParseIntPipe) id: number): Promise<GetFormAnswerResponse> {
    const formAnswer = await this.formService.getAnswer(id);
    return { form_answer: formAnswer };
  }

  @Patch("answer/:id")
  @ApiOperation({ summary: "Update a form answer" })
  @ApiResponse({
    status: 200,
    description: "The updated form answer idenfied by given id",
    type: UpdateFormAnswerResponse,
  })
  @ApiOperation({ summary: "Update a form answer" })
  async updateOneAnswer(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateFormAnswerRequest,
    @Req() req: Request,
  ): Promise<UpdateFormAnswerResponse> {
    const formAnswer = await this.formService.updateAnswer(req.user.id, id, body);
    return { form_answer: formAnswer };
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { Form } from "models/Form.entity";
import { FormAnswer } from "models/FormAnswer.entity";
import { FormAnswerField } from "models/FormAnswerField.entity";
import { FormField } from "models/FormField.entity";

export class FormAnswerFieldDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: string;

  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }

  static from(model: FormAnswerField): FormAnswerFieldDto {
    const dto = new FormAnswerFieldDto(model.id, model.value);

    return dto;
  }
}

export class FormAnswerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [FormAnswerFieldDto] })
  fields: FormAnswerFieldDto[];

  @ApiProperty()
  student_id: number;

  constructor(id: number, student_id: number) {
    this.id = id;
    this.student_id = student_id;
    this.fields = [];
  }

  static from(model: FormAnswer): FormAnswerDto {
    const dto = new FormAnswerDto(model.id, model.student.id);

    return dto;
  }
}

export class FormFieldDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: number;

  constructor(id: number, name: string, type: number) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  static from(model: FormField): FormFieldDto {
    const dto = new FormFieldDto(model.id, model.name, model.type);

    return dto;
  }
}

export class FormDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [FormFieldDto] })
  fields: FormFieldDto[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.fields = [];
  }

  static from(model: Form): FormDto {
    const dto = new FormDto(model.id, model.name);

    return dto;
  }
}

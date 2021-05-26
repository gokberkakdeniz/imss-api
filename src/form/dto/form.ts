import { ApiProperty } from "@nestjs/swagger";
import { SISBRole } from "external-services/obs-bridge";
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
  sender_id: number;

  @ApiProperty({ enum: ["ACADEMICIAN", "INSTITUTE_MEMBER", "STUDENT"] as SISBRole[] })
  sender_role: string;

  constructor(id: number, sender_id: number, sender_role: string) {
    this.id = id;
    this.sender_id = sender_id;
    this.sender_role = sender_role;
    this.fields = [];
  }

  static from(model: FormAnswer): FormAnswerDto {
    const dto = new FormAnswerDto(model.id, model.getSender().id, model.getSenderRole());

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

  @ApiProperty({ enum: ["ACADEMICIAN", "INSTITUTE_MEMBER", "STUDENT"] as SISBRole[] })
  sender_role: string;

  constructor(id: number, name: string, sender_role: string) {
    this.id = id;
    this.name = name;
    this.fields = [];
    this.sender_role = sender_role;
  }

  static from(model: Form): FormDto {
    const dto = new FormDto(model.id, model.name, model.sender_role);

    return dto;
  }
}

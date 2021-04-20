import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateThesisRequest, CreateThesisResponse } from "./create-thesis";

export class UpdateThesisRequest extends PartialType(OmitType(CreateThesisRequest, ["advisor_id"] as const)) {}

export class UpdateThesisResponse extends CreateThesisResponse {}

export class UpdateThesisStatusRequest {
  @ApiProperty()
  accept: boolean;
}

export class UpdateThesisStatusResponse extends CreateThesisResponse {}

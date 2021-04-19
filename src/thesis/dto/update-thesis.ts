import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateThesisRequest, CreateThesisResponse } from "./create-thesis";

export class UpdateThesisRequest extends PartialType(OmitType(CreateThesisRequest, ["advisor_id"] as const)) {}

export class UpdateThesisResponse extends CreateThesisResponse {}

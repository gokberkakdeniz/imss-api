import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateTSSResponse, CreateTSSRequest } from "./create-tss";

export class UpdateTSSRequest extends PartialType(OmitType(CreateTSSRequest, ["student_id"] as const)) {}

export class UpdateTSSResponse extends CreateTSSResponse {}

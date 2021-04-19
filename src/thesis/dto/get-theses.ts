import { ApiProperty } from "@nestjs/swagger";
import { ThesisTopicProposalDto } from "./thesis";

export class GetThesesResponse {
  @ApiProperty({ type: [ThesisTopicProposalDto] })
  theses: ThesisTopicProposalDto[];
}

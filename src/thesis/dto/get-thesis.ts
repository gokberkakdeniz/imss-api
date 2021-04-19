import { ApiProperty } from "@nestjs/swagger";
import { ThesisTopicProposal } from "../../models/ThesisTopicProposal.entity";

export class GetThesisResponse {
  @ApiProperty()
  thesis: ThesisTopicProposal;
}

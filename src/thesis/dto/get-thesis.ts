import { ApiProperty } from "@nestjs/swagger";
import { ThesisTopicProposalDto } from "./thesis";

export class GetThesisResponse {
  @ApiProperty()
  thesis: ThesisTopicProposalDto;
}

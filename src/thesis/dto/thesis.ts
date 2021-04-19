import { ApiProperty } from "@nestjs/swagger";

export class ThesisTopicProposalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}

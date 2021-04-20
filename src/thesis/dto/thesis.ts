import { ApiProperty } from "@nestjs/swagger";
import { ThesisTopicProposal, ThesisTopicProposalState } from "../../models/ThesisTopicProposal.entity";

type ThesisTopicProposalStateLiteral = keyof typeof ThesisTopicProposalState;

export class ThesisTopicProposalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  student_id: number;

  @ApiProperty()
  advisor_id: number;

  @ApiProperty({ enum: ["WAITING", "ACCEPTED", "REJECTED"] as ThesisTopicProposalStateLiteral[] })
  status: ThesisTopicProposalStateLiteral;

  constructor(
    id: number,
    title: string,
    description: string,
    student_id: number,
    advisor_id: number,
    status: ThesisTopicProposalStateLiteral,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.student_id = student_id;
    this.advisor_id = advisor_id;
    this.status = status;
  }

  static from(model: ThesisTopicProposal): ThesisTopicProposalDto {
    const dto = new ThesisTopicProposalDto(
      model.id,
      model.title,
      model.description,
      model.student.id,
      model.advisor.id,
      ThesisTopicProposalState[model.status] as ThesisTopicProposalStateLiteral,
    );

    return dto;
  }
}

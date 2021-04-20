import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { ThesisTopicProposal, ThesisTopicProposalState } from "../models/ThesisTopicProposal.entity";
import { CreateThesisRequest } from "./dto/create-thesis";
import { ThesisTopicProposalDto } from "./dto/thesis";
import { UpdateThesisRequest, UpdateThesisStatusRequest } from "./dto/update-thesis";

@Injectable()
export class ThesisService {
  constructor(
    @InjectRepository(ThesisTopicProposal) private readonly thesesRepo: EntityRepository<ThesisTopicProposal>,
    @InjectRepository(Academician) private readonly academiciansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
  ) {}

  async create(userId: number, data: CreateThesisRequest): Promise<ThesisTopicProposalDto> {
    const { title, description, advisor_id } = data;

    const student = await this.studentsRepo.findOne({ id: userId });
    const advisor = await this.academiciansRepo.findOne({ id: advisor_id });
    if (!advisor) throw new Error("Advisor does not exist!");

    const proposal = new ThesisTopicProposal(title, description, student, advisor);

    await this.thesesRepo.persistAndFlush(proposal);

    return ThesisTopicProposalDto.from(proposal);
  }

  async getAll(): Promise<ThesisTopicProposalDto[]> {
    const proposals = await this.thesesRepo.findAll();
    const result = proposals.map(ThesisTopicProposalDto.from);

    return result;
  }

  async getOne(id: number): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOne({ id });

    return ThesisTopicProposalDto.from(proposal);
  }

  async updateDetails(id: number, data: UpdateThesisRequest): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOne({ id });

    if (data.title) {
      proposal.title = data.title;
    }

    if (data.description) {
      proposal.description = data.description;
    }

    this.thesesRepo.flush();

    return ThesisTopicProposalDto.from(proposal);
  }

  async updateStatus(id: number, data: UpdateThesisStatusRequest): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOne({ id });

    if (data.accept) {
      proposal.status = ThesisTopicProposalState.ACCEPTED;
    } else {
      proposal.status = ThesisTopicProposalState.REJECTED;
    }

    this.thesesRepo.flush();

    return ThesisTopicProposalDto.from(proposal);
  }
}

import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { ControllerUserObject } from "auth/strategies/jwt.strategy";
import { PermissionDeniedException } from "../exceptions";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { ThesisTopicProposal, ThesisTopicProposalState } from "../models/ThesisTopicProposal.entity";
import { CreateThesisRequest } from "./dto/create-thesis";
import { ThesisTopicProposalDto } from "./dto/thesis";
import { UpdateThesisRequest, UpdateThesisStatusRequest } from "./dto/update-thesis";
import { ThesisValidator } from "./thesis.validator";

@Injectable()
export class ThesisService {
  constructor(
    @InjectRepository(ThesisTopicProposal) private readonly thesesRepo: EntityRepository<ThesisTopicProposal>,
    @InjectRepository(Academician) private readonly academiciansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
    private validator: ThesisValidator,
  ) {}

  async create(user: ControllerUserObject, data: CreateThesisRequest): Promise<ThesisTopicProposalDto> {
    const { title, description, advisor_id } = data;

    const student = await this.studentsRepo.findOneOrFail({ id: user.id });
    const advisor = await this.academiciansRepo.findOneOrFail({ id: advisor_id });

    if (!this.validator.memberOfSameDepartment(student, advisor))
      throw new PermissionDeniedException("The student and advisor must be in the same department.");

    const proposal = new ThesisTopicProposal(title, description, student, advisor);

    await this.thesesRepo.persistAndFlush(proposal);

    return ThesisTopicProposalDto.from(proposal);
  }

  async getAll(user: ControllerUserObject): Promise<ThesisTopicProposalDto[]> {
    const filters = {};

    if (user.role === "STUDENT") {
      filters["student"] = { id: user.id };
    } else if (user.role === "ACADEMICIAN") {
      filters["advisor"] = { id: user.id };
    }

    const proposals = await this.thesesRepo.find(filters);
    const result = proposals.map(ThesisTopicProposalDto.from);

    return result;
  }

  async getOne(user: ControllerUserObject, id: number): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOneOrFail({ id });

    if (!this.validator.canViewProposal(user, proposal))
      throw new PermissionDeniedException(
        "Only proposer student, proposed advisor and institute members can access the thesis topic proposal.",
      );

    return ThesisTopicProposalDto.from(proposal);
  }

  async updateDetails(
    user: ControllerUserObject,
    id: number,
    data: UpdateThesisRequest,
  ): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOneOrFail({ id });

    if (!this.validator.canUpdateProposal(user, proposal))
      throw new PermissionDeniedException(
        "Only proposer student and proposed advisor can update the thesis topic proposal.",
      );

    if (data.title) {
      proposal.title = data.title;
    }

    if (data.description) {
      proposal.description = data.description;
    }

    this.thesesRepo.flush();

    return ThesisTopicProposalDto.from(proposal);
  }

  async updateStatus(
    user: ControllerUserObject,
    id: number,
    data: UpdateThesisStatusRequest,
  ): Promise<ThesisTopicProposalDto> {
    const proposal = await this.thesesRepo.findOneOrFail({ id });

    if (!this.validator.canUpdateStatus(user, proposal))
      throw new PermissionDeniedException("Only proposed advisor can update the status of thesis topic proposal.");

    if (data.accept) {
      proposal.status = ThesisTopicProposalState.ACCEPTED;
    } else {
      proposal.status = ThesisTopicProposalState.REJECTED;
    }

    this.thesesRepo.flush();

    return ThesisTopicProposalDto.from(proposal);
  }
}

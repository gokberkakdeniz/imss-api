import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { ThesisTopicProposal } from "../models/ThesisTopicProposal.entity";
import { CreateThesisRequest } from "./dto/create-thesis";
import { UpdateThesisRequest } from "./dto/update-thesis";

@Injectable()
export class ThesisService {
  constructor(
    @InjectRepository(ThesisTopicProposal) private readonly thesesRepo: EntityRepository<ThesisTopicProposal>,
    @InjectRepository(Academician) private readonly academiciansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
  ) {}

  async create(userId: number, data: CreateThesisRequest): Promise<ThesisTopicProposal> {
    const { title, description, advisor_id } = data;

    const student = await this.studentsRepo.findOne({ id: userId });
    const advisor = await this.academiciansRepo.findOne({ id: advisor_id });
    if (!advisor) throw new Error("Advisor does not exist!");

    const proposal = new ThesisTopicProposal(title, description, student, advisor);

    await this.thesesRepo.persistAndFlush(proposal);

    return proposal;
  }

  async getAll(): Promise<ThesisTopicProposal[]> {
    const tpp = await this.thesesRepo.findAll();

    return tpp;
  }

  async getOne(id: number): Promise<ThesisTopicProposal> {
    const tpp = await this.thesesRepo.findOne({ id });

    return tpp;
  }

  async updateOne(id: number, data: UpdateThesisRequest): Promise<ThesisTopicProposal> {
    const tpp = await this.thesesRepo.findOne({ id });

    if (data.title) {
      tpp.title = data.title;
    }

    if (data.description) {
      tpp.description = data.description;
    }

    this.thesesRepo.flush();

    return tpp;
  }
}

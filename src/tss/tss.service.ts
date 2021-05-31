import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { ControllerUserObject } from "../auth/strategies/jwt.strategy";
import { IllegalStateException, PermissionDeniedException } from "../exceptions";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { TSS } from "../models/TSS.entity";
import { CreateTSSRequest, TSSDto, UpdateTSSRequest } from "./dto";
import { TssValidator } from "./tss.validator";

@Injectable()
export class TssService {
  constructor(
    @InjectRepository(TSS) private readonly tssRepo: EntityRepository<TSS>,
    @InjectRepository(Academician) private readonly academicianRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentRepo: EntityRepository<Student>,
    private readonly validator: TssValidator,
  ) {}

  async getAll(user: ControllerUserObject): Promise<TSSDto[]> {
    const filters = {};

    if (user.role === "STUDENT") {
      filters["student"] = { id: user.id };
    }

    let tsss = await this.tssRepo.find(filters, ["juries"]);

    if (user.role === "ACADEMICIAN") {
      tsss = tsss.filter((tss) => tss.juries.getItems().some((j) => j.id === user.id));
    }

    return tsss.map(TSSDto.from);
  }

  async getOne(user: ControllerUserObject, id: number): Promise<TSSDto> {
    const tss = await this.tssRepo.findOneOrFail({ id }, ["juries"]);

    if (!this.validator.canViewTSS(user, tss))
      throw new PermissionDeniedException(
        "Only the student, jury academicans and institute members can view the thesis topic proposal.",
      );

    return TSSDto.from(tss);
  }

  async updateOne(user: ControllerUserObject, id: number, data: UpdateTSSRequest): Promise<TSSDto> {
    const tss = await this.tssRepo.findOneOrFail({ id }, ["juries"]);

    if (data.date) {
      tss.date = new Date(data.date);
    }

    if (data.place) {
      tss.place = data.place;
    }

    if (data.plagiarism_rate) {
      tss.plagiarism_rate = data.plagiarism_rate;
    }

    if (data.jury_ids?.length > 0) {
      const juries = await this.academicianRepo.find({ id: { $in: data.jury_ids } });
      tss.juries.set(juries);
    }

    this.tssRepo.flush();

    return TSSDto.from(tss);
  }

  async create(user: ControllerUserObject, data: CreateTSSRequest): Promise<TSSDto> {
    if (!(await this.validator.studentMustNotHaveTSS(data.student_id)))
      throw new IllegalStateException("The student can only have exactly one TSS.");

    const juries = await this.academicianRepo.find(data.jury_ids);
    const student = await this.studentRepo.findOneOrFail({ id: data.student_id });

    const tss = new TSS(new Date(data.date), data.place, data.plagiarism_rate, student, juries);

    await this.tssRepo.persistAndFlush(tss);

    return TSSDto.from(tss);
  }
}

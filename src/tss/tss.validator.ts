import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { ControllerUserObject } from "../auth/strategies/jwt.strategy";
import { TSS } from "../models/TSS.entity";

@Injectable()
export class TssValidator {
  constructor(@InjectRepository(TSS) private readonly tssRepo: EntityRepository<TSS>) {}

  canViewTSS(user: ControllerUserObject, tss: TSS): boolean {
    return (
      user.role === "INSTITUTE_MEMBER" ||
      (user.role === "ACADEMICIAN" && tss.juries.getItems().some((j) => j.id === user.id)) ||
      (user.role === "STUDENT" && tss.student.id === user.id)
    );
  }

  async studentMustNotHaveTSS(studentId: number): Promise<boolean> {
    return (await this.tssRepo.count({ student: studentId })) === 0;
  }
}

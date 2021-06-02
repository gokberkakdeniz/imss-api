import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Student } from "../models/Student.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { ThesisTopicProposal } from "../models/ThesisTopicProposal.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { ResetDatabaseResponse } from "./dto";

@Injectable()
export class TestService {
  constructor(private readonly em: EntityManager) {}

  async resetDatabase(key: string): Promise<ResetDatabaseResponse> {
    if (key !== process.env.IMSS_RESET_KEY) return new ResetDatabaseResponse(false, "Reset key is invalid.");

    try {
      await this.em.begin();
      await Promise.all([
        this.em.nativeUpdate(Student, {}, { step_no: -1 }),
        this.em.nativeDelete(FormAnswerField, {}, {}),
        this.em.nativeDelete(FormAnswer, {}, {}),
        this.em.nativeDelete(ThesisTopicProposal, {}, {}),
      ]);
      await this.em.commit();
    } catch (error) {
      await this.em.rollback();
      return new ResetDatabaseResponse(false, "Reset failed due to SQL exception.");
    }

    return new ResetDatabaseResponse(false, "The database is reset.");
  }
}

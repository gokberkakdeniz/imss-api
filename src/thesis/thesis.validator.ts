import { Injectable } from "@nestjs/common";
import { ControllerUserObject } from "auth/strategies/jwt.strategy";
import { ThesisTopicProposal } from "models/ThesisTopicProposal.entity";
import { ObsBridgeService } from "../external-services/obs-bridge";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";

@Injectable()
export class ThesisValidator {
  constructor(private obsBridge: ObsBridgeService) {}

  async memberOfSameDepartment(student: Student, academician: Academician): Promise<boolean> {
    const studentAsObsUser = await this.obsBridge.getUserById(student.obs_user_id);
    const academicianAsObsUser = await this.obsBridge.getUserById(academician.obs_user_id);

    return studentAsObsUser.data?.department === academicianAsObsUser.data?.department;
  }

  canCreateProposal(student: Student): boolean {
    return student.step_no === -1;
  }

  canViewProposal(user: ControllerUserObject, proposal: ThesisTopicProposal): boolean {
    return (
      user.role === "INSTITUTE_MEMBER" ||
      (user.role === "ACADEMICIAN" && proposal.advisor.id === user.id) ||
      (user.role === "STUDENT" && proposal.student.id === user.id)
    );
  }

  canUpdateProposal(user: ControllerUserObject, proposal: ThesisTopicProposal): boolean {
    return (
      (user.role === "ACADEMICIAN" && proposal.advisor.id === user.id) ||
      (user.role === "STUDENT" && proposal.student.id === user.id)
    );
  }

  canUpdateStatus(user: ControllerUserObject, proposal: ThesisTopicProposal): boolean {
    return user.role === "ACADEMICIAN" && proposal.advisor.id === user.id;
  }
}

import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { InstuteMember } from "../models/InstuteMember.entity";
import ObsBridgeService, { SISBRole, SISBUserResult } from "../external-services/obs-bridge";
import { LoginResponse } from "./dto";

export interface JwtPayload {
  sub: number;
  role: SISBRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly obsBridgeService: ObsBridgeService,
    private readonly jwtService: JwtService,
    @InjectRepository(Academician) private readonly academicansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
    @InjectRepository(InstuteMember) private readonly instuteMemberRepo: EntityRepository<InstuteMember>,
  ) {}

  async validateUser(username: string, password: string): Promise<SISBUserResult> {
    const result = await this.obsBridgeService.getUserByCrediantals(username, password);

    if (result.success) {
      const { role, id } = result.data;
      let user: Academician | Student | InstuteMember;

      switch (role) {
        case "ACADEMICIAN":
          user = await this.academicansRepo.findOneOrFail({ obs_user_id: id });
          break;
        case "INSTITUTE_MEMBER":
          user = await this.instuteMemberRepo.findOneOrFail({ obs_user_id: id });
          break;
        case "STUDENT":
          user = await this.studentsRepo.findOneOrFail({ obs_user_id: id });
          break;
        default:
          throw new Error(`User role is invalid! Expected: ACADEMICIAN, INSTITUTE_MEMBER, or STUDENT. Found: ${role}`);
      }

      result.data.id = user.id;
    }

    return result;
  }

  async getToken(user: SISBUserResult["data"]): Promise<LoginResponse> {
    const payload: JwtPayload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}

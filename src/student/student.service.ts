import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, PreconditionFailedException } from "@nestjs/common";
import { InstuteMember } from "../models/InstuteMember.entity";
import { ControllerUserObject } from "../auth/strategies/jwt.strategy";
import { ObsBridgeService } from "../external-services/obs-bridge";
import { Student } from "../models/Student.entity";
import { FailedStudentResponse, FailedStudentsResponse, GetStudentStatusResponse } from "./dto";
import { steps } from "./types";
import { StudentValidator } from "./student.validator";
import { PermissionDeniedException } from "../exceptions";

@Injectable()
export class StudentService {
  constructor(
    private readonly obsBridgeService: ObsBridgeService,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
    @InjectRepository(InstuteMember) private readonly membersRepo: EntityRepository<InstuteMember>,
    private validator: StudentValidator,
  ) {}

  #steps = steps;

  async getStudentStatus(user: ControllerUserObject): Promise<GetStudentStatusResponse> {
    const student = await this.studentsRepo.findOneOrFail(user.id);

    const done = this.#steps[student.step_no] || null;
    const current = this.#steps[student.step_no + 1] || null;
    const next = this.#steps[student.step_no + 2] || null;

    return new GetStudentStatusResponse(done, current, next);
  }

  async getFailedStudents(user: ControllerUserObject): Promise<FailedStudentsResponse> {
    const member = await this.membersRepo.findOneOrFail(user.id);

    const result = this.validator.isInstuteMember(member);
    if (!result) {
      throw new PermissionDeniedException("Only Intstute Members can see failed students");
    }

    const students = await this.studentsRepo.findAll();
    const dto = new FailedStudentsResponse([]);
    for (const student of students) {
      const obsStudent = await this.obsBridgeService.getUserById(student.obs_user_id);
      if (!obsStudent.success) {
        throw new PreconditionFailedException("Students is not found in SISB");
      }
      const obsResult = this.validator.isSISBUserStudent(obsStudent.data);
      if (!obsResult) {
        throw new PreconditionFailedException("Given user is not a student");
      }
      const lookResult = await this.obsBridgeService.isStudentEligibleFor(student.obs_user_id);
      if (!lookResult.data) {
        dto.failedStudents.push(FailedStudentResponse.from(obsStudent.data, lookResult.error));
      }
    }
    return Promise.resolve(dto);
  }
}

import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import OBSBridge from "../external-services/obs-bridge";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { GetAcademiciansOfUserDto } from "./dto/get-academicians";

@Injectable()
export class AcademicansService {
  constructor(
    private readonly obsBridge: OBSBridge,
    @InjectRepository(Academician) private readonly academiciansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
  ) {}

  async getAcademicians(userId: number): Promise<GetAcademiciansOfUserDto> {
    const student = await this.studentsRepo.findOneOrFail({ id: userId });
    const obsStudent = this.obsBridge.getUserById(student.obs_user_id);
    const studentDepartment = (await obsStudent).data.department;
    const academicans = this.obsBridge.getAcademicansOfDepartment(studentDepartment);
    const academiciansResultDto = new GetAcademiciansOfUserDto((await academicans).data);
    return academiciansResultDto;
  }
}

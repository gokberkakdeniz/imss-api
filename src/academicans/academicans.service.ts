import { EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import OBSBridge, { SISBUsersResult } from "../external-services/obs-bridge";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";

@Injectable()
export class AcademicansService {
  constructor(
    private readonly obsBridge: OBSBridge,
    @InjectRepository(Academician) private readonly academiciansRepo: EntityRepository<Academician>,
    @InjectRepository(Student) private readonly studentsRepo: EntityRepository<Student>,
  ) {}

  async getAcademicians(userId: number): Promise<SISBUsersResult> {
    const student = await this.studentsRepo.findOne({ id: userId });
    if (!student) throw new Error("Student does not exist!");
    const obsStudent = this.obsBridge.getUserById(student.obs_user_id);
    if (!obsStudent) throw new Error("Student does not exist!");
    const studentDepartment = (await obsStudent).data.department;
    if (!studentDepartment) throw new Error("Student does not belong any department!");
    const academicans = this.obsBridge.getAcademicansOfDepartment(studentDepartment);
    return academicans;
  }
}

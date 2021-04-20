import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { AcademicansController } from "./academicans.controller";
import { AcademicansService } from "./academicans.service";
import OBSBridge from "../external-services/obs-bridge";
@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Student, Academician] })],
  controllers: [AcademicansController],
  providers: [AcademicansService, OBSBridge],
})
export class AcademicansModule {}

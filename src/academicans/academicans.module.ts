import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { AcademicansController } from "./academicans.controller";
import { AcademicansService } from "./academicans.service";
import { ObsBridgeModule } from "../external-services/obs-bridge";
@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Student, Academician] }), ObsBridgeModule],
  controllers: [AcademicansController],
  providers: [AcademicansService],
})
export class AcademicansModule {}

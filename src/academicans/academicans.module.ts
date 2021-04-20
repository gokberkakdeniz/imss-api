import { Module } from "@nestjs/common";
import { AcademicansController } from "./academicans.controller";
import { AcademicansService } from "./academicans.service";

@Module({
  controllers: [AcademicansController],
  providers: [AcademicansService],
})
export class AcademicansModule {}

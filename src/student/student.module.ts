import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { InstuteMember } from "../models/InstuteMember.entity";
import { ObsBridgeModule } from "../external-services/obs-bridge";
import { Student } from "../models/Student.entity";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { StudentValidator } from "./student.validator";

@Module({
  imports: [
    ObsBridgeModule,
    MikroOrmModule.forFeature({
      entities: [Student, InstuteMember],
    }),
  ],
  controllers: [StudentController],
  providers: [StudentService, StudentValidator],
})
export class StudentModule {}

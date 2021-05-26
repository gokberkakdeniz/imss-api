import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Student } from "../models/Student.entity";
import { Academician } from "../models/Academician.entity";
import { ThesisTopicProposal } from "../models/ThesisTopicProposal.entity";

import { ThesisController } from "./thesis.controller";
import { ThesisService } from "./thesis.service";
import { ThesisValidator } from "./thesis.validator";
import { ObsBridgeModule } from "../external-services/obs-bridge";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ThesisTopicProposal, Academician, Student] }), ObsBridgeModule],
  controllers: [ThesisController],
  providers: [ThesisService, ThesisValidator],
})
export class ThesisModule {}

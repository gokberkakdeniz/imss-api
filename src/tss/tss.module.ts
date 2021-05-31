import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { TSS } from "../models/TSS.entity";
import { TssController } from "./tss.controller";
import { TssService } from "./tss.service";
import { TssValidator } from "./tss.validator";

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [TSS, Academician, Student] })],
  controllers: [TssController],
  providers: [TssService, TssValidator],
})
export class TssModule {}

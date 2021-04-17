import { Module } from "@nestjs/common";
import { ThesisController } from "./thesis.controller";
import { ThesisService } from "./thesis.service";

@Module({
  controllers: [ThesisController],
  providers: [ThesisService],
})
export class ThesisModule {}

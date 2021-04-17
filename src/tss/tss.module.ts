import { Module } from "@nestjs/common";
import { TssController } from "./tss.controller";
import { TssService } from "./tss.service";

@Module({
  controllers: [TssController],
  providers: [TssService],
})
export class TssModule {}

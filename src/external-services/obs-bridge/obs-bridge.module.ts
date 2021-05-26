import { Module } from "@nestjs/common";
import { ObsBridgeService } from "./obs-bridge.service";

@Module({
  providers: [ObsBridgeService],
  exports: [ObsBridgeService],
})
export class ObsBridgeModule {}

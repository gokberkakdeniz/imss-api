import { Test } from "@nestjs/testing";
import ObsBridgeService from "./obs-bridge.service";

describe("ObsBridgeService", () => {
  let service: ObsBridgeService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ObsBridgeService],
    }).compile();

    service = module.get(ObsBridgeService);
  });

  it("should be defined", () => {
    expect(service).toBeTruthy();
  });
});

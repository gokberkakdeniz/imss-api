import { Test, TestingModule } from "@nestjs/testing";
import { TssService } from "./tss.service";

describe("TssService", () => {
  let service: TssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TssService],
    }).compile();

    service = module.get<TssService>(TssService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

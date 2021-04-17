import { Test, TestingModule } from "@nestjs/testing";
import { ThesisService } from "./thesis.service";

describe("ThesisService", () => {
  let service: ThesisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThesisService],
    }).compile();

    service = module.get<ThesisService>(ThesisService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { AcademicansService } from "./academicans.service";

describe("AcademicansService", () => {
  let service: AcademicansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademicansService],
    }).compile();

    service = module.get<AcademicansService>(AcademicansService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});

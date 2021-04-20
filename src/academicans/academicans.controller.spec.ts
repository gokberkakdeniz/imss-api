import { Test, TestingModule } from "@nestjs/testing";
import { AcademicansController } from "./academicans.controller";

describe("AcademicansController", () => {
  let controller: AcademicansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicansController],
    }).compile();

    controller = module.get<AcademicansController>(AcademicansController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

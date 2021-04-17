import { Test, TestingModule } from "@nestjs/testing";
import { ThesisController } from "./thesis.controller";

describe("ThesisController", () => {
  let controller: ThesisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThesisController],
    }).compile();

    controller = module.get<ThesisController>(ThesisController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

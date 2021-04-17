import { Test, TestingModule } from "@nestjs/testing";
import { TssController } from "./tss.controller";

describe("TssController", () => {
  let controller: TssController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TssController],
    }).compile();

    controller = module.get<TssController>(TssController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});

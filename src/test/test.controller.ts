import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorators";
import { ResetDatabaseResponse } from "./dto";
import { TestService } from "./test.service";

@Controller("test")
@ApiTags("test")
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get("reset-database")
  @Public()
  @ApiOperation({
    summary: "Reset database",
  })
  @ApiResponse({
    status: 200,
    description: "Reset status",
    type: ResetDatabaseResponse,
  })
  async resetDatabase(@Query("key") key: string): Promise<ResetDatabaseResponse> {
    return await this.testService.resetDatabase(key);
  }
}

import { ApiProperty } from "@nestjs/swagger";

export class ResetDatabaseResponse {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  constructor(success: boolean, message: string) {
    this.message = message;
    this.success = success;
  }
}

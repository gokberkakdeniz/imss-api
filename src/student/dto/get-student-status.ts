import { ApiProperty } from "@nestjs/swagger";
import { Step, steps } from "../types";

export class GetStudentStatusResponse {
  @ApiProperty({ enum: steps, nullable: true })
  done: Step | null;

  @ApiProperty({ enum: steps })
  current: Step;

  @ApiProperty({ enum: steps, nullable: true })
  next: Step | null;

  constructor(done: Step | null, current: Step, next: Step | null) {
    this.done = done;
    this.current = current;
    this.next = next;
  }
}

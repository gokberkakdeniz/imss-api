import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, MaxLength, MinLength } from "class-validator";

export class CreateThesisRequest {
  @ApiProperty()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @MaxLength(1000)
  description: string;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  advisor_id: number;
}

export class CreateThesisResponse {}

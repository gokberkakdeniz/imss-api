import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayMinSize,
  ArrayUnique,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";
import { TSSDto } from "./tss";

export class CreateTSSRequest {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(250)
  place: string;

  @ApiProperty()
  @IsPositive({ each: true })
  @IsInt({ each: true })
  @ArrayMinSize(3)
  @ArrayUnique()
  jury_ids: number[];

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(100)
  plagiarism_rate: number;

  @ApiProperty()
  @IsPositive()
  @IsInt()
  student_id: number;
}

export class CreateTSSResponse {
  @ApiProperty()
  tss: TSSDto;
}

import { ApiProperty } from "@nestjs/swagger";
import { TSS } from "models/TSS.entity";

export class TSSDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  place: string;

  @ApiProperty()
  plagiarism_rate: number;

  @ApiProperty()
  student_id: number;

  @ApiProperty()
  jury_ids: number[];

  constructor(id: number, date: Date, place: string, plagiarism_rate: number, student_id: number, jurie_ids: number[]) {
    this.id = id;
    this.date = new Date(date);
    this.plagiarism_rate = plagiarism_rate;
    this.student_id = student_id;
    this.jury_ids = [...jurie_ids];
    this.place = place;
  }

  static from(model: TSS): TSSDto {
    return new TSSDto(
      model.id,
      model.date,
      model.place,
      model.plagiarism_rate,
      model.student.id,
      model.juries.getItems().map((academician) => academician.id),
    );
  }
}

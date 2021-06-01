import { Injectable } from "@nestjs/common";
import { InstuteMember } from "../models/InstuteMember.entity";
import { SISBUserDto } from "../external-services/obs-bridge";

@Injectable()
export class StudentValidator {
  isInstuteMember(person: InstuteMember): boolean {
    return person.role === "INSTITUTE_MEMBER";
  }

  isSISBUserStudent(person: SISBUserDto): boolean {
    return person.gpa !== undefined && person.semester !== undefined && person.department !== undefined;
  }
}

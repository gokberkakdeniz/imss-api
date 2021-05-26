import { Injectable } from "@nestjs/common";
import { Academician } from "../models/Academician.entity";
import { Form } from "../models/Form.entity";
import { FormAnswer } from "../models/FormAnswer.entity";
import { InstuteMember } from "../models/InstuteMember.entity";
import { Student } from "../models/Student.entity";

@Injectable()
export class FormValidator {
  hasAccessToAnswerForm(person: Student | Academician | InstuteMember, form: Form): boolean {
    const userRole = person.constructor.name.toUpperCase();
    const formSenderRole = form.sender_role.replace("_", "").toUpperCase();

    return userRole === formSenderRole;
  }

  itItTheirFormAnswer(person: Student | Academician | InstuteMember, formAnswer: FormAnswer): boolean {
    const formAnswerSender = formAnswer.getSender();

    return formAnswerSender.id == person.id && formAnswerSender.obs_user_id === person.obs_user_id;
  }
}

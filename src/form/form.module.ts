import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { FormAnswer } from "../models/FormAnswer.entity";
import { FormAnswerField } from "../models/FormAnswerField.entity";
import { FormField } from "../models/FormField.entity";
import { Form } from "../models/Form.entity";
import { FormController } from "./form.controller";
import { FormService } from "./form.service";
import { Student } from "../models/Student.entity";
import { Academician } from "../models/Academician.entity";
import { InstuteMember } from "../models/InstuteMember.entity";
import { FormValidator } from "./form.validator";

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Form, FormAnswer, FormField, FormAnswerField, Student, Academician, InstuteMember],
    }),
  ],
  controllers: [FormController],
  providers: [FormService, FormValidator],
})
export class FormModule {}

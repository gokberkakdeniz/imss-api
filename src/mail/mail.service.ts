import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SISBUserDto } from "external-services/obs-bridge";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTestEmail(user: SISBUserDto): Promise<void> {
    if (user.email === "NULL") return;

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to Nice App! Confirm your Email",
      template: "./test",
      context: {
        name: user.name,
      },
    });
  }
}

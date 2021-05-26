import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import mg from "nodemailer-mailgun-transport";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: mg({
        auth: {
          api_key: process.env.IMSS_MAILGUN_API_KEY,
          domain: process.env.IMSS_MAILGUN_DOMAIN,
        },
      }),
      defaults: {
        from: `"IMSS Admin" <imss-noreply@${process.env.IMSS_MAILGUN_DOMAIN}>`,
      },
      template: {
        dir: __dirname + "/templates",
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

import { Module } from "@nestjs/common";
import { ThesisModule } from "./thesis/thesis.module";
import { AuthModule } from "./auth/auth.module";
import { FormModule } from "./form/form.module";
import { TssModule } from "./tss/tss.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { AcademicansModule } from "./academicans/academicans.module";
import { MailModule } from "./mail/mail.module";
import config from "./mikro-orm.config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ExceptionInterceptor } from "./interceptors";
import { ObsBridgeModule } from "./external-services/obs-bridge/obs-bridge.module";

@Module({
  imports: [
    MikroOrmModule.forRoot({ ...config }),
    ThesisModule,
    AuthModule,
    FormModule,
    TssModule,
    AcademicansModule,
    MailModule,
    ObsBridgeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    },
  ],
})
export class AppModule {}

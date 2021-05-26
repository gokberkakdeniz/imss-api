import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { LocalStrategy, JwtStrategy } from "./strategies";
import { RolesGuard, JwtAuthGuard } from "./guards";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ObsBridgeModule } from "../external-services/obs-bridge";
import { Academician } from "../models/Academician.entity";
import { Student } from "../models/Student.entity";
import { InstuteMember } from "../models/InstuteMember.entity";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.IMSS_JWT_SECRET,
      signOptions: { expiresIn: "60h" },
    }),
    MikroOrmModule.forFeature({ entities: [Academician, Student, InstuteMember] }),
    MailModule,
    ObsBridgeModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}

import { Module } from "@nestjs/common";
import { ThesisModule } from "./thesis/thesis.module";
import { AuthModule } from "./auth/auth.module";
import { FormModule } from "./form/form.module";
import { TssModule } from "./tss/tss.module";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import config from "./mikro-orm.config";

@Module({
  imports: [MikroOrmModule.forRoot({ ...config }), ThesisModule, AuthModule, FormModule, TssModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

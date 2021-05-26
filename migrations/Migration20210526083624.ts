import { Migration } from "@mikro-orm/migrations";

export class Migration20210526083624 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `form_answer` drop `template_url`;");
  }
}

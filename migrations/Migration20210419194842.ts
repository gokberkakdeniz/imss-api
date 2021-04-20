import { Migration } from "@mikro-orm/migrations";

export class Migration20210419194842 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `form_answer_field` drop index `form_answer_field_field_id_unique`;");
  }
}

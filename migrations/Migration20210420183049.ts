import { Migration } from "@mikro-orm/migrations";

export class Migration20210420183049 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `form_answer` change `forms_id` `form_id` int(11) unsigned not null;");

    this.addSql("alter table `form_answer` modify `template_url` varchar(255);");
    this.addSql("alter table `form_answer` drop `name`;");
    this.addSql("alter table `form_answer` drop `sender_role`;");
    this.addSql("alter table `form_answer` drop `receiver_role`;");
  }
}

import { Migration } from "@mikro-orm/migrations";

export class Migration20210531195216 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `form_answer` modify `form_id` int(11) unsigned not null;");

    this.addSql("alter table `tss` add `place` varchar(255) not null;");

    this.addSql("alter table `form_answer` drop index `form_answer_academican_id_index`;");
  }
}

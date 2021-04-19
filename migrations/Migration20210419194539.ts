import { Migration } from "@mikro-orm/migrations";

export class Migration20210419194539 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `thesis_topic_proposal` add `status` tinyint not null;");
  }
}

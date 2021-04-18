import { Migration } from "@mikro-orm/migrations";

export class Migration20210418193512 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `instute_member` modify `obs_user_id` int(11);");

    this.addSql("alter table `academician` modify `obs_user_id` int(11);");

    this.addSql("alter table `student` modify `obs_user_id` int(11);");
  }
}

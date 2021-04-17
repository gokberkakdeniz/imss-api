import { Migration } from "@mikro-orm/migrations";

export class Migration20210416200551 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `academician` (`id` int unsigned not null auto_increment primary key, `obs_user_id` varchar(255) not null) default character set utf8mb4 engine = InnoDB;",
    );
  }
}

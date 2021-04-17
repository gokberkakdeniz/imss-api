import { Migration } from "@mikro-orm/migrations";

export class Migration20210417204942 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `thesis_topic_proposal` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `description` varchar(255) not null, `student_id` int(11) unsigned not null, `advisor_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql(
      "alter table `thesis_topic_proposal` add index `thesis_topic_proposal_student_id_index`(`student_id`);",
    );
    this.addSql(
      "alter table `thesis_topic_proposal` add index `thesis_topic_proposal_advisor_id_index`(`advisor_id`);",
    );

    this.addSql(
      "alter table `thesis_topic_proposal` add constraint `thesis_topic_proposal_student_id_foreign` foreign key (`student_id`) references `student` (`id`) on update cascade;",
    );
    this.addSql(
      "alter table `thesis_topic_proposal` add constraint `thesis_topic_proposal_advisor_id_foreign` foreign key (`advisor_id`) references `academician` (`id`) on update cascade;",
    );
  }
}

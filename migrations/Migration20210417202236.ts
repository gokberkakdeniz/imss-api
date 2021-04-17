import { Migration } from "@mikro-orm/migrations";

export class Migration20210417202236 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "create table `student` (`id` int unsigned not null auto_increment primary key, `obs_user_id` varchar(255) not null, `step_no` int(11) not null, `advisor_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql("alter table `student` add index `student_advisor_id_index`(`advisor_id`);");

    this.addSql(
      "create table `tss` (`id` int unsigned not null auto_increment primary key, `date` datetime not null, `plagirsm_rate` int(11) not null, `student_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql("alter table `tss` add index `tss_student_id_index`(`student_id`);");
    this.addSql("alter table `tss` add unique `tss_student_id_unique`(`student_id`);");

    this.addSql(
      "create table `tss_juries` (`tss_id` int(11) unsigned not null, `academician_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql("alter table `tss_juries` add index `tss_juries_tss_id_index`(`tss_id`);");
    this.addSql("alter table `tss_juries` add index `tss_juries_academician_id_index`(`academician_id`);");
    this.addSql("alter table `tss_juries` add primary key `tss_juries_pkey`(`tss_id`, `academician_id`);");

    this.addSql(
      "alter table `student` add constraint `student_advisor_id_foreign` foreign key (`advisor_id`) references `academician` (`id`) on update cascade;",
    );

    this.addSql(
      "alter table `tss` add constraint `tss_student_id_foreign` foreign key (`student_id`) references `student` (`id`) on update cascade;",
    );

    this.addSql(
      "alter table `tss_juries` add constraint `tss_juries_tss_id_foreign` foreign key (`tss_id`) references `tss` (`id`) on update cascade on delete cascade;",
    );
    this.addSql(
      "alter table `tss_juries` add constraint `tss_juries_academician_id_foreign` foreign key (`academician_id`) references `academician` (`id`) on update cascade on delete cascade;",
    );
  }
}

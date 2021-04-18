import { Migration } from "@mikro-orm/migrations";

export class Migration20210418192419 extends Migration {
  async up(): Promise<void> {
    this.addSql("alter table `form_field` add `form_id` int(11) unsigned not null;");
    this.addSql("alter table `form_field` add index `form_field_form_id_index`(`form_id`);");

    this.addSql(
      "create table `form_instute_members` (`form_id` int(11) unsigned not null, `instute_member_id` int(11) unsigned not null) default character set utf8mb4 engine = InnoDB;",
    );
    this.addSql("alter table `form_instute_members` add index `form_instute_members_form_id_index`(`form_id`);");
    this.addSql(
      "alter table `form_instute_members` add index `form_instute_members_instute_member_id_index`(`instute_member_id`);",
    );
    this.addSql(
      "alter table `form_instute_members` add primary key `form_instute_members_pkey`(`form_id`, `instute_member_id`);",
    );

    this.addSql(
      "alter table `form_answer` add `student_id` int(11) unsigned not null, add `forms_id` int(11) unsigned not null;",
    );
    this.addSql("alter table `form_answer` add index `form_answer_student_id_index`(`student_id`);");
    this.addSql("alter table `form_answer` add index `form_answer_forms_id_index`(`forms_id`);");

    this.addSql(
      "alter table `form_answer_field` add `field_id` int(11) unsigned not null, add `form_answer_id` int(11) unsigned not null;",
    );
    this.addSql("alter table `form_answer_field` add index `form_answer_field_field_id_index`(`field_id`);");
    this.addSql("alter table `form_answer_field` add unique `form_answer_field_field_id_unique`(`field_id`);");
    this.addSql(
      "alter table `form_answer_field` add index `form_answer_field_form_answer_id_index`(`form_answer_id`);",
    );

    this.addSql("alter table `tss` change `plagirsm_rate` `plagiarism_rate` int(11) not null;");

    this.addSql(
      "alter table `form_field` add constraint `form_field_form_id_foreign` foreign key (`form_id`) references `form` (`id`) on update cascade;",
    );

    this.addSql(
      "alter table `form_instute_members` add constraint `form_instute_members_form_id_foreign` foreign key (`form_id`) references `form` (`id`) on update cascade on delete cascade;",
    );
    this.addSql(
      "alter table `form_instute_members` add constraint `form_instute_members_instute_member_id_foreign` foreign key (`instute_member_id`) references `instute_member` (`id`) on update cascade on delete cascade;",
    );

    this.addSql(
      "alter table `form_answer` add constraint `form_answer_student_id_foreign` foreign key (`student_id`) references `student` (`id`) on update cascade;",
    );
    this.addSql(
      "alter table `form_answer` add constraint `form_answer_forms_id_foreign` foreign key (`forms_id`) references `form` (`id`) on update cascade;",
    );

    this.addSql(
      "alter table `form_answer_field` add constraint `form_answer_field_field_id_foreign` foreign key (`field_id`) references `form_field` (`id`) on update cascade;",
    );
    this.addSql(
      "alter table `form_answer_field` add constraint `form_answer_field_form_answer_id_foreign` foreign key (`form_answer_id`) references `form_answer` (`id`) on update cascade;",
    );
  }
}

import { Migration } from "@mikro-orm/migrations";

export class Migration20210526084844 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      "alter table `form_answer` add `academican_id` int(11) unsigned null, add `institute_member_id` int(11) unsigned null;",
    );
    this.addSql("alter table `form_answer` modify `student_id` int(11) unsigned null;");
    this.addSql("alter table `form_answer` add index `form_answer_academican_id_index`(`academican_id`);");
    this.addSql("alter table `form_answer` add index `form_answer_institute_member_id_index`(`institute_member_id`);");

    this.addSql(
      "alter table `form_answer` add constraint `form_answer_academican_id_foreign` foreign key (`academican_id`) references `academician` (`id`) on update cascade on delete set null;",
    );
    this.addSql(
      "alter table `form_answer` add constraint `form_answer_institute_member_id_foreign` foreign key (`institute_member_id`) references `instute_member` (`id`) on update cascade on delete set null;",
    );
  }
}

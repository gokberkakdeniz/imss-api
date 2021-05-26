import { Migration } from '@mikro-orm/migrations';

export class Migration20210526105813 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `form_answer` change `academican_id` `academician_id` int(11) unsigned null;');


    this.addSql('alter table `form_answer` modify `student_id` int(11) unsigned, modify `institute_member_id` int(11) unsigned, modify `form_id` int(11) unsigned;');
    this.addSql('alter table `form_answer` drop index `form_answer_student_id_index`;');
    this.addSql('alter table `form_answer` add index `form_answer_student_id_index`(`student_id`);');
    this.addSql('alter table `form_answer` drop index `form_answer_institute_member_id_index`;');
    this.addSql('alter table `form_answer` add index `form_answer_institute_member_id_index`(`institute_member_id`);');
    this.addSql('alter table `form_answer` add index `form_answer_form_id_index`(`form_id`);');
  }

}

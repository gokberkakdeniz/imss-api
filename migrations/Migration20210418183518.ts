import { Migration } from '@mikro-orm/migrations';

export class Migration20210418183518 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `instute_member` (`id` int unsigned not null auto_increment primary key, `obs_user_id` varchar(255) not null, `role` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `form_field` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `type` int(11) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `form_answer_field` (`id` int unsigned not null auto_increment primary key, `value` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `form_answer` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `sender_role` int(11) not null, `receiver_role` int(11) not null, `template_url` int(11) not null) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `form` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `sender_role` varchar(255) not null, `receiver_role` varchar(255) not null) default character set utf8mb4 engine = InnoDB;');
  }

}

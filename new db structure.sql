/*

SQLyog Ultimate v8.55 
MySQL - 5.6.20 : Database - alumni

*********************************************************************

*/



/*!40101 SET NAMES utf8 */;



/*!40101 SET SQL_MODE=''*/;



/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`alumni` /*!40100 DEFAULT CHARACTER SET latin1 */;



USE `alumni`;



/*Table structure for table `alumni` */



DROP TABLE IF EXISTS `alumni`;



CREATE TABLE `alumni` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `mi` varchar(5) DEFAULT NULL,
  `nickname` varchar(100) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `program_id` tinyint(5) DEFAULT NULL,
  `batch` tinyint(10) DEFAULT NULL,
  `position` varchar(1000) DEFAULT NULL,
  `company` varchar(1000) DEFAULT NULL,
  `no_work` varchar(100) DEFAULT NULL,
  `no_home` varchar(100) DEFAULT NULL,
  `no_fax` varchar(100) DEFAULT NULL,
  `no_mobile` varchar(100) DEFAULT NULL,
  `email_prefer` varchar(100) DEFAULT NULL,
  `email_other` varchar(100) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `address` text,
  `photo` varchar(100) DEFAULT NULL,
  `created_by` int(9) DEFAULT NULL,
  `updated_by` int(9) DEFAULT NULL,
  `deleted_by` int(9) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4495 DEFAULT CHARSET=latin1;



/*Table structure for table `privilege` */



DROP TABLE IF EXISTS `privilege`;



CREATE TABLE `privilege` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(9) DEFAULT NULL,
  `key` varchar(50) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*Table structure for table `programs` */



DROP TABLE IF EXISTS `programs`;



CREATE TABLE `programs` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `acronym` varchar(50) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;



/*Table structure for table `settings` */



DROP TABLE IF EXISTS `settings`;



CREATE TABLE `settings` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



/*Table structure for table `user_program` */



DROP TABLE IF EXISTS `user_program`;



CREATE TABLE `user_program` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `user_id` int(9) DEFAULT NULL,
  `program_id` int(9) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;



/*Table structure for table `users` */



DROP TABLE IF EXISTS `users`;



CREATE TABLE `users` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `firstname` varchar(100) DEFAULT NULL,
  `lastname` varchar(100) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `last_logged` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


INSERT INTO privilege (user_id,`key`,`value`) VALUES(1,'rights','["admin","add_alumni","edit_alumni","delete_alumni"]');
INSERT INTO `alumni`.`privilege`(`id`,`user_id`,`key`,`value`) VALUES ( NULL,'1','viewables','[]');
UPDATE `alumni`.`privilege` SET `value`='{\"firstname\":\"Firstname\",\"lastname\":\"Lastname\",\"mi\":\"Mi\",\"nickname\":\"Nickname\",\"gender\":\"Gender\",\"batch\":\"Batch\",\"position\":\"Position\",\"company\":\"Company\",\"no_work\":\"Work No.\",\"no_home\":\"Home No.\",\"no_fax\":\"Fax No.\",\"no_mobile\":\"Mobile No.\",\"email_prefer\":\"Email\",\"email_other\":\"Alt Email\",\"birthday\":\"Birthday\",\"address\":\"Address\"}' WHERE `id`='2';
INSERT INTO `alumni`.`privilege`(`id`,`user_id`,`key`,`value`) VALUES ( '','1','editables','{\"firstname\":\"Firstname\",\"lastname\":\"Lastname\",\"mi\":\"Mi\",\"nickname\":\"Nickname\",\"gender\":\"Gender\",\"batch\":\"Batch\",\"position\":\"Position\",\"company\":\"Company\",\"no_work\":\"Work No.\",\"no_home\":\"Home No.\",\"no_fax\":\"Fax No.\",\"no_mobile\":\"Mobile No.\",\"birthday\":\"Birthday\",\"address\":\"Address\"}');

ALTER TABLE `alumni`.`alumni`     CHANGE `birthday` `birthday` DATE NULL ;

INSERT INTO `alumni`.`settings`(`id`,`key`,`value`) VALUES ( 1,'viewables','{\"firstname\":\"Firstname\",\"lastname\":\"Lastname\",\"mi\":\"Mi\",\"nickname\":\"Nickname\",\"gender\":\"Gender\",\"batch\":\"Batch\",\"position\":\"Position\",\"company\":\"Company\",\"no_work\":\"Work No.\",\"no_home\":\"Home No.\",\"no_fax\":\"Fax No.\",\"no_mobile\":\"Mobile No.\",\"email_prefer\":\"Email\",\"email_other\":\"Alt Email\",\"birthday\":\"Birthday\",\"address\":\"Address\"}');
INSERT INTO `alumni`.`settings`(`id`,`key`,`value`) VALUES ( 2,'editables','{\"firstname\":\"Firstname\",\"lastname\":\"Lastname\",\"mi\":\"Mi\",\"nickname\":\"Nickname\",\"gender\":\"Gender\",\"batch\":\"Batch\",\"position\":\"Position\",\"company\":\"Company\",\"no_work\":\"Work No.\",\"no_home\":\"Home No.\",\"no_fax\":\"Fax No.\",\"no_mobile\":\"Mobile No.\",\"email_prefer\":\"Email\",\"email_other\":\"Alt Email\",\"birthday\":\"Birthday\",\"address\":\"Address\"}');
UPDATE `alumni`.`settings` SET `value`='{\"firstname\":\"Firstname\",\"lastname\":\"Lastname\",\"mi\":\"Mi\",\"nickname\":\"Nickname\",\"gender\":\"Gender\",\"batch\":\"Batch\",\"position\":\"Position\",\"company\":\"Company\",\"no_work\":\"Work No.\",\"no_home\":\"Home No.\",\"no_fax\":\"Fax No.\",\"no_mobile\":\"Mobile No.\",\"email_prefer\":\"Email\",\"email_other\":\"Alt Email\",\"birthday\":\"Birthday\",\"address\":\"Address\",\"name\":\"Program\",\"acronym\":\"Acronym\"}' WHERE `id`='1';
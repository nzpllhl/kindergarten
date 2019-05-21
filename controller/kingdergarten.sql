/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.7.25 : Database - kindergarten
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kindergarten` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `kindergarten`;

/*Table structure for table `classes` */

DROP TABLE IF EXISTS `classes`;

CREATE TABLE `classes` (
  `c_id` int(4) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(10) DEFAULT NULL,
  `c_teacher` int(4) DEFAULT NULL,
  PRIMARY KEY (`c_id`),
  KEY `c_teacher` (`c_teacher`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`c_teacher`) REFERENCES `workers` (`w_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `classes` */

insert  into `classes`(`c_id`,`c_name`,`c_teacher`) values (1,'星星1班',1),(2,'月亮2班',2),(3,'火箭3班',3),(4,'卫星4班',1),(5,'飞船5班',2);

/*Table structure for table `heshe_admin_role` */

DROP TABLE IF EXISTS `heshe_admin_role`;

CREATE TABLE `heshe_admin_role` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL DEFAULT '' COMMENT '角色名',
  `auths` text COMMENT '权限点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='后台用户角色表';

/*Data for the table `heshe_admin_role` */

insert  into `heshe_admin_role`(`id`,`name`,`auths`) values (1,'管理员','业务管理,用户管理,信息中心'),(2,'园长','信息中心'),(3,'老师','业务管理');

/*Table structure for table `heshe_admins` */

DROP TABLE IF EXISTS `heshe_admins`;

CREATE TABLE `heshe_admins` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(10) NOT NULL,
  `roleid` int(10) DEFAULT NULL,
  `password` char(32) NOT NULL,
  `phoneno` char(11) NOT NULL COMMENT '手机号',
  `email` varchar(50) NOT NULL COMMENT '邮箱',
  `regdate` int(10) DEFAULT NULL,
  `lastloginip` varchar(15) DEFAULT NULL,
  `lastlogintime` int(10) DEFAULT NULL,
  `items` varchar(10) NOT NULL COMMENT '所属项目',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `heshe_admins` */

insert  into `heshe_admins`(`id`,`user`,`roleid`,`password`,`phoneno`,`email`,`regdate`,`lastloginip`,`lastlogintime`,`items`) values (3,'贺喜',1,'96e79218965eb72c92a549dd5a330112','15101131912','123456',NULL,'::1',1555203374,'data'),(6,'王战',3,'96e79218965eb72c92a549dd5a330112','18811090182','56991245@qq.com',1465903416,'::1',1551928735,'data'),(7,'admin',1,'21232f297a57a5a743894a0e4a801fc3','123456','15516',NULL,'::1',1555289735,'data'),(9,'王乐乐',2,'e10adc3949ba59abbe56e057f20f883e','9+988','+89+8+',1552052134,'::1',1555154863,'data');

/*Table structure for table `notice` */

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `n_id` int(4) NOT NULL AUTO_INCREMENT,
  `n_title` varchar(20) DEFAULT NULL,
  `n_author` int(4) DEFAULT NULL,
  `n_time` int(10) DEFAULT NULL,
  `n_content` text,
  PRIMARY KEY (`n_id`),
  KEY `notice_ibfk_1` (`n_author`),
  CONSTRAINT `notice_ibfk_1` FOREIGN KEY (`n_author`) REFERENCES `heshe_admin_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `notice` */

insert  into `notice`(`n_id`,`n_title`,`n_author`,`n_time`,`n_content`) values (1,'小太阳幼儿园幼儿春秋游活动项目中标公告',2,0,'      小太阳幼儿园就幼儿春秋游活动项目进行公开招标，按规定进行了开标、评标，现就本次招标的结果公布如下：\r\n\r\n       一、招标项目名称：小太阳幼儿园幼儿春秋游活动项目\r\n\r\n              项目编号：WXSY2019-0001\r\n\r\n       二、评标信息：\r\n\r\n              评标日期：2019年3月22日\r\n\r\n              评标地点：小太阳幼儿园\r\n\r\n       三、中标单位：春秋国际旅行社有限责任公司\r\n\r\n       四、本公告期限：1个工作日\r\n\r\n       五、联系人：石冬  联系电话：82753547-8058\r\n\r\n \r\n\r\n                                                             特此公告！'),(2,'2019年清明节放假通知',2,0,'我园清明放假时间定于2018年4月5日～4月7日，4月8日（周一）上课，特此通知！'),(3,'喜报：我们的节目获奖啦！',2,0,'近日，我园教工社团“朴榉读书社”收获了一份惊喜——一块金灿灿的奖牌。原来是之前由教工朴榉读书社策划拍摄的表演阅读节目《橘颂》，获得了全国第六届“书香三八”读书活动三等奖。\r\n书，是人类最好的朋友。与书本为友，与大师对话，与经典交流，将促进教师改变教育理念、丰富教育经验，还可以开阔眼界、愉悦身心。\r\n近年来，我园在全体教工中积极开展“书香校园”系列活动。从开辟教工休闲读书区到成立教工读书社，从开展专题读书活动到实行“漂流书”计划……这一系列活动的开展，让校园中弥散书香、书声琅琅；让教师能共享阅读，不断成长。同时，更让整个幼儿园浸润在爱读书共读书的氛围下凸显了文化神采。');

/*Table structure for table `students` */

DROP TABLE IF EXISTS `students`;

CREATE TABLE `students` (
  `s_id` int(10) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(10) DEFAULT NULL,
  `s_sex` varchar(4) DEFAULT NULL,
  `s_age` int(10) DEFAULT NULL,
  `s_class` int(4) DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  KEY `s_class` (`s_class`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`s_class`) REFERENCES `classes` (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `students` */

insert  into `students`(`s_id`,`s_name`,`s_sex`,`s_age`,`s_class`) values (1,'上官博韬','男',4,1),(2,'黄麟喆','男',5,2),(3,'李康瑜','女',5,3),(4,'汪以沫','女',4,4),(5,'许凯哲','男',4,5);

/*Table structure for table `workers` */

DROP TABLE IF EXISTS `workers`;

CREATE TABLE `workers` (
  `w_id` int(4) NOT NULL AUTO_INCREMENT,
  `w_name` varchar(10) DEFAULT NULL,
  `w_sex` varchar(4) DEFAULT NULL,
  `w_age` int(4) DEFAULT NULL,
  `w_phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `workers` */

insert  into `workers`(`w_id`,`w_name`,`w_sex`,`w_age`,`w_phone`) values (1,'王秀丽','女',26,'13255648787'),(2,'张铁','男',30,'13255488998'),(3,'李海','男',25,'18758564566');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

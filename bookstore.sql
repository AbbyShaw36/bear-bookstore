DROP TABLE `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`password` varchar(40) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `book`;
CREATE TABLE IF NOT EXISTS `book` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`type` int(11) NOT NULL,
	`author` int(11) NOT NULL,
	`price` int(11) NOT NULL,
	`description` varchar(255) DEFAULT "",
	`publishTime` bigint(20) NOT NULL,
	`stock` int(11) DEFAULT 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `type`;
CREATE TABLE IF NOT EXISTS `type` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `author`;
CREATE TABLE IF NOT EXISTS `author` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `order`;
CREATE TABLE IF NOT EXISTS `order` (
	`code` int(11) NOT NULL,
	`user` int(11) NOT NULL,
	`publishTime` bigint(20) NOT NULL,
	PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `order_product`;
CREATE TABLE IF NOT EXISTS `order_product` (
	`code` int(11) NOT NULL,
	`product` int(11) NOT NULL,
	`quatity` int(11) NOT NULL,
	PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

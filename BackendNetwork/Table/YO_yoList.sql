CREATE DATABASE  IF NOT EXISTS `YO`;
USE `YO`;


DROP TABLE IF EXISTS `yoList`;

CREATE TABLE `yoList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `listName` varchar(45) NOT NULL,
  `lastYo` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ownerName` (`ownerId`,`listName`),
  KEY `userId_idx` (`ownerId`),
  CONSTRAINT `userId` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`)
);

LOCK TABLES `yoList` WRITE;

INSERT INTO `yoList` VALUES (21,27,'Barley','2019-12-12 00:13:37'),(22,27,'Big Barley','2019-12-12 17:47:14');

UNLOCK TABLES;

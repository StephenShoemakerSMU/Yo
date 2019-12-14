CREATE DATABASE  IF NOT EXISTS `YO`;
USE `YO`;

DROP TABLE IF EXISTS `blockedUsers`;

CREATE TABLE `blockedUsers` (
  `blocker` int(11) NOT NULL,
  `blocked` int(11) DEFAULT NULL,
  UNIQUE KEY `blockPair` (`blocker`,`blocked`),
  KEY `blocked_idx` (`blocked`),
  CONSTRAINT `blocked` FOREIGN KEY (`blocked`) REFERENCES `users` (`id`),
  CONSTRAINT `blocker` FOREIGN KEY (`blocker`) REFERENCES `users` (`id`)
);

LOCK TABLES `blockedUsers` WRITE;

INSERT INTO `blockedUsers` VALUES (27,28),(28,27);

UNLOCK TABLES;

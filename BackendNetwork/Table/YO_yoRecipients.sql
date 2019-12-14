CREATE DATABASE  IF NOT EXISTS `YO`;
USE `YO`;


DROP TABLE IF EXISTS `yoRecipients`;

CREATE TABLE `yoRecipients` (
  `listId` int(11) NOT NULL,
  `recipientId` int(11) NOT NULL,
  PRIMARY KEY (`listId`,`recipientId`),
  KEY `recipeintId_idx` (`recipientId`),
  CONSTRAINT `listId` FOREIGN KEY (`listId`) REFERENCES `yoList` (`id`),
  CONSTRAINT `recipeintId` FOREIGN KEY (`recipientId`) REFERENCES `users` (`id`)
);


LOCK TABLES `yoRecipients` WRITE;

INSERT INTO `yoRecipients` VALUES (21,27),(22,27),(21,28),(22,29),(22,30);

UNLOCK TABLES;


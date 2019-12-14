CREATE DATABASE  IF NOT EXISTS `YO`;
USE `YO`;


DROP TABLE IF EXISTS `pictureYos`;

CREATE TABLE `pictureYos` (
  `yo` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  PRIMARY KEY (`yo`),
  CONSTRAINT `pictureYo` FOREIGN KEY (`yo`) REFERENCES `yos` (`yoId`)
);

LOCK TABLES `pictureYos` WRITE;

INSERT INTO `pictureYos` VALUES (17,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(18,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(19,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(20,'undefined'),(21,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(22,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(23,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(24,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(25,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(26,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(27,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(28,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(29,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(31,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(32,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(33,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(34,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(36,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(37,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(38,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(39,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(40,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(41,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(42,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(43,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(44,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(45,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(46,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(47,'undefined'),(48,'undefined'),(49,'undefined'),(50,'undefined'),(51,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(52,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(53,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(54,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(55,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(56,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(57,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(58,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(59,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(60,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(61,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(62,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(63,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(64,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(65,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(66,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(67,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg'),(68,'http://www.gstatic.com/tv/thumb/persons/80703/80703_v4_ba.jpg');

UNLOCK TABLES;


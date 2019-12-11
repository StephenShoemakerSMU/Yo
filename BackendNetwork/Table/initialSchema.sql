CREATE DATABASE  IF NOT EXISTS `YO` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `YO`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: YO
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `hash` varchar(128) DEFAULT NULL,
  `salt` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (27,'SShoemaker','d556795e291edb9303a021b39891ae96c8a2e32f0b8ab8be31eb1f56b351c529e508a4816ced1877a23a5ae98da38e7fa01dd36aa0211473f9a74a50d746451e','584860b19cb8f670ee6f90a0436cc09e'),(28,'StephenShoemaker','4e61780583dd08779096023437f17192924c182c96407d5defcd3086168d997f0af73f5393762650a91a74abe2fabdd326637d9a48741b5a038e899d38cd52e3','04992809f0437810d3dfcc0ca60dfc8e'),(29,'thePlant','5b15370914866b80c22d27da6f9e184eab1d47007403db48071b2eb6ba4a0320bb138109acad1bbcdc3491bd5746e95936ed6dda95325db15a347bff1a7f88a7','f6b9c912effdabad113bc4b1c04e92ef'),(30,'theSol','b43d46b8d0dfc0efe0d6b840640dcb23a1586d95428f64f12c5777930e4e43ee28942d6552f6ce32951cc3a71d991c65d5cbf196086777adaa2eca01a5e64c61','ee122287863a9d0e91f5ded37fa4c227');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yoList`
--

DROP TABLE IF EXISTS `yoList`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yoList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `listName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`ownerId`),
  CONSTRAINT `userId` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yoList`
--

LOCK TABLES `yoList` WRITE;
/*!40000 ALTER TABLE `yoList` DISABLE KEYS */;
INSERT INTO `yoList` VALUES (17,27,'Barley'),(18,27,'Big Barley');
/*!40000 ALTER TABLE `yoList` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yoRecipients`
--

DROP TABLE IF EXISTS `yoRecipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yoRecipients` (
  `listId` int(11) NOT NULL,
  `recipientId` int(11) NOT NULL,
  PRIMARY KEY (`listId`,`recipientId`),
  KEY `recipeintId_idx` (`recipientId`),
  CONSTRAINT `listId` FOREIGN KEY (`listId`) REFERENCES `yoList` (`id`),
  CONSTRAINT `recipeintId` FOREIGN KEY (`recipientId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yoRecipients`
--

LOCK TABLES `yoRecipients` WRITE;
/*!40000 ALTER TABLE `yoRecipients` DISABLE KEYS */;
INSERT INTO `yoRecipients` VALUES (17,27),(18,27),(17,28),(18,29),(18,30);
/*!40000 ALTER TABLE `yoRecipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yos`
--

DROP TABLE IF EXISTS `yos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yos` (
  `yoId` int(11) NOT NULL AUTO_INCREMENT,
  `senderId` int(11) NOT NULL,
  `recipientList` int(11) NOT NULL,
  `sendingTime` datetime NOT NULL,
  PRIMARY KEY (`yoId`),
  KEY `recipientList_idx` (`recipientList`),
  CONSTRAINT `recipientList` FOREIGN KEY (`recipientList`) REFERENCES `yoList` (`id`),
  CONSTRAINT `senderId` FOREIGN KEY (`yoId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yos`
--

LOCK TABLES `yos` WRITE;
/*!40000 ALTER TABLE `yos` DISABLE KEYS */;
/*!40000 ALTER TABLE `yos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-11 17:10:05

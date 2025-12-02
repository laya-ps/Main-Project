-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: parkrave
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','admin@gmail.com','admin123');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `InvoiceNumber` varchar(20) DEFAULT NULL,
  `InvoiceDate` date DEFAULT NULL,
  `AccountantID` int DEFAULT NULL,
  `GrandTotal` decimal(10,2) DEFAULT NULL,
  `customer_name` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  PRIMARY KEY (`InvoiceID`),
  UNIQUE KEY `InvoiceNumber` (`InvoiceNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plot_slots`
--

DROP TABLE IF EXISTS `plot_slots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plot_slots` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `plot_id` int NOT NULL,
  `vehicle_type` enum('Car','Bike','Truck','EV') NOT NULL,
  `slot_number` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `plot_id` (`plot_id`),
  CONSTRAINT `plot_slots_ibfk_1` FOREIGN KEY (`plot_id`) REFERENCES `plots` (`plot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plot_slots`
--

LOCK TABLES `plot_slots` WRITE;
/*!40000 ALTER TABLE `plot_slots` DISABLE KEYS */;
INSERT INTO `plot_slots` VALUES (21,6,'Car',1,85.00),(22,6,'Car',2,85.00),(23,6,'Car',3,85.00),(24,6,'Car',4,85.00),(25,6,'Car',5,85.00),(26,6,'Car',6,85.00),(27,6,'Car',7,85.00),(28,6,'Car',8,85.00),(29,6,'Car',9,85.00),(30,6,'Car',10,85.00),(31,6,'Car',11,85.00),(32,6,'Car',12,85.00),(33,6,'Car',13,85.00),(34,6,'Car',14,85.00),(35,6,'Car',15,85.00),(36,6,'Car',16,85.00),(37,6,'Car',17,85.00),(38,6,'Car',18,85.00),(39,6,'Car',19,85.00),(40,6,'Car',20,85.00),(41,6,'Car',21,85.00),(42,6,'Car',22,85.00),(43,6,'Car',23,85.00),(44,6,'Car',24,85.00),(45,6,'Car',25,85.00),(46,6,'Bike',1,45.00),(47,6,'Bike',2,45.00),(48,6,'Bike',3,45.00),(49,6,'Bike',4,45.00),(50,6,'Bike',5,45.00),(51,6,'Bike',6,45.00),(52,6,'Bike',7,45.00),(53,6,'Bike',8,45.00),(54,6,'Bike',9,45.00),(55,6,'Bike',10,45.00),(56,7,'EV',1,150.00),(57,7,'EV',2,150.00),(58,7,'EV',3,150.00),(59,7,'EV',4,150.00),(60,7,'EV',5,150.00),(61,7,'EV',6,150.00),(62,7,'EV',7,150.00),(63,7,'EV',8,150.00),(64,7,'EV',9,150.00),(65,7,'EV',10,150.00),(66,7,'Truck',1,250.00),(67,7,'Truck',2,250.00),(68,7,'Truck',3,250.00),(69,7,'Truck',4,250.00),(70,7,'Truck',5,250.00),(86,9,'Truck',1,200.00),(87,9,'Truck',2,200.00),(88,9,'Truck',3,200.00),(89,9,'Truck',4,200.00),(90,9,'Truck',5,200.00),(91,9,'Truck',6,200.00),(92,9,'Truck',7,200.00),(93,9,'Truck',8,200.00),(94,9,'Truck',9,200.00),(95,9,'Truck',10,200.00),(96,9,'EV',1,150.00),(97,9,'EV',2,150.00),(98,9,'EV',3,150.00),(99,9,'EV',4,150.00),(100,9,'EV',5,150.00),(101,9,'EV',6,150.00),(102,9,'EV',7,150.00),(103,9,'EV',8,150.00),(104,9,'EV',9,150.00),(105,9,'EV',10,150.00),(106,9,'EV',11,150.00),(107,9,'EV',12,150.00),(108,9,'EV',13,150.00),(109,9,'EV',14,150.00),(110,9,'EV',15,150.00);
/*!40000 ALTER TABLE `plot_slots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plots`
--

DROP TABLE IF EXISTS `plots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plots` (
  `plot_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `total_slots` int NOT NULL,
  `vehicle_types` json NOT NULL,
  PRIMARY KEY (`plot_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plots`
--

LOCK TABLES `plots` WRITE;
/*!40000 ALTER TABLE `plots` DISABLE KEYS */;
INSERT INTO `plots` VALUES (6,10,'Aluva',35,'{\"Car\": {\"price\": \"85\", \"slots\": \"025\"}, \"Bike\": {\"price\": \"45\", \"slots\": \"010\"}}'),(7,1,'Thrissur',15,'{\"EV\": {\"price\": \"150\", \"slots\": \"010\"}, \"Truck\": {\"price\": \"250\", \"slots\": \"05\"}}'),(9,10,'Kodungallur',25,'{\"EV\": {\"price\": \"0150\", \"slots\": \"015\"}, \"Truck\": {\"price\": \"0200\", \"slots\": \"010\"}}');
/*!40000 ALTER TABLE `plots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seats`
--

DROP TABLE IF EXISTS `seats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_number` int DEFAULT NULL,
  `seat_number` int DEFAULT NULL,
  `status` enum('available','occupied') DEFAULT 'available',
  `time_slot` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seats`
--

LOCK TABLES `seats` WRITE;
/*!40000 ALTER TABLE `seats` DISABLE KEYS */;
INSERT INTO `seats` VALUES (85,1,1,'available',''),(86,1,2,'available',''),(87,1,3,'available',''),(88,1,4,'available',''),(89,1,5,'available',''),(90,1,6,'available',''),(91,2,1,'available',''),(92,2,2,'available',''),(93,2,3,'available',''),(94,2,4,'available',''),(95,2,5,'available',''),(96,2,6,'available',''),(97,3,1,'available',''),(98,3,2,'available',''),(99,3,3,'available',''),(100,3,4,'available',''),(101,3,5,'available',''),(102,3,6,'available',''),(103,4,1,'available',''),(104,4,2,'available',''),(105,1,1,'available',''),(106,1,2,'available',''),(107,1,3,'available',''),(108,1,4,'available',''),(109,1,5,'available',''),(110,1,6,'available',''),(111,2,1,'available',''),(112,2,2,'available',''),(113,2,3,'available',''),(114,2,4,'available',''),(115,2,5,'available',''),(116,2,6,'available',''),(117,3,1,'available',''),(118,3,2,'available',''),(119,3,3,'available',''),(120,3,4,'available',''),(121,3,5,'available',''),(122,3,6,'available',''),(123,4,1,'available',''),(124,4,2,'available',''),(125,1,1,'available',''),(126,1,2,'available',''),(127,1,3,'available',''),(128,1,4,'available',''),(129,1,5,'available',''),(130,1,6,'available',''),(131,2,1,'available',''),(132,2,2,'available',''),(133,2,3,'available',''),(134,2,4,'available',''),(135,2,5,'available',''),(136,2,6,'available',''),(137,3,1,'available',''),(138,3,2,'available',''),(139,3,3,'available',''),(140,3,4,'available',''),(141,3,5,'available',''),(142,3,6,'available',''),(143,4,1,'available',''),(144,4,2,'available','');
/*!40000 ALTER TABLE `seats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot_bookings`
--

DROP TABLE IF EXISTS `slot_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slot_bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `slot_id` int NOT NULL,
  `plot_id` int NOT NULL,
  `booking_date` date NOT NULL,
  `time_slot` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `vehicle_type` varchar(50) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `booked_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`booking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot_bookings`
--

LOCK TABLES `slot_bookings` WRITE;
/*!40000 ALTER TABLE `slot_bookings` DISABLE KEYS */;
INSERT INTO `slot_bookings` VALUES (1,21,6,'2025-01-16','6:00 AM',11,'Car','Aluva',85.00,'2025-01-15 18:40:13'),(2,22,6,'2025-01-16','6:00 AM',11,'Car','Aluva',85.00,'2025-01-15 18:41:01');
/*!40000 ALTER TABLE `slot_bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `user_type` enum('Plot Owner','User','Admin') DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,'Test','testpark@gmail.com','Asdasd','7418529630','Plot Owner','0','2024-12-29 04:06:49','2024-12-29 21:12:32'),(11,'TestUser','testuser@gmail.com','Asdasd','9685741230','User','0','2024-12-29 04:08:14','2024-12-29 21:10:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-15 14:27:27

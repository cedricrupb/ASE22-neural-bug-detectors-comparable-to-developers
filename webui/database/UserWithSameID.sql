CREATE TABLE `UserWithSameID` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstid` int(11) NOT NULL,
  `secondid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserWithSameID_id_uindex` (`id`)
);
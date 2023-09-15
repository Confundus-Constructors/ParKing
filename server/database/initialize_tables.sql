-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `first_name` VARCHAR NULL DEFAULT NULL,
  `last_name` VARCHAR NULL DEFAULT NULL,
  `email` VARCHAR NULL DEFAULT NULL,
  `phone` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'vehicles'
--
-- ---

DROP TABLE IF EXISTS `vehicles`;

CREATE TABLE `vehicles` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `make` VARCHAR NULL DEFAULT NULL,
  `license_plate` VARCHAR NULL DEFAULT NULL,
  `color` VARCHAR NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'garages'
--
-- ---

DROP TABLE IF EXISTS `garages`;

CREATE TABLE `garages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `valet_company_id` INTEGER NULL DEFAULT NULL,
  `address_line_1` VARCHAR NULL DEFAULT NULL,
  `address_line 2` INTEGER NULL DEFAULT NULL,
  `city` VARCHAR NULL DEFAULT NULL,
  `state` VARCHAR NULL DEFAULT NULL,
  `zip` INTEGER NULL DEFAULT NULL,
  `latitude` INTEGER NULL DEFAULT NULL,
  `longitude` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'valet_companys'
--
-- ---

DROP TABLE IF EXISTS `valet_companys`;

CREATE TABLE `valet_companys` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `admin_email` VARCHAR NULL DEFAULT NULL,
  `admin_password` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'transactions'
--
-- ---

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  `vehicle_id` INTEGER NULL DEFAULT NULL,
  `garage_id` INTEGER NULL DEFAULT NULL,
  `parking_spot_id` INTEGER NULL DEFAULT NULL,
  `employee_id` INTEGER NULL DEFAULT NULL,
  `qr_code` BLOB NULL DEFAULT NULL,
  `reservation_start_time` DATETIME NULL DEFAULT NULL,
  `reservation_end_time` DATETIME NULL DEFAULT NULL,
  `check_in_time` INTEGER NULL DEFAULT NULL,
  `check_out_time` DATETIME NULL DEFAULT NULL,
  `status` VARCHAR NULL DEFAULT NULL,
  `active` BINARY NULL DEFAULT NULL,
  `photos` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'parking_spots'
--
-- ---

DROP TABLE IF EXISTS `parking_spots`;

CREATE TABLE `parking_spots` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `garage_id` INTEGER NULL DEFAULT NULL,
  `position` INTEGER NULL DEFAULT NULL,
  `available` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employees'
--
-- ---

DROP TABLE IF EXISTS `employees`;

CREATE TABLE `employees` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `garage_id` INTEGER NULL DEFAULT NULL,
  `valet_company_id` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `vehicles` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `garages` ADD FOREIGN KEY (valet_company_id) REFERENCES `valet_companys` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (vehicle_id) REFERENCES `vehicles` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (garage_id) REFERENCES `garages` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (parking_spot_id) REFERENCES `parking_spots` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (employee_id) REFERENCES `employees` (`id`);
ALTER TABLE `parking_spots` ADD FOREIGN KEY (garage_id) REFERENCES `garages` (`id`);
ALTER TABLE `employees` ADD FOREIGN KEY (garage_id) REFERENCES `garages` (`id`);
ALTER TABLE `employees` ADD FOREIGN KEY (valet_company_id) REFERENCES `valet_companys` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `vehicles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `garages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `valet_companys` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `transactions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `parking_spots` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employees` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`first_name`,`last_name`,`email`,`phone`) VALUES
-- ('','','','','');
-- INSERT INTO `vehicles` (`id`,`make`,`license_plate`,`color`,`user_id`) VALUES
-- ('','','','','');
-- INSERT INTO `garages` (`id`,`valet_company_id`,`address_line_1`,`address_line 2`,`city`,`state`,`zip`,`latitude`,`longitude`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `valet_companys` (`id`,`name`,`admin_email`,`admin_password`) VALUES
-- ('','','','');
-- INSERT INTO `transactions` (`id`,`user_id`,`vehicle_id`,`garage_id`,`parking_spot_id`,`employee_id`,`qr_code`,`reservation_start_time`,`reservation_end_time`,`check_in_time`,`check_out_time`,`status`,`active`,`photos`) VALUES
-- ('','','','','','','','','','','','','','');
-- INSERT INTO `parking_spots` (`id`,`garage_id`,`position`,`available`) VALUES
-- ('','','','');
-- INSERT INTO `employees` (`id`,`garage_id`,`valet_company_id`,`name`) VALUES
-- ('','','','');
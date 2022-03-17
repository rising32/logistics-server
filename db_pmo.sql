-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2022 at 10:18 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pmo`
--

-- --------------------------------------------------------

--
-- Table structure for table `mst_client`
--

CREATE TABLE `mst_client` (
  `client_id` int(8) NOT NULL,
  `client_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `client_address` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_detail` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mst_client`
--

INSERT INTO `mst_client` (`client_id`, `client_name`, `client_address`, `client_detail`, `is_active`) VALUES
(1, 'Apple', NULL, '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mst_company`
--

CREATE TABLE `mst_company` (
  `company_id` int(8) NOT NULL,
  `company_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mst_company`
--

INSERT INTO `mst_company` (`company_id`, `company_name`) VALUES
(1, 'Amazon TM');

-- --------------------------------------------------------

--
-- Table structure for table `mst_role`
--

CREATE TABLE `mst_role` (
  `role_id` int(8) NOT NULL,
  `role_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mst_role`
--

INSERT INTO `mst_role` (`role_id`, `role_name`) VALUES
(1, 'Administrator'),
(2, 'Project Manager'),
(3, 'Project User'),
(4, 'Guest');

-- --------------------------------------------------------

--
-- Table structure for table `mst_team`
--

CREATE TABLE `mst_team` (
  `team_id` int(8) NOT NULL,
  `team_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mst_team`
--

INSERT INTO `mst_team` (`team_id`, `team_name`) VALUES
(5, 'Android team 2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_date_time_currency`
--

CREATE TABLE `tbl_date_time_currency` (
  `dtc_id` int(8) NOT NULL,
  `company_id` int(8) NOT NULL,
  `date_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `decimal_seperator` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_date_time_currency`
--

INSERT INTO `tbl_date_time_currency` (`dtc_id`, `company_id`, `date_format`, `time_format`, `currency`, `decimal_seperator`) VALUES
(1, 1, 'YYYY-MM-DD', 'HH:mm:SS', '$', ',');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

CREATE TABLE `tbl_employee` (
  `employee_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `employee_code` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `employee_name` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`employee_id`, `user_id`, `employee_code`, `employee_name`) VALUES
(1, 1, '56324', 'Jim hantee'),
(3, 3, '3256', 'hantee');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `login_id` int(10) NOT NULL,
  `user_id` int(8) NOT NULL,
  `login_time` datetime NOT NULL DEFAULT current_timestamp(),
  `token` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `out_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`login_id`, `user_id`, `login_time`, `token`, `out_time`) VALUES
(8, 1, '2022-03-16 15:10:21', NULL, '2022-03-16 15:13:22'),
(9, 1, '2022-03-16 15:13:48', NULL, '2022-03-16 15:15:48'),
(10, 1, '2022-03-16 15:16:47', NULL, '2022-03-16 15:19:38'),
(11, 1, '2022-03-16 15:20:06', NULL, '2022-03-16 15:27:02'),
(12, 1, '2022-03-16 15:27:33', NULL, '2022-03-16 15:47:38'),
(13, 1, '2022-03-16 15:47:45', NULL, '2022-03-16 15:49:05'),
(14, 1, '2022-03-16 15:50:45', NULL, '2022-03-16 15:51:02'),
(15, 3, '2022-03-16 16:06:38', NULL, '2022-03-16 16:08:37'),
(16, 3, '2022-03-16 16:09:22', NULL, '2022-03-16 16:33:05'),
(17, 4, '2022-03-16 16:45:22', NULL, '2022-03-16 16:45:42'),
(19, 7, '2022-03-17 12:38:10', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_on_project`
--

CREATE TABLE `tbl_on_project` (
  `op_id` int(10) NOT NULL,
  `project_id` int(8) NOT NULL,
  `client_id` int(8) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `description` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `project_id` int(8) NOT NULL,
  `project_name` int(11) NOT NULL,
  `planned_start_date` datetime DEFAULT NULL,
  `planned_end_date` datetime DEFAULT NULL,
  `actual_start_date` datetime DEFAULT NULL,
  `actual_end_date` datetime DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`project_id`, `project_name`, `planned_start_date`, `planned_end_date`, `actual_start_date`, `actual_end_date`, `description`) VALUES
(1, 0, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_manager`
--

CREATE TABLE `tbl_project_manager` (
  `pm_id` int(8) NOT NULL,
  `project_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_project_manager`
--

INSERT INTO `tbl_project_manager` (`pm_id`, `project_id`, `user_id`) VALUES
(2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_task`
--

CREATE TABLE `tbl_task` (
  `task_id` int(8) NOT NULL,
  `task_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `hourly_rate` float NOT NULL,
  `is_add_all` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_team_member`
--

CREATE TABLE `tbl_team_member` (
  `tm_id` int(8) NOT NULL,
  `team_id` int(8) NOT NULL,
  `employee_id` int(8) NOT NULL,
  `role_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_team_member`
--

INSERT INTO `tbl_team_member` (`tm_id`, `team_id`, `employee_id`, `role_id`) VALUES
(2, 5, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(8) NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone_number` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_project_manager` tinyint(1) NOT NULL DEFAULT 0,
  `registration_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `email`, `phone_number`, `password`, `display_name`, `birthday`, `avatar`, `is_project_manager`, `registration_time`) VALUES
(1, 'tul@fg.com', '12523568954', '123456', NULL, NULL, '', 0, '2022-03-17 10:42:49'),
(3, 'a@a.com', '56345896541', '123456', 'Jim', NULL, 'dsfasdfljakfdjkaldfjakljfdaljfdkadfklaj', 0, '2022-03-17 10:42:49'),
(4, 'b@b.com', '56894336584', '123456', NULL, NULL, NULL, 0, '2022-03-17 10:42:49'),
(7, 'c@c.com', '1235648542', '123456', NULL, NULL, NULL, 0, '2022-03-17 12:38:10');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_client`
--

CREATE TABLE `tbl_user_client` (
  `uc_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `client_id` int(8) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user_client`
--

INSERT INTO `tbl_user_client` (`uc_id`, `user_id`, `client_id`, `is_active`) VALUES
(1, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_work_setting`
--

CREATE TABLE `tbl_work_setting` (
  `ws_id` int(8) NOT NULL,
  `company_id` int(8) NOT NULL,
  `first_day_of_week` int(1) DEFAULT NULL,
  `work_on_week` tinyint(1) DEFAULT NULL,
  `start_work_time` datetime DEFAULT NULL,
  `end_work_time` datetime DEFAULT NULL,
  `remainder` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_work_setting`
--

INSERT INTO `tbl_work_setting` (`ws_id`, `company_id`, `first_day_of_week`, `work_on_week`, `start_work_time`, `end_work_time`, `remainder`) VALUES
(1, 1, 1, 0, NULL, NULL, 'Amazon TM');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mst_client`
--
ALTER TABLE `mst_client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `mst_company`
--
ALTER TABLE `mst_company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `mst_role`
--
ALTER TABLE `mst_role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `mst_team`
--
ALTER TABLE `mst_team`
  ADD PRIMARY KEY (`team_id`),
  ADD UNIQUE KEY `team_name` (`team_name`);

--
-- Indexes for table `tbl_date_time_currency`
--
ALTER TABLE `tbl_date_time_currency`
  ADD PRIMARY KEY (`dtc_id`),
  ADD UNIQUE KEY `userId` (`company_id`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `userId` (`user_id`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_on_project`
--
ALTER TABLE `tbl_on_project`
  ADD PRIMARY KEY (`op_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  ADD PRIMARY KEY (`pm_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tbl_task`
--
ALTER TABLE `tbl_task`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  ADD PRIMARY KEY (`tm_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_num` (`phone_number`);

--
-- Indexes for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  ADD PRIMARY KEY (`uc_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  ADD PRIMARY KEY (`ws_id`),
  ADD KEY `company_id` (`company_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mst_client`
--
ALTER TABLE `mst_client`
  MODIFY `client_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mst_company`
--
ALTER TABLE `mst_company`
  MODIFY `company_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mst_role`
--
ALTER TABLE `mst_role`
  MODIFY `role_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mst_team`
--
ALTER TABLE `mst_team`
  MODIFY `team_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_date_time_currency`
--
ALTER TABLE `tbl_date_time_currency`
  MODIFY `dtc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  MODIFY `employee_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `login_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_on_project`
--
ALTER TABLE `tbl_on_project`
  MODIFY `op_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `project_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  MODIFY `pm_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_task`
--
ALTER TABLE `tbl_task`
  MODIFY `task_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  MODIFY `tm_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  MODIFY `ws_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD CONSTRAINT `tbl_employee_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD CONSTRAINT `tbl_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_on_project`
--
ALTER TABLE `tbl_on_project`
  ADD CONSTRAINT `tbl_on_project_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_on_project_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `mst_client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  ADD CONSTRAINT `tbl_project_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_project_manager_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  ADD CONSTRAINT `tbl_team_member_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `tbl_employee` (`employee_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_member_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `mst_team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_member_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `mst_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  ADD CONSTRAINT `tbl_user_client_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_user_client_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `mst_client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

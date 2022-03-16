-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2022 at 04:09 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `tbl_client`
--

CREATE TABLE `tbl_client` (
  `client_id` int(8) NOT NULL,
  `client_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_client`
--

INSERT INTO `tbl_client` (`client_id`, `client_name`, `is_active`) VALUES
(1, 'Apple', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company`
--

CREATE TABLE `tbl_company` (
  `company_id` int(8) NOT NULL,
  `company_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(17, 4, '2022-03-16 16:45:22', NULL, '2022-03-16 16:45:42');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `project_id` int(8) NOT NULL,
  `project_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Table structure for table `tbl_team`
--

CREATE TABLE `tbl_team` (
  `team_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `organization_id` int(8) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(8) NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `email`, `password`, `display_name`, `birthday`, `avatar`) VALUES
(1, 'tul@fg.com', '123456', NULL, NULL, ''),
(3, 'a@a.com', '123456', 'Jim', NULL, 'dsfasdfljakfdjkaldfjakljfdaljfdkadfklaj'),
(4, 'b@b.com', '123456', NULL, NULL, NULL);

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
-- Table structure for table `tbl_user_dtc`
--

CREATE TABLE `tbl_user_dtc` (
  `dtc_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `date_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `decimal_seperator` varchar(2) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_work_settings`
--

CREATE TABLE `tbl_work_settings` (
  `ws_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `first_day_of_week` int(1) NOT NULL,
  `work_on_week` tinyint(1) NOT NULL,
  `start_work_time` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `end_work_time` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `remainder` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_client`
--
ALTER TABLE `tbl_client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `tbl_company`
--
ALTER TABLE `tbl_company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`login_id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`project_id`);

--
-- Indexes for table `tbl_task`
--
ALTER TABLE `tbl_task`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `tbl_team`
--
ALTER TABLE `tbl_team`
  ADD PRIMARY KEY (`team_id`),
  ADD UNIQUE KEY `userId` (`user_id`),
  ADD UNIQUE KEY `orgId` (`organization_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  ADD PRIMARY KEY (`uc_id`);

--
-- Indexes for table `tbl_user_dtc`
--
ALTER TABLE `tbl_user_dtc`
  ADD PRIMARY KEY (`dtc_id`),
  ADD UNIQUE KEY `userId` (`user_id`);

--
-- Indexes for table `tbl_work_settings`
--
ALTER TABLE `tbl_work_settings`
  ADD PRIMARY KEY (`ws_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_client`
--
ALTER TABLE `tbl_client`
  MODIFY `client_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_company`
--
ALTER TABLE `tbl_company`
  MODIFY `company_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `login_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `project_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_task`
--
ALTER TABLE `tbl_task`
  MODIFY `task_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_team`
--
ALTER TABLE `tbl_team`
  MODIFY `team_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_user_dtc`
--
ALTER TABLE `tbl_user_dtc`
  MODIFY `dtc_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_work_settings`
--
ALTER TABLE `tbl_work_settings`
  MODIFY `ws_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_team`
--
ALTER TABLE `tbl_team`
  ADD CONSTRAINT `tbl_team_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `tbl_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user_dtc`
--
ALTER TABLE `tbl_user_dtc`
  ADD CONSTRAINT `tbl_user_dtc_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

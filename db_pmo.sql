-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 03, 2022 at 02:20 PM
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
(1, 'Apple', NULL, '', 1),
(2, 'Amazon co', NULL, NULL, 0),
(4, 'Amazon river', NULL, NULL, 0);

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
(1, 'Amazon TM'),
(2, 'Facebook');

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
-- Table structure for table `tbl_client_project`
--

CREATE TABLE `tbl_client_project` (
  `cp_id` int(10) NOT NULL,
  `project_id` int(8) NOT NULL,
  `client_id` int(8) NOT NULL,
  `date_start` datetime DEFAULT NULL,
  `date_end` datetime DEFAULT NULL,
  `description` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_client_project`
--

INSERT INTO `tbl_client_project` (`cp_id`, `project_id`, `client_id`, `date_start`, `date_end`, `description`) VALUES
(1, 4, 4, '2022-01-03 09:59:01', '2022-01-31 09:59:01', 'Google Advice App'),
(2, 6, 4, '2022-01-12 16:37:08', '2022-02-10 16:37:08', 'UI design'),
(3, 5, 2, '2022-01-18 14:11:56', '2022-03-28 21:11:56', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_date_time_currency`
--

CREATE TABLE `tbl_date_time_currency` (
  `dtc_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `date_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `time_format` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency` int(1) DEFAULT NULL,
  `decimal_seperator` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_date_time_currency`
--

INSERT INTO `tbl_date_time_currency` (`dtc_id`, `user_id`, `date_format`, `time_format`, `currency`, `decimal_seperator`) VALUES
(5, 3, 'YY-MM-DD', 'HH:mm:SS', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_deliverable`
--

CREATE TABLE `tbl_deliverable` (
  `deliverable_id` int(8) NOT NULL,
  `deliverable_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(8) NOT NULL,
  `task_id` int(8) NOT NULL,
  `periority_id` int(8) DEFAULT NULL,
  `budget` float DEFAULT NULL,
  `planned_end_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `is_completed` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_deliverable`
--

INSERT INTO `tbl_deliverable` (`deliverable_id`, `deliverable_name`, `user_id`, `task_id`, `periority_id`, `budget`, `planned_end_date`, `end_date`, `is_completed`) VALUES
(1, 'IKEA UI design - PSD file', 3, 12, NULL, NULL, NULL, '2022-03-15', 1),
(3, 'make ui design - screenshot 10', 3, 12, 3, NULL, '2022-03-13', '2022-03-12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `login_id` int(10) NOT NULL,
  `user_id` int(8) NOT NULL,
  `login_time` datetime NOT NULL DEFAULT current_timestamp(),
  `token` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
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
(25, 7, '2022-03-18 12:47:53', NULL, NULL),
(26, 4, '2022-03-18 12:48:11', NULL, NULL),
(27, 3, '2022-03-18 21:50:32', NULL, '2022-03-18 21:50:55'),
(28, 9, '2022-03-18 21:54:10', NULL, '2022-03-18 21:54:56'),
(29, 9, '2022-03-18 21:55:14', NULL, '2022-03-18 21:55:31'),
(30, 9, '2022-03-18 22:00:14', NULL, '2022-03-18 22:00:26'),
(31, 9, '2022-03-18 22:00:40', NULL, '2022-03-24 20:11:11'),
(32, 3, '2022-03-20 15:31:52', NULL, NULL),
(33, 10, '2022-03-20 15:33:43', NULL, NULL),
(38, 18, '2022-03-20 20:09:01', 'FmZ2zwT0V2hXVzK9lS9smw==$0uK4GyWJn+bzBPl0QyoAHLv5BJHBxb8QSgGP0mvoKGYQv9kP3pVNU531tpPp3g+h6mkQJ4xzElMmxjMnmfQGUQ==', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_precede_task`
--

CREATE TABLE `tbl_precede_task` (
  `precede_id` int(8) NOT NULL,
  `task_id` int(8) NOT NULL,
  `preceding` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_precede_task`
--

INSERT INTO `tbl_precede_task` (`precede_id`, `task_id`, `preceding`) VALUES
(1, 12, 1),
(2, 13, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_priority_agenda`
--

CREATE TABLE `tbl_priority_agenda` (
  `pa_id` int(10) NOT NULL,
  `wp_id` int(8) NOT NULL,
  `planned_date` date DEFAULT NULL,
  `planned_time` timestamp NULL DEFAULT NULL,
  `content` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_priority_agenda`
--

INSERT INTO `tbl_priority_agenda` (`pa_id`, `wp_id`, `planned_date`, `planned_time`, `content`, `level`) VALUES
(5, 3, NULL, NULL, 'adfsdfsdfsdfsf', 1),
(6, 3, NULL, NULL, 'dsdsdfsdfdsfsdfsfsf', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_priority_file`
--

CREATE TABLE `tbl_priority_file` (
  `pf_id` int(10) NOT NULL,
  `priority_id` int(8) NOT NULL,
  `file_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_priority_file`
--

INSERT INTO `tbl_priority_file` (`pf_id`, `priority_id`, `file_name`) VALUES
(2, 3, 'rer.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_priority_task`
--

CREATE TABLE `tbl_priority_task` (
  `task_id` int(8) NOT NULL,
  `creator_id` int(8) NOT NULL,
  `task_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(8) DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `planned_start_date` date DEFAULT NULL,
  `planned_end_date` date DEFAULT NULL,
  `actual_start_date` datetime DEFAULT NULL,
  `actual_end_date` datetime DEFAULT NULL,
  `hourly_rate` float NOT NULL,
  `is_add_all` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_priority_task`
--

INSERT INTO `tbl_priority_task` (`task_id`, `creator_id`, `task_name`, `project_id`, `description`, `planned_start_date`, `planned_end_date`, `actual_start_date`, `actual_end_date`, `hourly_rate`, `is_add_all`, `is_active`) VALUES
(11, 3, 'IKEA UI design', NULL, 'IKEA UI design', '2022-03-22', '2022-03-25', NULL, NULL, 32, 0, NULL),
(12, 3, 'twetwtewet', 6, 'asdfasdfsadfadfa', '2022-03-09', '2022-03-29', NULL, NULL, 25, 0, 1),
(13, 3, 'blue sky - task - 3', 6, 'this is blue sky task.', '2022-03-02', '2022-03-03', NULL, NULL, 35.5, 0, 1),
(14, 3, 'blue sky - task - 1', 5, 'this is blue sky task.', '2022-03-09', '2022-03-13', NULL, NULL, 35.5, 0, 1),
(15, 3, 'blue sky - task - 2', 6, 'this is blue sky task.', '2022-03-09', '2022-03-10', NULL, NULL, 35.5, 0, 1),
(17, 3, 'red', 6, 'this is red color.', '2022-03-07', '2022-03-07', NULL, NULL, 15, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_proceed_deliverable`
--

CREATE TABLE `tbl_proceed_deliverable` (
  `pd_id` int(8) NOT NULL,
  `deliverable_id` int(8) NOT NULL,
  `precede` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project`
--

CREATE TABLE `tbl_project` (
  `project_id` int(8) NOT NULL,
  `creator_id` int(8) NOT NULL,
  `project_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `planned_start_date` date DEFAULT NULL,
  `planned_end_date` date DEFAULT NULL,
  `actual_start_date` date DEFAULT NULL,
  `actual_end_date` date DEFAULT NULL,
  `description` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_project`
--

INSERT INTO `tbl_project` (`project_id`, `creator_id`, `project_name`, `planned_start_date`, `planned_end_date`, `actual_start_date`, `actual_end_date`, `description`) VALUES
(3, 3, 'IKEA Project', '2022-03-15', '2022-03-30', NULL, NULL, 'IKEA Project'),
(4, 3, 'Android app', '2022-03-08', '2022-03-17', NULL, NULL, 'This is my app.'),
(5, 3, 'IOS app', '2022-03-14', '2022-04-13', NULL, NULL, 'This is IOS app.'),
(6, 1, 'blue sky - version', '2022-03-27', '2022-03-31', NULL, NULL, 'this is version.');

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
(4, 4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_task_assign`
--

CREATE TABLE `tbl_task_assign` (
  `assign_id` int(8) NOT NULL,
  `task_id` int(8) NOT NULL,
  `member_id` int(8) NOT NULL,
  `role_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_task_assign`
--

INSERT INTO `tbl_task_assign` (`assign_id`, `task_id`, `member_id`, `role_id`) VALUES
(1, 12, 4, 1),
(2, 14, 4, 3),
(3, 13, 7, 3),
(4, 15, 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_team_member`
--

CREATE TABLE `tbl_team_member` (
  `tm_id` int(8) NOT NULL,
  `owner_id` int(8) NOT NULL,
  `member_id` int(8) NOT NULL,
  `role_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_team_member`
--

INSERT INTO `tbl_team_member` (`tm_id`, `owner_id`, `member_id`, `role_id`) VALUES
(5, 3, 1, 2),
(8, 3, 4, 1);

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
  `role_id` int(1) NOT NULL DEFAULT 3,
  `registration_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `email`, `phone_number`, `password`, `display_name`, `birthday`, `avatar`, `role_id`, `registration_time`) VALUES
(1, 'tul@fg.com', '12523568954', '123456', 'Jonshn Deli', NULL, '', 2, '2022-03-17 10:42:49'),
(3, 'a@a.com', '56345896541', '123456', 'Jim', NULL, 'dsfasdfljakfdjkaldfjakljfdaljfdkadfklaj', 1, '2022-03-17 10:42:49'),
(4, 'b@b.com', '56894336584', '123456', 'Herdson', NULL, NULL, 2, '2022-03-17 10:42:49'),
(7, 'c@c.com', '1235648542', '123456', 'Dorneld Trump', NULL, NULL, 3, '2022-03-17 12:38:10'),
(8, 'd@d.com', '5264235512', '123456', 'Joe Biden', NULL, NULL, 3, '2022-03-18 09:03:43'),
(9, 'dschrabonnat@id.logistics.com', '18600559425', 'a123456', 'Joji Worsington', NULL, NULL, 2, '2022-03-18 21:54:10'),
(10, 'abd@a.com', '5264855214522', '123456', 'Bonapard Napoleon', NULL, NULL, 3, '2022-03-20 15:33:43'),
(18, 'tulip31518@outlook.com', '5264855214', '123456', 'C Ronaldo', NULL, NULL, 2, '2022-03-20 20:09:01');

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
(1, 3, 1, 1),
(2, 3, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user_company`
--

CREATE TABLE `tbl_user_company` (
  `uc_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `company_id` int(8) NOT NULL,
  `is_manager` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user_company`
--

INSERT INTO `tbl_user_company` (`uc_id`, `user_id`, `company_id`, `is_manager`) VALUES
(3, 4, 2, NULL),
(4, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_week_priority`
--

CREATE TABLE `tbl_week_priority` (
  `wp_id` int(10) NOT NULL,
  `user_id` int(8) NOT NULL,
  `week` int(2) NOT NULL,
  `priority` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goal` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_completed` float DEFAULT NULL,
  `is_weekly` tinyint(1) DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_week_priority`
--

INSERT INTO `tbl_week_priority` (`wp_id`, `user_id`, `week`, `priority`, `goal`, `detail`, `is_completed`, `is_weekly`, `end_date`) VALUES
(3, 3, 12, 'make ui design', 'make ui design', 'complete sign up ', NULL, 1, NULL),
(4, 3, 13, 'make log in animation\n', 'make log in animation', 'Animation must be beautiful.', 0, 1, '2022-03-24'),
(5, 3, 12, 'login service', 'login service', 'php version 7.47', 0, 1, '2022-03-24');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_work_setting`
--

CREATE TABLE `tbl_work_setting` (
  `ws_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `week` int(2) DEFAULT NULL,
  `year` int(5) NOT NULL,
  `first_day_of_week` int(2) DEFAULT NULL,
  `work_on_week` int(1) DEFAULT NULL,
  `start_work_time` int(2) DEFAULT NULL,
  `end_work_time` int(2) DEFAULT NULL,
  `remainder` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_work_setting`
--

INSERT INTO `tbl_work_setting` (`ws_id`, `user_id`, `week`, `year`, `first_day_of_week`, `work_on_week`, `start_work_time`, `end_work_time`, `remainder`) VALUES
(1, 3, 1, 2022, 3, 5, NULL, NULL, 0),
(2, 3, 2, 2022, 10, 5, NULL, NULL, 0),
(3, 3, 3, 2022, 17, 5, NULL, NULL, 1),
(4, 3, 4, 2022, 24, 5, NULL, NULL, 1),
(5, 3, 5, 2022, 31, 5, NULL, NULL, 0),
(6, 3, 6, 2022, 7, 0, NULL, NULL, 1),
(7, 3, 7, 2022, 14, 5, NULL, NULL, 1),
(8, 3, 8, 2022, 21, 5, NULL, NULL, 1),
(9, 3, 9, 2022, 28, 5, NULL, NULL, 0),
(10, 3, 10, 2022, 4, 5, NULL, NULL, 1),
(11, 3, 11, 2022, 14, 5, NULL, NULL, 0),
(12, 3, 12, 2022, 21, 5, NULL, NULL, 1),
(13, 3, 13, 2022, 28, 5, NULL, NULL, 0),
(14, 3, 14, 2022, 4, 5, NULL, NULL, 0),
(15, 3, 15, 2022, 11, 5, NULL, NULL, 1),
(16, 3, 16, 2022, 18, 5, NULL, NULL, 0),
(17, 3, 17, 2022, 25, 5, NULL, NULL, 0),
(18, 3, 18, 2022, 2, 5, NULL, NULL, 1),
(19, 3, 19, 2022, 9, 5, NULL, NULL, 1),
(20, 3, 20, 2022, 16, 5, NULL, NULL, 0),
(21, 3, 21, 2022, 23, 5, NULL, NULL, 1),
(22, 3, 22, 2022, 30, 5, NULL, NULL, 1),
(23, 3, 23, 2022, 6, 5, NULL, NULL, 1),
(24, 3, 24, 2022, 13, 5, NULL, NULL, 0),
(25, 3, 25, 2022, 20, 5, NULL, NULL, 1),
(26, 3, 26, 2022, 27, 5, NULL, NULL, 0),
(27, 3, 27, 2022, 4, 5, NULL, NULL, 1),
(28, 3, 28, 2022, 11, 5, NULL, NULL, 0),
(29, 3, 29, 2022, 18, 5, NULL, NULL, 0),
(30, 3, 30, 2022, 25, 5, NULL, NULL, 0),
(31, 3, 31, 2022, 1, 0, NULL, NULL, 1),
(32, 3, 32, 2022, 8, 0, NULL, NULL, 1),
(33, 3, 33, 2022, 15, 0, NULL, NULL, 0),
(34, 3, 34, 2022, 22, 5, NULL, NULL, 1),
(35, 3, 35, 2022, 29, 5, NULL, NULL, 1),
(36, 3, 36, 2022, 5, 5, NULL, NULL, 1),
(37, 3, 37, 2022, 12, 5, NULL, NULL, 0),
(38, 3, 38, 2022, 19, 5, NULL, NULL, 1),
(39, 3, 39, 2022, 26, 5, NULL, NULL, 0),
(40, 3, 40, 2022, 3, 5, NULL, NULL, 1),
(41, 3, 41, 2022, 10, 5, NULL, NULL, 0),
(42, 3, 42, 2022, 17, 5, NULL, NULL, 0),
(43, 3, 43, 2022, 24, 5, NULL, NULL, 0),
(44, 3, 44, 2022, 31, 5, NULL, NULL, 1),
(45, 3, 45, 2022, 7, 5, NULL, NULL, 1),
(46, 3, 46, 2022, 14, 5, NULL, NULL, 0),
(47, 3, 47, 2022, 21, 5, NULL, NULL, 1),
(48, 3, 48, 2022, 28, 5, NULL, NULL, 1),
(49, 3, 49, 2022, 5, 5, NULL, NULL, 1),
(50, 3, 50, 2022, 12, 5, NULL, NULL, 0),
(51, 3, 51, 2022, 19, 0, NULL, NULL, 0),
(52, 3, 52, 2022, 26, 0, NULL, NULL, 0);

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
-- Indexes for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  ADD PRIMARY KEY (`cp_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `tbl_date_time_currency`
--
ALTER TABLE `tbl_date_time_currency`
  ADD PRIMARY KEY (`dtc_id`),
  ADD UNIQUE KEY `userId` (`user_id`);

--
-- Indexes for table `tbl_deliverable`
--
ALTER TABLE `tbl_deliverable`
  ADD PRIMARY KEY (`deliverable_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `periority_id` (`periority_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_precede_task`
--
ALTER TABLE `tbl_precede_task`
  ADD PRIMARY KEY (`precede_id`),
  ADD KEY `task_id` (`task_id`);

--
-- Indexes for table `tbl_priority_agenda`
--
ALTER TABLE `tbl_priority_agenda`
  ADD PRIMARY KEY (`pa_id`),
  ADD KEY `wp_id` (`wp_id`);

--
-- Indexes for table `tbl_priority_file`
--
ALTER TABLE `tbl_priority_file`
  ADD PRIMARY KEY (`pf_id`),
  ADD KEY `priority_id` (`priority_id`);

--
-- Indexes for table `tbl_priority_task`
--
ALTER TABLE `tbl_priority_task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tbl_proceed_deliverable`
--
ALTER TABLE `tbl_proceed_deliverable`
  ADD PRIMARY KEY (`pd_id`),
  ADD KEY `deliverable_id` (`deliverable_id`);

--
-- Indexes for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indexes for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  ADD PRIMARY KEY (`pm_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `project_id` (`project_id`);

--
-- Indexes for table `tbl_task_assign`
--
ALTER TABLE `tbl_task_assign`
  ADD PRIMARY KEY (`assign_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  ADD PRIMARY KEY (`tm_id`),
  ADD UNIQUE KEY `owner_id_2` (`owner_id`,`member_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `member_id` (`member_id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_num` (`phone_number`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  ADD PRIMARY KEY (`uc_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  ADD PRIMARY KEY (`uc_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `tbl_week_priority`
--
ALTER TABLE `tbl_week_priority`
  ADD PRIMARY KEY (`wp_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  ADD PRIMARY KEY (`ws_id`),
  ADD KEY `company_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mst_client`
--
ALTER TABLE `mst_client`
  MODIFY `client_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mst_company`
--
ALTER TABLE `mst_company`
  MODIFY `company_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mst_role`
--
ALTER TABLE `mst_role`
  MODIFY `role_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  MODIFY `cp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_date_time_currency`
--
ALTER TABLE `tbl_date_time_currency`
  MODIFY `dtc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_deliverable`
--
ALTER TABLE `tbl_deliverable`
  MODIFY `deliverable_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `login_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `tbl_precede_task`
--
ALTER TABLE `tbl_precede_task`
  MODIFY `precede_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_priority_agenda`
--
ALTER TABLE `tbl_priority_agenda`
  MODIFY `pa_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_priority_file`
--
ALTER TABLE `tbl_priority_file`
  MODIFY `pf_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_priority_task`
--
ALTER TABLE `tbl_priority_task`
  MODIFY `task_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_proceed_deliverable`
--
ALTER TABLE `tbl_proceed_deliverable`
  MODIFY `pd_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `project_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  MODIFY `pm_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_task_assign`
--
ALTER TABLE `tbl_task_assign`
  MODIFY `assign_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  MODIFY `tm_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_week_priority`
--
ALTER TABLE `tbl_week_priority`
  MODIFY `wp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  MODIFY `ws_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  ADD CONSTRAINT `tbl_client_project_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_client_project_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `mst_client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_date_time_currency`
--
ALTER TABLE `tbl_date_time_currency`
  ADD CONSTRAINT `tbl_date_time_currency_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_deliverable`
--
ALTER TABLE `tbl_deliverable`
  ADD CONSTRAINT `tbl_deliverable_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tbl_priority_task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_deliverable_ibfk_2` FOREIGN KEY (`periority_id`) REFERENCES `tbl_week_priority` (`wp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_login`
--
ALTER TABLE `tbl_login`
  ADD CONSTRAINT `tbl_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_precede_task`
--
ALTER TABLE `tbl_precede_task`
  ADD CONSTRAINT `tbl_precede_task_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tbl_priority_task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_priority_agenda`
--
ALTER TABLE `tbl_priority_agenda`
  ADD CONSTRAINT `tbl_priority_agenda_ibfk_2` FOREIGN KEY (`wp_id`) REFERENCES `tbl_week_priority` (`wp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_priority_file`
--
ALTER TABLE `tbl_priority_file`
  ADD CONSTRAINT `tbl_priority_file_ibfk_1` FOREIGN KEY (`priority_id`) REFERENCES `tbl_week_priority` (`wp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_priority_task`
--
ALTER TABLE `tbl_priority_task`
  ADD CONSTRAINT `tbl_priority_task_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_priority_task_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_proceed_deliverable`
--
ALTER TABLE `tbl_proceed_deliverable`
  ADD CONSTRAINT `tbl_proceed_deliverable_ibfk_1` FOREIGN KEY (`deliverable_id`) REFERENCES `tbl_deliverable` (`deliverable_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_project`
--
ALTER TABLE `tbl_project`
  ADD CONSTRAINT `tbl_project_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_project_manager`
--
ALTER TABLE `tbl_project_manager`
  ADD CONSTRAINT `tbl_project_manager_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_project_manager_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_task_assign`
--
ALTER TABLE `tbl_task_assign`
  ADD CONSTRAINT `tbl_task_assign_ibfk_4` FOREIGN KEY (`member_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_task_assign_ibfk_5` FOREIGN KEY (`task_id`) REFERENCES `tbl_priority_task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_team_member`
--
ALTER TABLE `tbl_team_member`
  ADD CONSTRAINT `tbl_team_member_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `mst_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_member_ibfk_4` FOREIGN KEY (`member_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_team_member_ibfk_5` FOREIGN KEY (`owner_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `tbl_user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `mst_role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  ADD CONSTRAINT `tbl_user_client_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_user_client_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `mst_client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  ADD CONSTRAINT `tbl_user_company_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `mst_company` (`company_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_user_company_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_week_priority`
--
ALTER TABLE `tbl_week_priority`
  ADD CONSTRAINT `tbl_week_priority_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  ADD CONSTRAINT `tbl_work_setting_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

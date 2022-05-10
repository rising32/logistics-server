-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2022 at 08:02 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pmo_db`
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
(1, 'AMAZON MHG9', NULL, NULL, 1),
(2, 'AMAZON XDEY', NULL, NULL, 0),
(4, 'ATU M2S', NULL, NULL, 0),
(12, 'Ikea', NULL, NULL, 1),
(13, 'Coty', NULL, NULL, 1),
(14, 'Mobivia', NULL, NULL, 1),
(15, 'TitTok', NULL, NULL, 1),
(16, 'Cinatis', NULL, NULL, 1),
(17, 'GCL Group', NULL, NULL, 1),
(18, 'IER BOLLORE', NULL, NULL, 1),
(19, 'Baidu', NULL, NULL, 1);

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
(1, 'ID LOGISTICS'),
(2, 'AMAZON XDEY');

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
-- Table structure for table `tbl_account_setting`
--

CREATE TABLE `tbl_account_setting` (
  `as_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `date_format` int(2) DEFAULT NULL,
  `time_format` int(2) DEFAULT NULL,
  `currency` int(1) DEFAULT NULL,
  `decimal_seperator` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_account_setting`
--

INSERT INTO `tbl_account_setting` (`as_id`, `user_id`, `date_format`, `time_format`, `currency`, `decimal_seperator`) VALUES
(5, 3, 0, 1, 1, 0);

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
(4, 3, 1, NULL, NULL, NULL),
(20, 24, 1, NULL, NULL, NULL),
(21, 25, 1, NULL, NULL, NULL),
(22, 26, 1, NULL, NULL, NULL),
(23, 27, 1, NULL, NULL, NULL),
(24, 28, 12, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_company_member`
--

CREATE TABLE `tbl_company_member` (
  `tm_id` int(8) NOT NULL,
  `owner_id` int(8) NOT NULL,
  `member_id` int(8) NOT NULL,
  `role_id` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_company_member`
--

INSERT INTO `tbl_company_member` (`tm_id`, `owner_id`, `member_id`, `role_id`) VALUES
(5, 3, 1, 2),
(10, 3, 7, 3),
(11, 3, 20, 3),
(12, 3, 21, 3);

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
(31, 'React Hook Form', 3, 42, NULL, 50, '2022-04-29', NULL, 1),
(32, 'logic diagram ', 3, 43, NULL, 50, '2022-04-01', NULL, 0),
(33, 'Logic diagram ', 3, 44, NULL, 50, '2022-04-02', NULL, 0),
(34, 'Logic diagram of priority and deliverable ', 3, 47, NULL, 50, '2022-04-05', NULL, 0),
(35, 'Weekly statistics ', 3, 49, NULL, 50, '2022-04-06', NULL, 0),
(36, 'React select component ', 3, 61, NULL, 50, '2022-04-29', NULL, 1),
(37, 'Account page logic and role', 3, 46, 20, 50, '2022-04-29', NULL, 1),
(38, 'Change Database with real data', 1, 62, NULL, 50, '2022-04-30', NULL, 0),
(39, 'Form submit function', 3, 57, NULL, 50, '2022-05-05', NULL, 1),
(40, 'Form reset', 3, 48, NULL, 50, '2022-05-05', NULL, 0),
(41, 'Spinner function', 3, 56, NULL, 50, '2022-05-06', NULL, 0),
(42, 'Deliverable Page Form', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(43, 'Material UI', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(44, 'Bug fix', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(45, 'Create Deliverable', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(46, 'Bug', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(47, 'Custom component', 3, 57, NULL, 50, '2022-05-07', NULL, 1),
(48, 'Decrease font globally ', 3, 57, 18, 50, '2022-05-07', NULL, 1),
(49, 'Week of Agenda calendar ', 3, 59, 21, 50, '2022-05-07', NULL, 1),
(50, 'Detail Priority', 3, 61, NULL, 50, '2022-05-08', NULL, 1),
(51, 'Create Task and Project', 7, 61, NULL, 50, '2022-05-08', NULL, 0),
(52, 'Auth Restful Api', 21, 55, NULL, 50, '2022-05-08', NULL, 0),
(53, 'Camera Image Picture', 3, 57, NULL, 50, '2022-05-09', NULL, 0);

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
(25, 7, '2022-03-18 12:47:53', NULL, '2022-04-17 15:02:43'),
(27, 3, '2022-03-18 21:50:32', NULL, '2022-03-18 21:50:55'),
(32, 3, '2022-03-20 15:31:52', NULL, '2022-04-17 14:35:20'),
(39, 3, '2022-04-20 14:38:03', '5auQwjXkGDqjLokexbsrFA==$DPu6bfxB1hi5YykBU8i3GVT4BYlBLAX14XYN35vJviTqO07lFH5FW4YuVpnGO0T0WSzryVFIgdaPeo/1E3cOmQ==', '2022-04-21 06:15:45'),
(40, 1, '2022-04-20 14:45:19', 'onfBp+fgDOz5GJONHMMtzQ==$r/iGc0LN6vXPaAZEdBzn63x0eBAePGAToHBtRnXhk+oKRooO9ogd2wLL0LY7lYStVVuLaBjcS+gUIkQL1xEjJw==', '2022-04-29 05:50:55'),
(41, 3, '2022-04-21 06:15:52', 'zjwOUtKP1ccep1xgdiN2JQ==$B5r0viW2XfjaZUoscGlSwMjLTaLQxDzbRsB+aQDh5rCZkWcIjIfGA0HihpT721novr0PDADyVa0ipmYeSt6AZg==', '2022-04-22 16:13:54'),
(42, 3, '2022-04-22 20:00:56', 'oQrCnZn6UGMpo2B3J3gFvw==$cR0UrcIxjjxtYRr8sfCPAZJumjzArIAlZQUc3R4OGrPjOmvbKruxzhMfzJF0PuA8t7VO3Cv+0wdMjnUr8wVt9Q==', '2022-04-26 20:00:23'),
(45, 3, '2022-04-26 20:03:57', 'Kcmq/+tG2QlnWcc95b6Ktg==$5dzsOFUSSV90hX9GQq4EVNyQNOBjLeq0gjMtBoufpw7NKd79N9rNfUuLSVC6J6B+YstzZNhbwOzzy/RogA/SBg==', '2022-04-26 20:05:47'),
(46, 3, '2022-04-27 00:39:42', 'M7zeEBq9yDYiuhoNOZ4UbQ==$T+8tRdI+2tHtgOu2WXAALYMl+lYXJvgG6BHcHLSPHihUkJQaY0mj5OKnR7RVV3NXxIUIw5So6887Vvwa5eAMrA==', '2022-04-28 08:24:28'),
(48, 3, '2022-04-29 03:35:20', '5zrpf+QQDA/Yc3zETriB6g==$mcjEpd9TkvnOxaIx0a48fajoYMkeSunY78aqs5NeakYI66zAcnnVMdDJ+f1ZmgfMPKqQ3iXv/Bgbm6z+mZStUg==', '2022-04-29 13:29:05'),
(50, 1, '2022-04-29 13:29:20', '9OPFVSq+QUWUm+y9IgYgKw==$F7tIwyH5U7W5xASVZzpULkPM+vWaAl2LzDzAuaOaT+OWOeSWr7UruwPQhAbJQiFaYmXSutAK2MDbq8/e2eTlyA==', '2022-04-29 13:29:46'),
(51, 7, '2022-04-29 13:30:23', 'ACI2CfgMkzw56ZCNcftxhg==$CMO0dPo9IXgQ9tu1iRz1BrRXrerHdvwFy/Bbj61oqBjoTFqShMbbWa7vPn8D8eh+gE2Frd/mBYAeIs4lxVxzzw==', '2022-04-29 13:32:26'),
(52, 3, '2022-04-29 13:32:36', 'j+ebtarw1dpci+EZyUevXQ==$4i/UYXZAKyc/YpDPsIh1FLyKJpv4tpFUseoF7ZSKcwidX/JyH9EaBEZFfVLmKtOfgWb7y1JPJPIG5IvGUv2gtg==', '2022-04-29 13:36:59'),
(53, 3, '2022-04-29 13:37:07', 'mlpW90sO8Y9BjupC4+Y9cw==$60rnue1L0bvNXvKKjCaZFBuMg1qd4Yi1cFcahRbkuGa1Y7PHjszddVclzTRwZntU2J2eh0xSEqQ/DmfKSW9sHg==', '2022-04-29 13:37:12'),
(54, 20, '2022-04-29 13:39:02', 'BG/3J+L6oO1BBhODG+f58A==$mRfCoMdc65Czi6wcYW+8vPpMeG7drkrYaRsR1u/DJTBz7/5fOykfsYNiNMD6K7gtcfef9nyufGQqnv/bf+/wrw==', '2022-04-29 13:40:25'),
(55, 3, '2022-04-29 13:40:32', 'I12WAepcqSbGwi/h0P38pw==$kISf5X2+VZF8H6TDc9qoGCj+sOrNZIHrsb7it+yoC6bBz7QXDDYnbDL1aCyuwWOy2TywgWaKV0MKzWZ3yC4bYg==', '2022-04-29 13:42:50'),
(56, 3, '2022-04-30 00:58:26', 'yV0U/LwrRIUkVKrz/5g7Uw==$q3JbToNPM3aFmXQ01gbH3b+gZCifPxMtKE/BqEsmGdSamLukXaAhbifi1oGzDb0qLMv16ur8G6A02fF7C/HkHA==', '2022-04-30 01:52:37'),
(57, 1, '2022-04-30 01:52:48', 'XtGiIfbB0EBBw1BLKB//mw==$v4FHD8gqSQCbwHNRM7Jzxgp7Xy6rc7VC2ZCw9ZYQLa4WgW//k2kzk/5JSaTerUErpjRqmIAOgRmR9h5dbrZ+WA==', '2022-05-03 14:57:23'),
(58, 3, '2022-04-30 05:08:27', '1H0LnVXujaOO36z9cOCNxg==$H/bZvQpDaBdyj16Yr37JV1vQWIhPT0Nncqg8B9w8JNuNhxpNVjSzNHmNDFMJmAaduOxPJb47iTz4MtoUV+ZXDg==', '2022-05-03 14:55:58'),
(59, 3, '2022-05-03 14:57:40', 'WbZ35Tsv/E+qmW/yVVXEDg==$ByNeqeN58md3LexxYV9Fshp8gj999Ayu/A+Tm92JBl7ajomAubzqtQ+ey+etqfaKCIcOzHsV5YFpvyTUR27s/A==', '2022-05-03 15:10:10'),
(60, 3, '2022-05-04 01:18:23', 'IYtBaknOSOgbFKaXQBohFA==$A9uGT0vsZ3cl4TrPUEcwHWUVr+ZZoNDeumhECnvBJkaz3zpKOJ/A73zdw4IB+hcAbd6629BoIMeJ+bRY8fO27w==', '2022-05-04 02:20:43'),
(61, 3, '2022-05-04 02:20:53', 'x+uwuXGetQg5y8SudSgVdQ==$LntjgRaA/d0GXINNhfcv7JUusiIJQDQq+QfV85By2dHuLBfORRz+iEjTKs58sSlZc0P4hANxFIaSVyyo8cN7tg==', '2022-05-04 02:34:56'),
(62, 3, '2022-05-04 02:45:50', 'WEwzN5gNs17DvQondyrq2Q==$Ot4kuZsF5bGHYZQUfjgRnzx/PxCIdsDx7jUEV4ctyxNkb5nCCfFcGC6R/A3FqpjtqeCkEFa2bqWYX/hdq7F8fA==', '2022-05-04 03:45:26'),
(63, 3, '2022-05-05 01:05:11', 'NBKxBh929H3ea/k6z9LWoA==$TeXzEVlw87iHxwPjyN/x8EL3W3eC5wZztIgihBfM24p3fjdnITPzZDhCavchEwqY327wRRwsKmio7qrR+P9Rxg==', '2022-05-05 11:01:10'),
(64, 3, '2022-05-05 13:48:21', '7cI+DO/e5o8+gtsF5B1rdQ==$ZkuqRXpaEVBn5O9IwUGftIphwGpv6Eb2nEtXr0Ai8pAqjFgGJjzQDT6eClse8EwANfvkf5VQeAnADSXFhLAzNw==', '2022-05-05 13:49:06'),
(65, 3, '2022-05-06 01:01:56', 'hYUxwdqdlOQ1Wu92Z/z9yg==$asXJ5eFr7NTXzI5JUvdCopbBckg55/9X1DUllMsd9hGuQK8OZVbSFUCfnT1Ll6HQMR1O1XTWnupxNhB7RJhDvQ==', '2022-05-06 10:16:32'),
(66, 3, '2022-05-07 01:07:51', 'iCm96EkI5En6ZeG5Q50lSg==$5xW0rjotCTEGdjltqdYWm/+bVgATQyX89MarewFB9pc8PjUesBF/Rs3QYceEH39zkpn7IalfcBswUmQe1uAHFw==', '2022-05-07 05:18:50'),
(67, 1, '2022-05-07 05:19:00', 'Fr0d+c4zewU6gEp7GEa3DA==$scBrWhQakaW1vKiBdvjB0+JYA19a2Kazm1WQhyR6HrnphWtMcDXKx9GTBWR7NqG6qLjJ/G0DNI8ZVUBsHDREPQ==', '2022-05-07 08:10:20'),
(68, 3, '2022-05-07 05:26:06', 'MOnK0vTOe5/bVlZZ/S8Ouw==$nHvDkhgcLwS4QduyhfWOX1qdBGEuFKQx0/wjmhfVAPS6M0/DdgMz030ztGD57t+8FRghyD6hGJh1/E6GyUfaKA==', '2022-05-07 05:26:16'),
(69, 3, '2022-05-07 05:26:18', '2TTE68/Qxb0l1+wiRDk9cQ==$/4MNagtmCFRycBQfS47XDQa04kFvDb9yW16PIWS+GoPFibHNzpJwsZGUPeJFb8rBeI9tljDHPh+JItlV3l+kXQ==', '2022-05-07 08:28:36'),
(70, 3, '2022-05-07 08:28:40', 'h8z4xYqz4IQYORWnrNGJdw==$h0iqRE4xm3fk+KJKo4DrVzUrRH1SVMJE5o+k5XaU+v9GjQj182tkWZfjFw5Wxbx5piFCp9yEG6E2bqMd7mNaTg==', '2022-05-07 12:18:33'),
(71, 3, '2022-05-07 13:42:51', 'mX+V7WKGKVGCLfGDdVfoRQ==$my0EOfPoUnyLYyqiMYQGkH7W7R+ULL85Wc3ShLRFRm7iWwtRfOGbMoI96ozZXgdo4G0pg5KrfI4O8zEdxTTzrw==', '2022-05-08 01:25:38'),
(72, 3, '2022-05-08 02:16:45', 'ftb35jxd3Dg7KEsu9ED1Aw==$os3QAZFZP1q+VLutDBzzGtZfeqKBgEzu0ezpWsg0Zg6nj9gO/RzWtDmc53FkULwDq79O42LyybEF37o7fAInhQ==', '2022-05-08 06:35:04'),
(73, 7, '2022-05-08 06:26:19', 'ALd43z28g5JtVKwqBkggfg==$bkJXI14TYJX3nIH63aY0fRW9DhFI6SqwTwcAxdG9U0VQ0Rh9LIWfbZoNvnFb6IfEHwJzLGp712vWjJhFOSIEQA==', '2022-05-08 06:30:09'),
(74, 20, '2022-05-08 06:31:14', '8xeMMiWrtFt+7oHlXavBQA==$sln+p8Y7X6oozkOWcmNHZprrtMIeEJi3kPoX8ew/mDLP88wxTu65wiLERHgNaB3uypFhllCmlCw5X6ItecdBkA==', '2022-05-08 06:31:53'),
(75, 21, '2022-05-08 06:32:36', 'kfDnnSwl5FV4zFYBW6LTgQ==$rbUxhIr9jIT4elK/DiXu5r8VfOkMbK1QhC5uXRnLyQdgUA0ewN7VRjmtqg6RPb7IQG0MONKDbE+VISca6akbAA==', '2022-05-08 06:56:50'),
(76, 3, '2022-05-08 06:56:56', 'VnyGJA4IAvTYEkj2AGFULA==$SM0Fsaw0WfBRyjQaJ7kKDjOvi2DiWiUNHWAQwRXnWWj+fwNjo2k0d9GWiHSVVDMCPwoXFkdUPEoDzBszTZUCqA==', '2022-05-09 01:11:23'),
(77, 1, '2022-05-09 01:11:44', '2iUG8hAJMcd/gCK1J/S9DQ==$XSSltB5ncwoNwTRd6N4ptTIjTpVFHRep/4vW0Iu0BmnoHP7E8thf+H4dDUcjOaYXdYC/1RB6u7/kyGpHk2RsdA==', NULL),
(78, 3, '2022-05-09 01:24:49', 'wupXKqTssT7HNaoMHx17/A==$F3FWplUcPLHvCxYViq2/a7+qFPL0t1CcsrPyowuebQSGVtzr0UJg8Yzx9mV3BaO2RkfTFDaH+Q1ZzIgmPYnYhw==', '2022-05-09 02:32:30'),
(79, 3, '2022-05-09 02:32:32', '0HcR88UVqkgTw5cec2tAhw==$C19pipogIvwXRhOCtDSQT2+h3t/JpP+RbBlMJsuVUAgNvkeL7AFCowf/oK2DJCa5hGbaZvPVpl4WzfLV4F0foQ==', '2022-05-09 05:52:41'),
(80, 21, '2022-05-09 02:51:16', 'H4Q6gWHbTTJgYuDN9awnPA==$UaRxa+k1CzWoxmVcEn5/QGSTTWNzUDydKIpLanJ7+ZdB741ORNrsKJu6Z5DnG5i+QglEnxpXJ7IpQqZk/n5Xcw==', '2022-05-09 03:24:40'),
(81, 21, '2022-05-09 03:24:43', 'albtxpVmrMklj+jm4KC+QQ==$vmpbH3jakWSXNgIkidxnceduehPO7o2kQSVqPQdwfWUzqJw7UjyCplk2PIgAk5nXerZEQkdFlb/utBVXbsigUg==', '2022-05-09 05:51:52'),
(82, 3, '2022-05-09 05:52:47', 'gWi7e0XuuibMcsfzzABOZg==$tjLcLzOxFF7y2Xro6lvf1/qIyMeenkZtE/luPzcEKBzxebwYcxVEFNTsINOg2wjwyBP0vfhrfiK9pUWyBrxSmQ==', '2022-05-09 05:55:13'),
(83, 21, '2022-05-09 05:55:17', 'M4XlyLR0WODEioINi2A02w==$HC722gAWsrgzmFfIxs39TCm4OandtA+7umq6YCX3Ck61wRkxu37AkrcRS68ooe196H1SDNeiRKR5JOr5EBPOng==', '2022-05-09 07:28:32'),
(84, 3, '2022-05-09 07:28:38', 'JRSoyS+9we+UhKUUdzcmKQ==$0lcNh4waloCN2HGcDjAIS6ye+nTQDLHmR7N7gvW4JiiejyIgFUOm9/mzgX0zV0ydm053reTAseaR/RzDzdCtCA==', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_precede_task`
--

CREATE TABLE `tbl_precede_task` (
  `precede_id` int(8) NOT NULL,
  `task_id` int(8) NOT NULL,
  `preceding` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_priority_file`
--

CREATE TABLE `tbl_priority_file` (
  `pf_id` int(10) NOT NULL,
  `priority_id` int(8) NOT NULL,
  `file_name` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `is_add_all` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_priority_task`
--

INSERT INTO `tbl_priority_task` (`task_id`, `creator_id`, `task_name`, `project_id`, `description`, `planned_start_date`, `planned_end_date`, `actual_start_date`, `actual_end_date`, `hourly_rate`, `is_add_all`, `is_active`, `is_deleted`) VALUES
(42, 3, 'Login Interface', 24, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 35, 0, 1, 0),
(43, 3, 'User role', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(44, 3, 'Relationship of Project and Client', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(45, 3, 'Relationship of priority and deliverable ', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(46, 3, 'Account setting ', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(47, 3, 'priority concept ', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(48, 3, 'deliverable concept ', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(49, 3, 'statistics method ', 3, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(50, 3, 'Sign out and User profile ', NULL, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(51, 3, 'Team members logic', NULL, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(52, 3, 'Sign out interface ', 24, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(53, 3, 'Task page Material UI', NULL, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(54, 3, 'Priority page design ', NULL, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(55, 3, 'Account page design ', 25, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(56, 3, 'User profile page', 28, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(57, 3, 'Deliverable page', 24, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(58, 3, 'user model', 25, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(59, 3, 'priority and deliverable model', 24, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(60, 3, 'statistics logic', 25, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(61, 3, 'Change of Task page', 24, '', '2022-04-29', '2022-05-06', '2022-04-29 00:00:00', '2022-05-06 00:00:00', 30, 0, 1, 0),
(62, 3, 'Decrease font globally', 26, '', '2022-04-30', '2022-05-07', '2022-04-30 00:00:00', '2022-05-07 00:00:00', 30, 0, 1, 0);

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
(3, 3, 'Research App Logic', '2022-03-15', '2022-03-30', NULL, NULL, 'IKEA Project'),
(24, 3, 'Frontend of IDL logistics ', NULL, NULL, NULL, NULL, NULL),
(25, 3, 'Backend of IDL logistics ', '2022-04-29', '2022-05-06', '2022-04-29', '2022-05-06', ''),
(26, 3, 'Feedback and Bug fix', NULL, NULL, NULL, NULL, NULL),
(27, 3, 'Self Project', NULL, NULL, NULL, NULL, NULL),
(28, 3, 'Test Project', NULL, NULL, NULL, NULL, NULL),
(29, 3, 'Working Project', '2022-05-07', '2022-05-14', '2022-05-07', '2022-05-14', ''),
(30, 3, 'Responsive Design', '2022-05-07', '2022-05-14', '2022-05-07', '2022-05-14', ''),
(31, 3, 'Exceiption', '2022-05-07', '2022-05-14', '2022-05-07', '2022-05-14', ''),
(32, 3, 'Project Model', '2022-05-09', '2022-05-16', '2022-05-09', '2022-05-16', ''),
(33, 3, 'Add User Role', '2022-05-01', '2022-05-31', '2022-05-01', '2022-05-31', ''),
(34, 1, 'Project Manager Control', '2022-05-09', '2022-05-16', '2022-05-09', '2022-05-16', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_project_member`
--

CREATE TABLE `tbl_project_member` (
  `pm_id` int(8) NOT NULL,
  `project_id` int(8) NOT NULL,
  `user_id` int(8) NOT NULL,
  `is_manager` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(24, 42, 3, 3),
(25, 43, 3, 3),
(26, 44, 3, 3),
(27, 47, 3, 3),
(28, 49, 3, 3),
(29, 62, 1, 3),
(30, 56, 3, 3),
(31, 56, 3, 3),
(32, 61, 3, 3),
(33, 61, 7, 3),
(34, 55, 21, 3);

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
(1, 'pmanager@mail.com', '12523568954', '123456', 'Jonshn Deli', NULL, NULL, 2, '2022-03-17 10:42:49'),
(3, 'admin@mail.com', '56345896541', '123456', 'Admin', NULL, NULL, 1, '2022-03-17 10:42:49'),
(7, 'puser@mail.com', '1235648542', '123456', 'Dorneld henli', NULL, NULL, 3, '2022-03-17 12:38:10'),
(20, 'testuser1@mail.com', '18600559433', '123456', 'Test user', NULL, NULL, 3, '2022-04-29 13:39:03'),
(21, 'common@mail.com', '18600559489', '123456', 'Common User', NULL, NULL, 3, '2022-05-08 06:32:36');

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
(10, 3, 12, 1),
(11, 3, 13, 1),
(12, 3, 14, 1),
(13, 3, 15, 1),
(14, 3, 16, 1),
(15, 3, 17, 1),
(16, 3, 18, 1),
(17, 3, 19, 1);

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
(4, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_week_priority`
--

CREATE TABLE `tbl_week_priority` (
  `wp_id` int(10) NOT NULL,
  `user_id` int(8) NOT NULL,
  `week` int(2) NOT NULL,
  `priority` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `project_id` int(8) DEFAULT NULL,
  `goal` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `detail` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_completed` float DEFAULT NULL,
  `is_weekly` tinyint(1) DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_week_priority`
--

INSERT INTO `tbl_week_priority` (`wp_id`, `user_id`, `week`, `priority`, `project_id`, `goal`, `detail`, `is_completed`, `is_weekly`, `end_date`) VALUES
(18, 3, 17, 'Decrease font globally ', NULL, 'Bug fix ', '', 0, 0, NULL),
(19, 3, 17, 'Task page UI', NULL, 'Bug fix ', '', 0, 0, NULL),
(20, 3, 16, 'Account page logic and role', NULL, 'User role', '', 1, 0, '2022-04-29'),
(21, 3, 17, 'Week of Agenda calendar ', NULL, 'UI', '', 1, 0, '2022-05-07'),
(22, 3, 18, 'Priority interface fix', NULL, 'input enter key ', '', 0, 0, NULL),
(23, 3, 18, 'Form action by React Hook Form', NULL, 'form action', '', 0, 0, NULL),
(24, 3, 18, 'Reset of Form', NULL, 'form action', '', 0, 0, NULL),
(25, 3, 18, 'Form Reset Api', NULL, 'form action', '', 0, 0, NULL),
(26, 3, 18, 'Edit priority', NULL, 'Edit ', '', 1, 1, '2022-05-08'),
(27, 3, 18, 'Priority Tab', NULL, '', '', 0, 0, NULL),
(28, 3, 19, 'User role', NULL, '', '', 0, 0, NULL);

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
-- Indexes for table `tbl_account_setting`
--
ALTER TABLE `tbl_account_setting`
  ADD PRIMARY KEY (`as_id`),
  ADD UNIQUE KEY `userId` (`user_id`);

--
-- Indexes for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  ADD PRIMARY KEY (`cp_id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `tbl_company_member`
--
ALTER TABLE `tbl_company_member`
  ADD PRIMARY KEY (`tm_id`),
  ADD UNIQUE KEY `owner_id_2` (`owner_id`,`member_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `member_id` (`member_id`);

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
-- Indexes for table `tbl_project_member`
--
ALTER TABLE `tbl_project_member`
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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `project_id` (`project_id`);

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
  MODIFY `client_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `mst_company`
--
ALTER TABLE `mst_company`
  MODIFY `company_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mst_role`
--
ALTER TABLE `mst_role`
  MODIFY `role_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_account_setting`
--
ALTER TABLE `tbl_account_setting`
  MODIFY `as_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  MODIFY `cp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tbl_company_member`
--
ALTER TABLE `tbl_company_member`
  MODIFY `tm_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_deliverable`
--
ALTER TABLE `tbl_deliverable`
  MODIFY `deliverable_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `tbl_login`
--
ALTER TABLE `tbl_login`
  MODIFY `login_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `tbl_precede_task`
--
ALTER TABLE `tbl_precede_task`
  MODIFY `precede_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_priority_agenda`
--
ALTER TABLE `tbl_priority_agenda`
  MODIFY `pa_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_priority_file`
--
ALTER TABLE `tbl_priority_file`
  MODIFY `pf_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_priority_task`
--
ALTER TABLE `tbl_priority_task`
  MODIFY `task_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `tbl_proceed_deliverable`
--
ALTER TABLE `tbl_proceed_deliverable`
  MODIFY `pd_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_project`
--
ALTER TABLE `tbl_project`
  MODIFY `project_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_project_member`
--
ALTER TABLE `tbl_project_member`
  MODIFY `pm_id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_task_assign`
--
ALTER TABLE `tbl_task_assign`
  MODIFY `assign_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `user_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_user_client`
--
ALTER TABLE `tbl_user_client`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_user_company`
--
ALTER TABLE `tbl_user_company`
  MODIFY `uc_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_week_priority`
--
ALTER TABLE `tbl_week_priority`
  MODIFY `wp_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  MODIFY `ws_id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_account_setting`
--
ALTER TABLE `tbl_account_setting`
  ADD CONSTRAINT `tbl_account_setting_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_client_project`
--
ALTER TABLE `tbl_client_project`
  ADD CONSTRAINT `tbl_client_project_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_client_project_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `mst_client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_company_member`
--
ALTER TABLE `tbl_company_member`
  ADD CONSTRAINT `tbl_company_member_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `mst_role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_company_member_ibfk_4` FOREIGN KEY (`member_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_company_member_ibfk_5` FOREIGN KEY (`owner_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `tbl_project_member`
--
ALTER TABLE `tbl_project_member`
  ADD CONSTRAINT `tbl_project_member_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_project_member_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_task_assign`
--
ALTER TABLE `tbl_task_assign`
  ADD CONSTRAINT `tbl_task_assign_ibfk_4` FOREIGN KEY (`member_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_task_assign_ibfk_5` FOREIGN KEY (`task_id`) REFERENCES `tbl_priority_task` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `tbl_week_priority_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_week_priority_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `tbl_project` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_work_setting`
--
ALTER TABLE `tbl_work_setting`
  ADD CONSTRAINT `tbl_work_setting_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

# safihouse

This is the structure of all tables created in the db

CREATE TABLE `houses` (
  `house_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `room` varchar(255) DEFAULT NULL,
  `picture` text NOT NULL,
  `facilities` varchar(255) DEFAULT NULL,
  `coordinates` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `host` varchar(60) NOT NULL,
  `content` text NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `basic_price` int(255) DEFAULT NULL,
  `entire_price` int(60) NOT NULL,
  `check_in` time NOT NULL,
  `check_out` time NOT NULL,
  `maintenance_fee` int(40) DEFAULT NULL,
  `listing_type` varchar(255) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `pet_allowance` tinyint(1) DEFAULT NULL,
  `host_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `calendar` (
  `calendarId` int(11) NOT NULL,
  `house_id` int(11) NOT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `check_in` time DEFAULT NULL,
  `check_out` time DEFAULT NULL,
  `reservation_type` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `guest` text NOT NULL,
  `payment_status` int(11) DEFAULT NULL,
  `payment_mode` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `host_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `host` (
  `host_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `profile_pic` text NOT NULL,
  `bio` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `images` (
  `imageId` int(11) NOT NULL,
  `link` text NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `link_to` varchar(255) DEFAULT NULL,
  `house_id` int(11) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `nofication` (
  `nofId` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `date1` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `reviews` (
  `reviewId` int(11) NOT NULL,
  `content` text NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rating` int(2) NOT NULL DEFAULT 0,
  `date_created` date DEFAULT NULL,
  `house_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

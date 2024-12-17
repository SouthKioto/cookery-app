-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2024 at 12:14 AM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cookery_app`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recipe`
--

CREATE TABLE `recipe` (
  `recipe_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`ingredients`)),
  `cooking_time` text NOT NULL,
  `add_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`recipe_id`, `title`, `description`, `ingredients`, `cooking_time`, `add_date`) VALUES
(24, 'Pizza', 'upiecz pizze', '[\"pomidory\",\"cebula\",\"czosnek\"]', '12h', '2024-12-14'),
(25, 'Zupa z Jakuba', 'wsadz Jakuba do gara i gotuj reszte zjedz w czasie gotowania', '[\"Jakub\",\"kurwa\",\"koń\",\"marchewka\"]', '5 min', '2024-12-15'),
(26, 'Tosty', 'upiecz tosty', '[\"pomidor\",\"cebula\",\"czosnek\"]', '13:40min', '2024-12-17');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` text NOT NULL,
  `user_surname` text NOT NULL,
  `user_email` text NOT NULL,
  `user_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_surname`, `user_email`, `user_password`) VALUES
(1, 'Jan', 'Kowalski', 'JKowalski@gmail.com', '123'),
(5, 'Janina', 'Kowalski', 'JANINAKOWALSKI@GMAIL.COM', '123');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_liked_recipes`
--

CREATE TABLE `user_liked_recipes` (
  `user_liked_recipes_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_liked_recipes`
--

INSERT INTO `user_liked_recipes` (`user_liked_recipes_id`, `user_id`, `recipe_id`) VALUES
(14, 1, 24),
(17, 1, 25);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_recipe`
--

CREATE TABLE `user_recipe` (
  `user_recipe_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_recipe`
--

INSERT INTO `user_recipe` (`user_recipe_id`, `user_id`, `recipe_id`) VALUES
(9, 1, 25),
(10, 1, 26);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`recipe_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indeksy dla tabeli `user_liked_recipes`
--
ALTER TABLE `user_liked_recipes`
  ADD PRIMARY KEY (`user_liked_recipes_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indeksy dla tabeli `user_recipe`
--
ALTER TABLE `user_recipe`
  ADD PRIMARY KEY (`user_recipe_id`),
  ADD UNIQUE KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_liked_recipes`
--
ALTER TABLE `user_liked_recipes`
  MODIFY `user_liked_recipes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_recipe`
--
ALTER TABLE `user_recipe`
  MODIFY `user_recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_liked_recipes`
--
ALTER TABLE `user_liked_recipes`
  ADD CONSTRAINT `user_liked_recipes_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_liked_recipes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_recipe`
--
ALTER TABLE `user_recipe`
  ADD CONSTRAINT `user_recipe_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_recipe_ibfk_3` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

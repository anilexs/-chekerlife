-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 10 oct. 2023 à 16:52
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `chekerlife`
--

-- --------------------------------------------------------

--
-- Structure de la table `alias`
--

CREATE TABLE `alias` (
  `id_alias` int(11) NOT NULL,
  `aliasName` varchar(50) NOT NULL,
  `catalog_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `alias`
--

INSERT INTO `alias` (`id_alias`, `aliasName`, `catalog_id`) VALUES
(1, 'sao', 1),
(2, 'snk', 20),
(3, 'aot', 20),
(4, 'sao', 21);

-- --------------------------------------------------------

--
-- Structure de la table `catalog`
--

CREATE TABLE `catalog` (
  `id_catalogue` int(11) NOT NULL,
  `image_catalogue` varchar(100) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` varchar(300) NOT NULL,
  `type` varchar(50) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `catalog`
--

INSERT INTO `catalog` (`id_catalogue`, `image_catalogue`, `nom`, `description`, `type`, `likes`) VALUES
(1, 'sao.jpg', 'sword art online', 'sao', 'films', 9999999),
(2, 'food-wars.jpg', 'food wars', 'fw', 'anime', 1001),
(3, 'nyarko.jpg', 'nyaruko', 'nyaruko', 'films', 1501),
(4, 'lolirock.jpg', 'lolirock', 'loli', 'anime', 1),
(5, 'call-of-the-nigth.jpg', 'call of the night', 'call of the nigth', 'anime', 4),
(6, 'ride-your-wave.png', 'ride your wave', 'ride your wave', 'films', 7518),
(7, 'assassination-classroom.jpg', 'assassination classroom', 'assassination classroom', 'anime', 3),
(8, 'fairy-tail.jpg', 'fairy tail', 'fairy tail', 'anime', 3),
(9, 'Oshi-no-Ko-Home.jpg', 'oshi no ko', 'oshi no ko', 'films', 4),
(10, 'mirrai-nikki.png', 'mirrai nikki', 'mirrai nikki', 'drama', 3),
(11, 'akb0048.jpg', 'akb0048', 'akb0048', 'films', 3),
(12, 'jewelpet.jpg', 'jewelpet', 'jewelpet', 'anime', 2),
(13, 'tokyo-ghoul.jpg', 'tokyo ghoul', 'tokyo ghoul', 'films', 2),
(14, 'shugo-chara.jpg', 'shugo chara', 'shugo chara', 'anime', 3),
(15, 'one-punch-man.jpg', 'one punche man', 'one punche man', 'films', 3),
(16, 'evangelion.jpg', 'evengelion', 'evengelion', 'films', 2),
(17, 'nanbaka.jpg', 'nanbaka', 'nanbaka', 'anime', 3),
(18, 'bleach.jpg', 'bleach', 'bleach', 'films', 4),
(19, 'leadale-no-daichi-nite.jpg', 'leadale no daichi nite', 'leadale no daichi nite', 'films', 1),
(20, 'attack-on-titan.jpg', 'attack on titan', 'attack-on-titan', 'anime', 1),
(21, 'saos2.jpg', 'sword art online saison 2', 'sword art online saison 2', 'anime', 1);

-- --------------------------------------------------------

--
-- Structure de la table `collections`
--

CREATE TABLE `collections` (
  `id_collections` int(11) NOT NULL,
  `collections_name` varchar(150) NOT NULL,
  `catalog_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `collections`
--

INSERT INTO `collections` (`id_collections`, `collections_name`, `catalog_id`) VALUES
(1, 'sword art online', 1),
(2, 'sword art online', 21),
(3, 'assassination classroom', 7),
(4, 'assassination classroom', 11),
(5, 'one punch man', 15),
(6, 'one punch man', 8),
(7, 'sword art online', 5),
(8, 'sword art online', 18),
(9, 'sword art online', 17),
(10, 'sword art online', 4);

-- --------------------------------------------------------

--
-- Structure de la table `episode`
--

CREATE TABLE `episode` (
  `id_episode` int(11) NOT NULL,
  `photo` varchar(75) DEFAULT NULL,
  `saison_id` int(11) DEFAULT NULL,
  `catalog_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `episode`
--

INSERT INTO `episode` (`id_episode`, `photo`, `saison_id`, `catalog_id`, `title`, `description`) VALUES
(2, NULL, 1, 1, 'premier fois', 'ariver a aincrade');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id_likes` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_edited` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_likes`, `user_id`, `catalog_id`, `created_at`, `last_edited`, `active`) VALUES
(1, 6, 20, '2023-10-05 11:51:43', '2023-10-10 10:13:40', 0),
(2, 6, 14, '2023-10-05 12:30:24', '2023-10-09 08:17:40', 1),
(3, 6, 10, '2023-10-05 12:33:07', '2023-10-10 08:32:51', 0),
(4, 6, 18, '2023-10-05 12:36:44', '2023-10-09 08:24:48', 1),
(5, 6, 3, '2023-10-05 13:25:13', '2023-10-10 08:50:55', 1),
(6, 6, 4, '2023-10-05 13:54:36', '2023-10-10 10:07:36', 0),
(7, 6, 5, '2023-10-05 14:00:07', '2023-10-10 11:02:48', 1),
(8, 6, 12, '2023-10-05 14:08:35', '2023-10-09 08:03:16', 0),
(9, 6, 13, '2023-10-05 14:12:04', '2023-10-09 08:03:15', 0),
(10, 6, 7, '2023-10-05 14:40:17', '2023-10-10 11:02:34', 0),
(11, 6, 2, '2023-10-05 14:41:06', '2023-10-10 07:56:26', 1),
(12, 6, 1, '2023-10-05 14:44:27', '2023-10-10 11:01:38', 0),
(13, 6, 19, '2023-10-05 14:44:48', '2023-10-10 07:45:19', 0),
(14, 6, 17, '2023-10-05 14:45:52', '2023-10-09 08:01:43', 1),
(15, 6, 9, '2023-10-05 14:46:20', '2023-10-09 08:01:42', 1),
(16, 6, 21, '2023-10-06 08:36:40', '2023-10-10 10:13:42', 1),
(17, 6, 6, '2023-10-06 08:44:10', '2023-10-10 07:55:02', 1),
(18, 6, 8, '2023-10-06 09:30:51', '2023-10-09 08:03:12', 0),
(19, 6, 15, '2023-10-06 11:02:20', '2023-10-10 08:15:59', 1),
(20, 6, 11, '2023-10-06 11:48:13', '2023-10-09 08:03:19', 0),
(21, 6, 16, '2023-10-09 08:01:37', '2023-10-09 08:03:13', 0);

-- --------------------------------------------------------

--
-- Structure de la table `saison`
--

CREATE TABLE `saison` (
  `id_saison` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `saison_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `saison`
--

INSERT INTO `saison` (`id_saison`, `nom`, `description`, `saison_number`) VALUES
(1, 'sword art onligne saison 1', 'sword art onligne saison 1', 1);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `photo_profile` varchar(100) DEFAULT NULL,
  `pseudo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` enum('beta-testeur','membre','owner') NOT NULL DEFAULT 'beta-testeur'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `photo_profile`, `pseudo`, `email`, `password`, `role`) VALUES
(1, 'profile-defaux.png', 'alexis', 'alexis', 'alexis', 'owner'),
(2, 'profile-defaux.png', '', '', '', 'beta-testeur'),
(3, 'profile-defaux.png', 'silica', 'silica@sao.com', 'silica', 'beta-testeur'),
(5, 'profile-defaux.png', 'anilexs', 'anilexs@gmail.com', 'anilexs', 'beta-testeur'),
(6, 'profile-defaux.png', 'test', 'test', '$2y$10$m4h6S/779MOEDgq1yZW1qecb1M1z8W3xGbGEhwneUMFZ5cmOSeati', 'beta-testeur'),
(26, 'profile-defaux.png', 'anilexs2', '2', '$2y$10$124HTaf3TXZC1l9NWL56iuPJQEW.hWNa30Qs.JiNULf2xM7GwTz8C', 'beta-testeur'),
(28, 'profile-defaux.png', 'anilexs3', 'a', '$2y$10$IIigacdGRc9FTThfT2RJI.0WoPpTQ60mgrnj2cwZpVekqc99Ikqmu', 'beta-testeur'),
(29, 'profile-defaux.png', 'ad', 'aa', '$2y$10$YzawIZhF82IJgULDWWRQZujkyTQjEZKZw15ccZQ.I4gSUQoAkII36', 'beta-testeur'),
(53, 'profile-defaux.png', 'test2', 'test2', '$2y$10$vgVSKCxjMQ328sHo3KHjcezdQP/rwqeZErcXJy8mDPvNzyQJ3UUaq', 'beta-testeur'),
(54, 'profile-defaux.png', 'test3', 'test3', '$2y$10$QJ4jHcp0lSCBjhElqvAmhO5KThAHL2ZA7/0.MnGX5AjhY7zGj1RXS', 'beta-testeur'),
(58, 'profile-defaux.png', 'test4', 'test4', '$2y$10$wQM0KHtmEs6WDvNP9EFiseNlpG62ekAJcjhiw71olPbGWl6UCK7Ba', 'beta-testeur'),
(61, 'profile-defaux.png', 'test6', 'test6', '$2y$10$zxfzXLowRvCpjaGiwK3a9e2hkwq9uugyQllG0GGViImFv6g16OwuC', 'beta-testeur'),
(62, 'profile-defaux.png', 'eeee', 'eeee', '$2y$10$Q1rPWzVbXZGz1NivOnGJgeG0zqW8foTxzkJC/anU7SO3o4W50B/Si', 'beta-testeur'),
(63, 'profile-defaux.png', 'e1', 'e1', '$2y$10$EINt58wwDGHMZW5u7tp5b.2mZwHkea//SXqJ4YtwiCMSaLUiORura', 'beta-testeur');

-- --------------------------------------------------------

--
-- Structure de la table `user_views`
--

CREATE TABLE `user_views` (
  `id_user_views` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `episode_id` int(11) NOT NULL,
  `views` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `alias`
--
ALTER TABLE `alias`
  ADD PRIMARY KEY (`id_alias`),
  ADD KEY `catalog_id` (`catalog_id`);

--
-- Index pour la table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id_catalogue`);

--
-- Index pour la table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id_collections`),
  ADD UNIQUE KEY `catalog_id` (`catalog_id`);

--
-- Index pour la table `episode`
--
ALTER TABLE `episode`
  ADD PRIMARY KEY (`id_episode`),
  ADD KEY `catalog_id` (`catalog_id`),
  ADD KEY `saison_id` (`saison_id`);

--
-- Index pour la table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_likes`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `catalog_id` (`catalog_id`);

--
-- Index pour la table `saison`
--
ALTER TABLE `saison`
  ADD PRIMARY KEY (`id_saison`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `user_views`
--
ALTER TABLE `user_views`
  ADD PRIMARY KEY (`id_user_views`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `episode_id` (`episode_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `alias`
--
ALTER TABLE `alias`
  MODIFY `id_alias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id_catalogue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `collections`
--
ALTER TABLE `collections`
  MODIFY `id_collections` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `episode`
--
ALTER TABLE `episode`
  MODIFY `id_episode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `saison`
--
ALTER TABLE `saison`
  MODIFY `id_saison` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `user_views`
--
ALTER TABLE `user_views`
  MODIFY `id_user_views` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `alias`
--
ALTER TABLE `alias`
  ADD CONSTRAINT `alias_ibfk_1` FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`id_catalogue`);

--
-- Contraintes pour la table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`id_catalogue`);

--
-- Contraintes pour la table `episode`
--
ALTER TABLE `episode`
  ADD CONSTRAINT `episode_ibfk_1` FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`id_catalogue`),
  ADD CONSTRAINT `episode_ibfk_2` FOREIGN KEY (`saison_id`) REFERENCES `saison` (`id_saison`);

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`catalog_id`) REFERENCES `catalog` (`id_catalogue`);

--
-- Contraintes pour la table `user_views`
--
ALTER TABLE `user_views`
  ADD CONSTRAINT `user_views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `user_views_ibfk_2` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`id_episode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

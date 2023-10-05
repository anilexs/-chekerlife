-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 04 oct. 2023 à 16:46
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
-- Structure de la table `catalog`
--

CREATE TABLE `catalog` (
  `id_catalogue` int(11) NOT NULL,
  `image_catalogue` varchar(100) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` varchar(300) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `catalog`
--

INSERT INTO `catalog` (`id_catalogue`, `image_catalogue`, `nom`, `description`, `likes`) VALUES
(1, 'sao.jpg', 'sword art online', 'sao', 6),
(2, 'food-wars.jpg', 'food wars', 'sab', 3),
(3, 'nyarko.jpg', 'nyaruko', 'sao', 2),
(4, 'lolirock.jpg', 'lolirock', 'sao', 1),
(5, 'call-of-the-nigth.jpg', 'call og the nigth', 'sao', 2),
(6, 'ride-your-wave.png', 'ride your wave', 'sao', 3),
(7, 'assassination-classroom.jpg', 'assassination-classroom', 'sao', 3),
(8, 'fairy-tail.jpg', 'fairy tail', 'sao', 3),
(9, 'Oshi-no-Ko-Home.jpg', 'oshi no ko', 'sao', 3),
(10, 'mirrai-nikki.png', 'mirrai nikki', 'sao', 3),
(11, 'akb0048.jpg', 'akb0048', 'sao', 2),
(12, 'jewelpet.jpg', 'jewelpet', 'sao', 3),
(13, 'tokyo-ghoul.jpg', 'tokyo ghoul', 'sao', 2),
(14, 'shugo-chara.jpg', 'shugo chara', 'sao', 2),
(15, 'one-punch-man.jpg', 'one punche man', 'sao', 2),
(16, 'evangelion.jpg', 'evengelion', 'sao', 2),
(17, 'nanbaka.jpg', 'nanbaka', 'sao', 2),
(18, 'bleach.jpg', 'bleach', 'bleach', 4),
(19, 'leadale-no-daichi-nite.jpg', 'leadale no daichi nite', 'kozariu', 1);

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
(1, NULL, NULL, 1, 'sa1', 'sa1');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

CREATE TABLE `likes` (
  `id_likes` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `catalog_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_likes`, `user_id`, `catalog_id`, `created_at`, `active`) VALUES
(1, 6, 2, '2023-10-01 18:50:39', 0),
(2, 6, 1, '2023-10-01 18:50:59', 0),
(3, 6, 5, '2023-10-01 18:54:13', 0),
(4, 6, 4, '2023-10-01 18:54:14', 0),
(5, 6, 3, '2023-10-01 18:54:15', 1),
(6, 6, 8, '2023-10-01 18:58:09', 0),
(7, 6, 7, '2023-10-01 18:58:10', 0),
(8, 6, 6, '2023-10-01 18:58:10', 1),
(9, 6, 11, '2023-10-01 18:58:12', 0),
(10, 6, 12, '2023-10-01 18:58:13', 1),
(11, 6, 13, '2023-10-01 18:59:51', 0),
(12, 6, 17, '2023-10-01 18:59:52', 0),
(13, 6, 16, '2023-10-01 18:59:53', 0),
(14, 6, 18, '2023-10-01 18:59:54', 1),
(15, 6, 9, '2023-10-01 18:59:59', 0),
(16, 6, 10, '2023-10-01 19:00:00', 0),
(17, 6, 14, '2023-10-01 19:00:02', 0),
(18, 6, 15, '2023-10-01 19:00:03', 0),
(33, 6, 19, '2023-10-04 12:18:38', 0);

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

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `pseudo` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(250) NOT NULL,
  `role` enum('beta-testeur','membre','owner') NOT NULL DEFAULT 'beta-testeur'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `pseudo`, `email`, `password`, `role`) VALUES
(1, 'alexis', 'alexis', 'alexis', 'owner'),
(2, '', '', '', 'beta-testeur'),
(3, 'silica', 'silica@sao.com', 'silica', 'beta-testeur'),
(5, 'anilexs', 'anilexs@gmail.com', 'anilexs', 'beta-testeur'),
(6, 'test', 'test', '$2y$10$m4h6S/779MOEDgq1yZW1qecb1M1z8W3xGbGEhwneUMFZ5cmOSeati', 'beta-testeur'),
(26, 'anilexs2', '2', '$2y$10$124HTaf3TXZC1l9NWL56iuPJQEW.hWNa30Qs.JiNULf2xM7GwTz8C', 'beta-testeur'),
(28, 'anilexs3', 'a', '$2y$10$IIigacdGRc9FTThfT2RJI.0WoPpTQ60mgrnj2cwZpVekqc99Ikqmu', 'beta-testeur'),
(29, 'ad', 'aa', '$2y$10$YzawIZhF82IJgULDWWRQZujkyTQjEZKZw15ccZQ.I4gSUQoAkII36', 'beta-testeur'),
(53, 'test2', 'test2', '$2y$10$vgVSKCxjMQ328sHo3KHjcezdQP/rwqeZErcXJy8mDPvNzyQJ3UUaq', 'beta-testeur'),
(54, 'test3', 'test3', '$2y$10$QJ4jHcp0lSCBjhElqvAmhO5KThAHL2ZA7/0.MnGX5AjhY7zGj1RXS', 'beta-testeur'),
(58, 'test4', 'test4', '$2y$10$wQM0KHtmEs6WDvNP9EFiseNlpG62ekAJcjhiw71olPbGWl6UCK7Ba', 'beta-testeur'),
(61, 'test6', 'test6', '$2y$10$zxfzXLowRvCpjaGiwK3a9e2hkwq9uugyQllG0GGViImFv6g16OwuC', 'beta-testeur'),
(62, 'eeee', 'eeee', '$2y$10$Q1rPWzVbXZGz1NivOnGJgeG0zqW8foTxzkJC/anU7SO3o4W50B/Si', 'beta-testeur'),
(63, 'e1', 'e1', '$2y$10$EINt58wwDGHMZW5u7tp5b.2mZwHkea//SXqJ4YtwiCMSaLUiORura', 'beta-testeur');

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
-- Déchargement des données de la table `user_views`
--

INSERT INTO `user_views` (`id_user_views`, `user_id`, `episode_id`, `views`) VALUES
(1, 1, 1, 1),
(2, 5, 1, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id_catalogue`);

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
-- AUTO_INCREMENT pour la table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id_catalogue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `episode`
--
ALTER TABLE `episode`
  MODIFY `id_episode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT pour la table `saison`
--
ALTER TABLE `saison`
  MODIFY `id_saison` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT pour la table `user_views`
--
ALTER TABLE `user_views`
  MODIFY `id_user_views` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

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

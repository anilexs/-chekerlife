-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 29 sep. 2023 à 16:49
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
(1, 'sao.jpg', 'sao', 'sao', 0),
(2, '', 'sab', 'sab', 0);

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
  `like` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(29, 'ad', 'aa', '$2y$10$YzawIZhF82IJgULDWWRQZujkyTQjEZKZw15ccZQ.I4gSUQoAkII36', 'beta-testeur');

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
  MODIFY `id_catalogue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `episode`
--
ALTER TABLE `episode`
  MODIFY `id_episode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `likes`
--
ALTER TABLE `likes`
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `saison`
--
ALTER TABLE `saison`
  MODIFY `id_saison` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT pour la table `user_views`
--
ALTER TABLE `user_views`
  MODIFY `id_user_views` int(11) NOT NULL AUTO_INCREMENT;

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

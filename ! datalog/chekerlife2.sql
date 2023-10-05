-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 28 sep. 2023 à 16:40
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
(6, 'test', 'test', '$2y$10$m4h6S/779MOEDgq1yZW1qecb1M1z8W3xGbGEhwneUMFZ5cmOSeati', 'beta-testeur');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id_catalogue`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id_catalogue` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 10 oct. 2023 à 22:41
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `alias`
--

INSERT INTO `alias` (`id_alias`, `aliasName`, `catalog_id`) VALUES
(1, 'sao', 1),
(2, 'snk', 20),
(3, 'aot', 20),
(4, 'sao', 21),
(5, 'haiyore', 3),
(6, 'nyaruko', 3);

-- --------------------------------------------------------

--
-- Structure de la table `catalog`
--

CREATE TABLE `catalog` (
  `id_catalogue` int(11) NOT NULL,
  `image_catalogue` varchar(100) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `description` varchar(750) NOT NULL,
  `publish_date` date NOT NULL,
  `type` varchar(50) NOT NULL,
  `likes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `catalog`
--

INSERT INTO `catalog` (`id_catalogue`, `image_catalogue`, `nom`, `description`, `publish_date`, `type`, `likes`) VALUES
(1, 'sao.jpg', 'sword art online', 'En 2022, l\'humanité a réussi à créer une réalité virtuelle. Grâce à un casque, les humains peuvent se plonger entièrement dans le monde virtuel en étant comme déconnectés de la réalité, et Sword Art Online est le premier MMORPG a utiliser ce système.', '2003-12-08', 'films', 10000000),
(2, 'food-wars.jpg', 'food wars', 'Synopsis. Sôma Yukihira rêve de devenir chef cuisinier dans le restaurant familial et ainsi surpasser les talents culinaires de son père. Alors que Sôma vient juste d\'être diplômé au collège, son père Jôichirô Yukihira ferme le restaurant pour partir cuisiner à travers le monde.\n', '2003-12-08', 'anime', 1001),
(3, 'nyarko.jpg', 'Haiyore! Nyaruko-san\n', 'Yasaka Mahiro est un jeune lycéen normal, jusqu\'au jour où il se fait attaquer par un monstre. Il est sauvé par Nyaruko, la divinité du Chaos qui était tombée immédiatement amoureuse après avoir vu une photo de lui. Il vit avec sa mère Yoriko et rêve d\'une vie sans problèmes et très vite sans extra-terrestres.', '2003-12-08', 'films', 1501),
(4, 'lolirock.jpg', 'lolirock', 'Synopsis. Iris est une fille normale. Cependant, lorsqu\'elle chante, elle produit des choses étranges. Pendant ce temps, deux jeunes filles, Talia et Auriana, décident de faire passer une audition à toutes les filles de Sunny Bay pour trouver une mystérieuse princesse.\n', '2003-12-08', 'anime', 2),
(5, 'call-of-the-nigth.jpg', 'call of the night', 'Un lycéen de quatorze ans, qui ne parvient plus à trouver le sommeil dans sa vie ennuyeuse. Pour retrouver goût à la vie, il se met à déambuler dans les rues de nuit. Il n\'est pas doué avec les filles, mais il tente de tomber amoureux de Nazuna afin de devenir un vampire.', '2003-12-08', 'anime', 4),
(6, 'ride-your-wave.png', 'ride your wave', 'Hinako, une fille passionnée de surf, déménage dans une ville balnéaire. Lors d\'un incendie, elle est sauvée par un pompier nommé Minato. De cet incident va naître une incroyable fusion entre deux êtres aux éléments contraires, mais Minato meurt en surfant seul. Tandis que tout le monde tente de surmonter sa peine, Hinako s\'accroche à l\'esprit de son ami, qui rejaillit dans sa vie sous forme d\'eau.', '2003-12-08', 'films', 7518),
(7, 'assassination-classroom.jpg', 'assassination classroom', 'Koro Sensei devient enseignant de la classe 3-E de l\'école de Kunugigaoka. Après avoir détruit la Lune et promis de faire exploser la Terre, ses élèves tentent de l\'arrêter. Unis par un lien mystérieux, ils ont un an pour achever leur mission.\n', '2003-12-08', 'anime', 4),
(8, 'fairy-tail.jpg', 'fairy tail', 'Lucy, une jeune fille, rêve de devenir magicienne. Un jour, elle rencontre Natsu, un magicien maîtrisant le feu, ce dernier l\'invite alors à rejoindre sa guilde. Il s\'agit de la célèbre Fairy Tail, le sujet de tous les rêves de Lucy. Mais celle-ci est bien mystérieuse et semble être à l\'origine de nombreux scandales.\n', '2003-12-08', 'anime', 3),
(9, 'Oshi-no-Ko-Home.jpg', 'oshi no ko', 'Le docteur Gorô est obstétricien dans un hôpital de campagne. Il est loin du monde de paillettes dans lequel évolue Ai Hoshino, une chanteuse au succès grandissant dont il est \"un fan absolu\". Ces deux-là vont peut-être se rencontrer dans des circonstances peu favorables, mais cet événement changera leur vie à jamais !', '2003-12-08', 'films', 4),
(10, 'mirrai-nikki.png', 'mirrai nikki', 'L\'histoire nous entraîne dans le quotidien de Yukiteru Amano un jeune adolescent solitaire se renfermant sur lui-même détaché de la réalité. Il préfère se réfugier dans son monde avec ses amis imaginaires plutôt que de s\'en faire de vrais dans la réalité.', '2003-12-08', 'drama', 3),
(11, 'akb0048.jpg', 'akb0048', 'Au XXI e siècle une guerre interplanétaire a endommagé l\'écosystème de la Terre, et l\'humanité se retrouve forcée de coloniser les différentes planètes existantes. Dans cette nouvelle société les divertissements sont interdits car ils « perturbent le cœur ».\n', '2003-12-08', 'films', 3),
(12, 'jewelpet.jpg', 'jewelpet', 'Il existe dans l\'univers un autre monde que le nôtre qui s\'appelle le Royaume des Bijoux. Dans ce monde-là, les mages vivent avec de drôles d\'animaux nommés les JewelPets qui suivent des cours de magie.', '2003-12-08', 'anime', 2),
(13, 'tokyo-ghoul.jpg', 'tokyo ghoul', 'Dans la ville de Tokyo, des créatures nommées goules sont apparues et se nourrissent de chair humaine pour survivre. Un jour, Ken Kaneki, jeune étudiant, se fait attaquer par l\'une d\'entre elles et subit une grave blessure.\n', '2003-12-08', 'films', 3),
(14, 'shugo-chara.jpg', 'shugo chara', 'Amu est une fille dont la réputation de rebelle cool ne correspond pas à celle qu\'elle aimerait vraiment être. Un jour, alors qu\'elle fait le souhait de pouvoir changer, elle découvre trois oeufs mystérieux desquels naissent des Shugo Chara, des anges gardiens qui aident les enfants à atteindre leurs rêves.\n', '2003-12-08', 'anime', 3),
(15, 'one-punch-man.jpg', 'one punche man', 'Saitama est un jeune homme sans emploi et sans réelle perspective d\'avenir, jusqu\'au jour où il décide de prendre sa vie en main. Son nouvel objectif : devenir un super-héros. Il s\'entraîne alors sans relâche pendant trois ans et devient si puissant qu\'il est capable d\'éliminer ses adversaires d\'un seul coup de poing.', '2003-12-08', 'films', 3),
(16, 'evangelion.jpg', 'evengelion', 'evengelion', '2003-12-08', 'films', 2),
(17, 'nanbaka.jpg', 'nanbaka', 'L\'histoire tourne autour de Jyugo, Uno, Nico et Rock qui sont quatre prisonniers. Cette prison divise ses résidents par groupe et leur attribut un numéro unique. Nos quatre prisonniers appartiennent au treizième groupe et malgré leurs situations, ils passent leur temps à s\'amuser, au grand dépit de la garde.', '2003-12-08', 'anime', 3),
(18, 'bleach.jpg', 'bleach', 'Adolescent de quinze ans, Ichigo Kurosaki possède un don particulier : celui de voir les esprits. Un jour, il croise la route d\'une belle Shinigami (un être spirituel) en train de pourchasser une \"âme perdue\", un esprit maléfique qui hante notre monde et n\'arrive pas à trouver le repos.', '2003-12-08', 'films', 4),
(19, 'leadale-no-daichi-nite.jpg', 'leadale no daichi nite', 'leadale no daichi nite', '2003-12-08', 'films', 1),
(20, 'attack-on-titan.jpg', 'attack on titan', 'Dans un monde ravagé par des titans mangeurs d\'homme depuis plus d\'un siècle, les rares survivants de l\'Humanité n\'ont d\'autre choix pour survivre que de se barricader dans une cité-forteresse.', '2003-12-08', 'anime', 1),
(21, 'saos2.jpg', 'sword art online saison 2', 'Synopsis. Kirito est retourné à sa paisible vie de lycéen. Il n\'aspire désormais qu\'à une seule chose : profiter pleinement de sa vie. Mais une nouvelle fois, le devoir le rappelle à l\'ordre…', '2003-12-08', 'anime', 1),
(22, 'your-name.jpg', '1234567891234567891234', 'your name', '2003-12-08', 'anime', 1);

-- --------------------------------------------------------

--
-- Structure de la table `collections`
--

CREATE TABLE `collections` (
  `id_collections` int(11) NOT NULL,
  `collections_name` varchar(150) NOT NULL,
  `catalog_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id_likes`, `user_id`, `catalog_id`, `created_at`, `last_edited`, `active`) VALUES
(1, 6, 20, '2023-10-05 11:51:43', '2023-10-10 10:13:40', 0),
(2, 6, 14, '2023-10-05 12:30:24', '2023-10-09 08:17:40', 1),
(3, 6, 10, '2023-10-05 12:33:07', '2023-10-10 08:32:51', 0),
(4, 6, 18, '2023-10-05 12:36:44', '2023-10-09 08:24:48', 1),
(5, 6, 3, '2023-10-05 13:25:13', '2023-10-10 08:50:55', 1),
(6, 6, 4, '2023-10-05 13:54:36', '2023-10-10 18:26:57', 1),
(7, 6, 5, '2023-10-05 14:00:07', '2023-10-10 11:02:48', 1),
(8, 6, 12, '2023-10-05 14:08:35', '2023-10-09 08:03:16', 0),
(9, 6, 13, '2023-10-05 14:12:04', '2023-10-10 20:41:44', 1),
(10, 6, 7, '2023-10-05 14:40:17', '2023-10-10 20:41:00', 1),
(11, 6, 2, '2023-10-05 14:41:06', '2023-10-10 07:56:26', 1),
(12, 6, 1, '2023-10-05 14:44:27', '2023-10-10 20:40:52', 1),
(13, 6, 19, '2023-10-05 14:44:48', '2023-10-10 07:45:19', 0),
(14, 6, 17, '2023-10-05 14:45:52', '2023-10-09 08:01:43', 1),
(15, 6, 9, '2023-10-05 14:46:20', '2023-10-09 08:01:42', 1),
(16, 6, 21, '2023-10-06 08:36:40', '2023-10-10 10:13:42', 1),
(17, 6, 6, '2023-10-06 08:44:10', '2023-10-10 07:55:02', 1),
(18, 6, 8, '2023-10-06 09:30:51', '2023-10-09 08:03:12', 0),
(19, 6, 15, '2023-10-06 11:02:20', '2023-10-10 08:15:59', 1),
(20, 6, 11, '2023-10-06 11:48:13', '2023-10-09 08:03:19', 0),
(21, 6, 16, '2023-10-09 08:01:37', '2023-10-09 08:03:13', 0),
(22, 6, 22, '2023-10-10 18:15:18', '2023-10-10 18:15:18', 1);

-- --------------------------------------------------------

--
-- Structure de la table `saison`
--

CREATE TABLE `saison` (
  `id_saison` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` varchar(300) NOT NULL,
  `saison_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id_alias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id_catalogue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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
  MODIFY `id_likes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

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

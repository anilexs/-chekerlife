<?php 
require_once "../model/catalogModel.php";
$lastCatalog = Catalog::catalogLastAdd();
$lastTcg = Catalog::tcgLastAdd();

require_once "inc/header.php"; ?>
<link rel="stylesheet" href="asset/css/index.css">
<script src="asset/js/index.js" defer></script>
<title>Accueil</title>
<?php require_once "inc/nav.php"; ?>
    <div class="hdrContenair">
        <div>
            <img src="<?= $host ?>asset/img/mikuHomeRever.png" alt="" class="hdrimg">
        </div>
        <div class="hdrtxt">
            <h1>Bienvenue sur ChekerLife</h1>
            <span class="spanHdr" id="animated-text">Bienvenue sur ChekerLife, l'endroit idéal pour les passionnés d'anime, de films et de séries. Explorez un monde où chaque épisode, chaque film et chaque moment d'animation prend vie. Découvrez et partagez vos pépites animées ChekerLife vous offre une plateforme pour marquer et partager vos épisodes d'anime préférés, créer des quiz captivants et échanger avec d'autres fans. Plongez dans un univers où votre passion anime devient une expérience collective. Collectionnez les trésors du monde animé Votre collection de cartes Pokémon, Yu-Gi-Oh! et d'autres trésors de l'animation a enfin trouvé sa place. Documentez chaque carte, chaque édition spéciale et chaque rareté que vous possédez. Connectez-vous avec des fans du monde entier et échangez vos trésors animés. Vivez votre passion, créez votre histoire animée ChekerLife n'est pas seulement un site, c'est une aventure anime. Explorez, partagez, collectionnez et créez des liens avec d'autres passionnés. Rejoignez notre communauté où chaque histoire anime compte. Plongez dans l'univers ChekerLife dès aujourd'hui et donnez vie à votre passion pour l'anime, les films et les séries !</span>
        </div>
    </div>

    <div class="catalogContenair">
        <div class="hdrlastCatalog">
            
        </div>
        <div class="lastCatalog">
            <div class="catalogDiv">
                <?php foreach ($lastCatalog as $lastCatalog) { ?>
                    <div class="catalogCard">
                        <?= $lastCatalog['nom'] ?>
                    </div>
                <?php } ?>
            </div>
            <div class="lastController">
                <div class="custom-scrollbar"></div>
            </div>
        </div>
    </div>

    <div class="tcg"></div>
    <div class="quiz"></div>
<?php require_once "inc/footer.php"; ?>
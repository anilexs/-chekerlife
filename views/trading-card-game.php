<!-- pour pokemon https://dev.pokemontcg.io/dashboard -->
<?php 
require_once "../model/tcgModel.php"; 
$tcg = Tcg::tcg();

require_once "inc/header.php"; 
?>
<link rel="stylesheet" href="asset/css/tcg.css">
<title>Jeu de cartes à collectionner</title>
<?php require_once "inc/nav.php"; ?>

<div class="contenaire">
    <?php foreach ($tcg as $collection) { ?>
        <a href="tcg/<?=$collection['nom']?>">
            <div class="card" style="background-image: url(asset/img/tcg/<?=$collection['image']?>)">
                
            </div>
        </a>
    <?php } ?>
</div>

<?php require_once "inc/footer.php"; ?>
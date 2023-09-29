<?php 
require_once "../model/catalogModel.php";
$catalog = Catalog::allCatalog();
var_dump($catalog); 

require_once "inc/header.php"; 
?>
<script src="asset/js/catalog.js" defer ></script>
<link rel="stylesheet" href="asset/css/categorie.css">
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<div class="contenaire">
    <form action="" method="get">
        <input type="text" placeholder="Rechercher..." id="rechercherCategorie">
    </form>
</div>
<div class="catalog">
    <?php foreach($catalog as $catalog){ ?>
        <div class="card">
            <button class="like">
                <i class="fa-solid fa-heart" <?php if(1 != 1){?>
                    style="color: #ff0000;"
                    <?php }else{ ?>
                        style="color: #fff;"
                        <?php } ?>></i>
                    </button>
                    <a href="./list?name=<?= $catalog["nom"] ?>">
                        <img src="asset/img/<?= $catalog["image_catalogue"] ?>" alt="">
                    </a>
            </div>
    <?php } ?>
</div>
<?php require_once "inc/footer.php"; ?>
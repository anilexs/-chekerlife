<?php 
require_once "../model/catalogModel.php";
require_once "../model/userModel.php";
$catalog = Catalog::allCatalog();
if(isset($_COOKIE['user_id'])){
    $userLike = User::userLike($_COOKIE['user_id']);
}

require_once "inc/header.php"; 
?>
<script src="asset/js/catalog.js" defer></script>
<link rel="stylesheet" href="asset/css/categorie.css">
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<div class="contenaire">
    <form action="" method="get">
        <input type="text" placeholder="Rechercher..." id="rechercherCategorie">
    </form>
</div>
<div class="catalog">
    <?php foreach($catalog as $catalogItem){ ?>
        <div class="card">
            <?php
            $isActive = false;
            if(isset($_COOKIE['user_id'])){
                foreach($userLike as $like){
                    if($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['active'] == 1){
                        $isActive = true;
                        break;
                    }
                }
            }
            ?>
            <button class="like <?php echo $isActive ? 'activeTrue' : 'activeFalse'; ?>" id="<?= $catalogItem["id_catalogue"] ?>" onclick="like(<?= $catalogItem["id_catalogue"] ?>)">
                <i class="fa-solid fa-heart"></i>
            </button>
            <a href="./list?name=<?= $catalogItem["nom"] ?>">
                <img src="asset/img/<?= $catalogItem["image_catalogue"] ?>" alt="">
            </a>
        </div>
    <?php } ?>
</div>
<?php require_once "inc/footer.php"; ?>
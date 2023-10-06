<?php 
require_once "../model/catalogModel.php";
require_once "../model/userModel.php";
$catalog = Catalog::allCatalog();
if(isset($_COOKIE['user_id'])){
    $userLike = User::userLike($_COOKIE['user_id']);
}

require_once "inc/header.php"; 
?>
<script src="asset/js/catalog.js"></script>
<link rel="stylesheet" href="asset/css/categorie.css">
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<div class="contenaire">
    <input type="text" placeholder="Rechercher..." id="rechercherCategorie">
</div>
<div class="catalog" id="catalog">
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

            $urlName = str_replace(' ', '-', $catalogItem["nom"]);
            ?>
            <button class="like <?php echo $isActive ? 'activeTrue' : 'activeFalse'; ?>" id="<?= $catalogItem["id_catalogue"] ?>" onclick="like(<?= $catalogItem["id_catalogue"] ?>)">
                <span class="cataLike <?= $catalogItem["id_catalogue"] ?>" id="likeId<?= $catalogItem["id_catalogue"] ?>"><?= $catalogItem['likes'] ?></span>
                <i class="fa-solid fa-heart"></i>
            </button>
            <a href="list/<?= $urlName ?>">
                <img src="asset/img/<?= $catalogItem["image_catalogue"] ?>" alt="">
            </a>
            <?php
            echo '<script type="text/javascript">
                likePosition(' . $catalogItem['id_catalogue'] .');
            </script>'; ?>
        </div>
    <?php } ?>
</div>
<?php require_once "inc/footer.php"; ?>
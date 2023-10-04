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
    <input type="text" placeholder="Rechercher..." id="rechercherCategorie">
</div>
<div class="catalog" id="catalog">
    
</div>
<?php require_once "inc/footer.php"; ?>
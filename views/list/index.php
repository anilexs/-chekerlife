<?php
    require_once "../../model/userModel.php";
    require_once "../../model/catalogModel.php";
    require_once "../../model/collectionModel.php";
    if(isset($_COOKIE['user_id'])){
        $likeConte = User::likeCount($_COOKIE['user_id']);
        $userLike = User::userLike($_COOKIE['user_id']);
        $userInfo = User::userInfo($_COOKIE['user_id']);
    }
    $get = isset($_GET['q']) ? $_GET['q'] : null;
    if($get == null){
        header("Location: http://localhost/!chekerlife/");
    }
    $host = "http://localhost/!chekerlife/";
    $name = str_replace('-', ' ', $get);
    $catalogInfo = Catalog::catalogInfoName($name);
    if(empty($catalogInfo)){
        $catalogInfo = null;
    }else{
        $info = Catalog::listViews($name);
        $collection = Collection::collection($catalogInfo['id_catalogue']);
    }
    if (empty($collection)) {
        $collection = null;
    }
    if(isset($_COOKIE['user_id'])){
        foreach($userLike as $like){
            if($like['catalog_id'] == $catalogInfo["id_catalogue"] && $like['active'] == 1){
                $isActive = true;
                break;
            }
        }
    }
    // var_dump($catalogInfo);
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="<?= $host ?>asset/css/style.css">
    <link rel="stylesheet" href="<?= $host ?>asset/css/nav.css">
    <link rel="stylesheet" href="<?= $host ?>asset/css/list.css">
    <script src="<?= $host ?>asset/js/list.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
    <script src="<?= $host ?>views/asset/js/nav.js"></script>
    <title>Document</title>
<?php require_once "../inc/nav.php"; ?>
    <div class="contenaire">
        <div class="contenaireheader">
            <img src="<?= $host ?>views/asset/img/<?= $catalogInfo['image_catalogue'] ?>" alt="" class="catalogImg">
            <div class="droite">
                <div class="info">
                    <ul class="ul">
                        <li><?= $catalogInfo['nom'] ?></li>
                        <li><?= $catalogInfo['publish_date'] ?></li>
                        <li><?= $catalogInfo['type'] ?></li>
                        <li>
                            <button class="likeList <?php echo $isActive ? 'activeTrue' : 'activeFalse'; ?> likeCollor<?= $catalogInfo["id_catalogue"] ?>" id="<?= $catalogInfo["id_catalogue"] ?>" onclick="likeList(<?= $catalogInfo["id_catalogue"] ?>)">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                            <span class="cataLikeList <?= $catalogInfo["id_catalogue"] ?>" id="likeId<?= $catalogInfo["id_catalogue"] ?>"><?= $catalogInfo['likes'] ?></span>
                        </li>
                    </ul>
                </div>
                <span class="description"><?= $catalogInfo['description'] ?></span>
            </div>
        </div>
    </div>
<?php require_once "../inc/footer.php"; ?>
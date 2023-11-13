<?php
    require_once "../../model/userModel.php";
    require_once "../../model/catalogModel.php";
    require_once "../../model/collectionModel.php";
    
    $profilInfo = User::profilInfo($_GET['q']);
    
    require_once "../inc/header.php";
    $userid = !empty($userInfo["id_user"]) ? $userInfo["id_user"] : null;
?>  
    <link rel="stylesheet" href="<?= $host ?>asset/css/profil.css">
    <script src="<?= $host ?>asset/js/profil.js"></script>
<?php require_once "../inc/nav.php"; ?>
<?php if($profilInfo['user_statut'] == 0 && $userid != $profilInfo["id_user"]){ ?>
    <h1>comte priver</h1>
    <?php }else if($userid == $profilInfo["id_user"]){ ?>
        <!-- <img src="https://wallpapercave.com/wp/wp5567636.jpg" alt=""> -->
        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/c4bd49ab-edde-42f9-b0c7-cce0b3536d2c-profile_banner-480.png" alt="">
        <!-- <img src="https://wallpapercave.com/wp/wp10897345.jpg" alt=""> -->
        <!-- <img src="https://abrakadabra.fun/uploads/posts/2022-03/1648222991_1-abrakadabra-fun-p-banneri-anime-2.jpg" alt=""> -->
    <?php }else{ ?>
        <h1>non hauter</h1>
    <?php } ?>
<?php require_once "../inc/footer.php"; ?>

<?php
    require_once "../../model/userModel.php";
    if(isset($_COOKIE['user_id'])){
        $likeConte = User::likeCount($_COOKIE['user_id']);
    }
    $get = $_GET['q'];
    // else{
    //     header("Location: http://localhost/!chekerlife/");
    // }
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="http://localhost/!chekerlife/asset/css/style.css">
    <link rel="stylesheet" href="http://localhost/!chekerlife/asset/css/nav.css">
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js"></script>
    <script src="http://localhost/!chekerlife/asset/js/nav.js" defer></script>
    <title>Document</title>
<?php require_once "../inc/nav.php"; ?>

<?php require_once "../inc/footer.php"; ?>
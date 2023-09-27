<?php 
if(isset($_COOKIE['user_id'])) {
    header("Location: index");
}
require_once "inc/header.php"; 
?>
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<?php require_once "inc/footer.php"; ?>
<?php 
    setcookie("user_id", "", time() - 3600, "/");
if(isset($_COOKIE['user_id'])) {
    header("Location: index");
}
require_once "inc/header.php"; 
?>
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<form action="traitement/action.php" method="POST">
    <input type="text">
    <button name="test">test</button>
</form>
<?php require_once "inc/footer.php"; ?>
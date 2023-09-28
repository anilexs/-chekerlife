<?php
if(isset($_COOKIE['user_id'])) {
    header("Location: index");
}
require_once "inc/header.php"; 
?>
<title>Document</title>
<link rel="stylesheet" href="asset/css/inscription.css">
<?php require_once "inc/nav.php"; ?>
    <div class="contenaire">
        <div class="left">
            <form action="traitement/action.php" method="post" class="formInscription">
                <div>
                    <label for="">pseudo :</label>
                    <input type="text" name="pseudo">
                </div>
                <div>
                    <label for="">email :</label>
                    <input type="text" name="email">
                </div>
                <div>
                    <label for="">password :</label>
                    <input type="text" name="password">
                </div>
                <button name="inscription">s'inscrire</button>
            </form>
        </div>
        <div class="right"></div>
    </div>
<?php require_once "inc/footer.php"; ?>
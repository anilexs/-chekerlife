<?php 
    session_start();
if(isset($_COOKIE['user_id'])) {
    header("Location: index");
}
require_once "inc/header.php"; 
?>
<!-- <script src="https://accounts.google.com/gsi/client" async defer></script> -->
<title>Document</title>
<?php require_once "inc/nav.php"; ?>
<form action="traitement/action.php" method="POST">
    <input type="text">
    <button name="connexion">connexion</button>
</form>

<!-- co par google a continuet plus tare
https://www.youtube.com/watch?v=oiCH0HAS_u0&t=1248s&ab_channel=Boris%28%27PrimFX%27%29 -->
    <!-- <div id="g_id_onload"
    data-client_id="224348978546-jki2a29kf80k1q441lp7khc05k67j8kt.apps.googleusercontent.com"
     data-context="signup"
     data-ux_mode="popup"
     data-login_uri="http://localhost/!chekerlife/connexion.php"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
data-type="standard"
data-shape="pill"
data-theme="filled_blue"
data-text="signin_with"
data-size="large"
data-logo_alignment="left">
</div> -->
<?php require_once "inc/footer.php"; ?>
<?php
session_start();
if(isset($_COOKIE['user_id'])) {
    header("Location: index");
}
require_once "inc/header.php"; 
?>
<title>Document</title>
<!-- <script src="https://accounts.google.com/gsi/client" async defer></script> -->
<link rel="stylesheet" href="asset/css/inscription.css">
<script src="asset/js/inscription.js" defer></script>
<?php require_once "inc/nav.php"; ?>
<div class="alignement">
    <div class="contenaire">
        <div class="left">
            <div class="form">
                <form method="POST" class="formInscription" id="formInscription">
                    <div>
                        <label for="">pseudo :</label>
                        <input type="text" id="pseudo" class="leftInute" placeholder="pseudo" <?php if(isset($_SESSION["pseudo"])){ ?> 
                            value="<?= $_SESSION["pseudo"]; ?>"
                        <?php } ?>>
                    </div>
    
                    <div>
                        <label for="">email :</label>
                        <input type="email" id="email" class="leftInute" placeholder="email" <?php if(isset($_SESSION["email"])){ ?> 
                            value="<?= $_SESSION["email"]; ?>"
                        <?php } ?>>
                    </div>
    
                    <div>
                        <label for="">password :</label>
                        <input type="password" class="leftInute" placeholder="password" id="password">
                    </div>
                    <div class="divNewSlater">
                        <input type="checkbox" class="Newslatter" id="Newslatter">
                        <label for="">Inscrivez-vous à notre newsletter !</label>
                    </div>
                    <button name="inscription">s'inscrire</button>
                </form>
            </div>
        </div>
        <div class="right">
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
        </div>
    </div>
</div>
<?php require_once "inc/footer.php"; ?>
<?php
    require_once "../../model/userModel.php";
    require_once "../../model/catalogModel.php";
    require_once "../../model/collectionModel.php";
    require_once "../../model/userModel.php";
    require_once "../../model/adminModel.php";

    require_once "../inc/header.php";
    
    if ($userInfo['role'] != "admin" && $userInfo['role'] != "owner") {
        header("Location:" . $host);
        die;
    }

    $user = Admin::allUser($_COOKIE['token']);
    $roleTab = Admin::allRole();
    
?>  
<link rel="stylesheet" href="<?= $host ?>asset/css/dashboard.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>
<script src="<?= $host ?>asset/js/dashboard.js"></script>

<title>dashboard</title>
<?php require_once "../inc/nav.php"; ?>
<div class="hdrcontenaire">
    <div class="userContenaire">
        <div class="left">
            <?php foreach ($roleTab as $role) { ?>
                <div class="roleBtn">
                    <button id="<?= $role['role'] ?>"><?= $role['role'] ?></button>
                </div>
            <?php } ?>
        </div>
        <div class="right">
            <div class="user">
                <div class="userHdr">profile</div>
                <div class="emailHdr">email</div>
                <div class="nomHdr">nom & prenom</div>
                <div class="actifHdr">actif</div>
                <div class="roleHdr">role</div>
                <div class="disabledHdr">desactiver</div>
            </div>
            <hr>
            <?php foreach ($user as $user) { ?>
                <div class="<?= $user['role'] ?>">
                    <div class="user">
                        <div class="userImg"><img src="../asset/img/user/profile/<?=(isset($user['user_image']) ? $user['user_image'] : "profile-defaux.png") ?>" alt=""></div>
                        <div class="userEmail" contenteditable><?= (isset($user['email']) ? $user['email'] : $user['google_email']) ?> </div>
                        <div class="userName" contenteditable>
                            <?= (isset($user['nom']) ? $user['nom'] : "") ?> <br>
                            <?= (isset($user['prenom']) ? $user['prenom'] : "") ?> 
                        </div>
                        <div class="userActif"><div class="actifSelect <?= ($user['user_actif'] == 1 ? "actif" : "inactif") ?>"></div></div>
                        <div class="userRole"><?= $user['role'] ?></div>
                        <div class="userDisabled">

                            <button class="desactiver" id="<?= $user['id_user'] ?>" <?= ($user['user_actif'] == 1 ? "" : "style='display: none'") ?>>desactiver</button>

                            <button class="reactiver" id="<?= $user['id_user'] ?>" <?= ($user['user_actif'] == 1 ? "style='display: none'" : "") ?>>reactiver</button>
                        </div>
                    </div>
                    <hr>
                </div>
            <?php } ?>
        </div>
    </div>
    <div class="graphique">
        <div class="hdrGraf">
            <h1 id="grafTXT"></h1>
            <div class="grafController">
                <button id="nbDaymoins24h">-1 jour</button>
                <button id="nbDayplus24h">+1 jour</button>
            </div>
        </div>
        <canvas id="myGraf"></canvas>
        <div class="controllerCanvar">
            <button id="nombre_conte_total">Nombre d'utilisateurs créés au total</button>
            <button id="inscriptions_journalières">Nombre de comptes créés les 24 dernier heur</button>
        </div>
    </div>
</div>
<?php require_once "../inc/footer.php"; ?>

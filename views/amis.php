<?php require_once "inc/header.php"; ?>
<link rel="stylesheet" href="asset/css/amis.css">
<script src="asset/js/amis.js" defer></script>
<title>friend</title>
<?php require_once "inc/nav.php";?>
<div class="contenaire">
    <div class="leftContenair">
        <div class="leftoption">
            <ul>
                <li><h4><button id="addFriend">ajoute un amis</button></h4></li>
                <li><h4><button id="online">En ligne</button></h4></li>
                <li><h4><button id="all">Tous</button></h4></li>
                <li><h4><button id="requette">En attente</button></h4></li>
                <li><h4><button id="blocket">Blocket</button></h4></li>
            </ul>
        </div>
    </div>
    <div class="rightContenair">
        <div class="friend">
            online
        </div>
    </div>
</div>
<?php require_once "inc/footer.php"; ?>
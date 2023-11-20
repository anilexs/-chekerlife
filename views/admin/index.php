<?php
    require_once "../../model/userModel.php";
    require_once "../../model/catalogModel.php";
    require_once "../../model/collectionModel.php";

    require_once "../inc/header.php";
?>  
<link rel="stylesheet" href="<?= $host ?>asset/css/dashboard.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script>
<script src="<?= $host ?>asset/js/dashboard.js"></script>

<title>dashboard</title>
<?php require_once "../inc/nav.php"; ?>
<div class="graphique">
    <h1>controller</h1>
    <canvas id="myGraf"></canvas>
    <div class="controllerCanvar">
        <button id="nombre_dutilisateurs">Nombre d'utilisateurs</button>
        <button id="nombre_dutilisateurs_day">Nombre d'utilisateurs jour</button>
    </div>
</div>
<?php require_once "../inc/footer.php"; ?>

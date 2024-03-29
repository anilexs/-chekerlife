<?php 
require_once "../../../model/pokemonModel.php";
$blockSet = Pokemon::blockSet();

$organizedBlocks = [];

foreach ($blockSet as $row) {
    // Vérifie si le block actuel a déjà été ajouté à notre tableau organisé
    if (!array_key_exists($row['id_block'], $organizedBlocks)) {
        $organizedBlocks[$row['id_block']] = [
            'id_block' => $row['id_block'],
            'block_name' => $row['block_name'],
            'block_order' => $row['block_order'],
            'block_updatedAt' => $row['block_updatedAt'],
            'sets' => [] // Initialisation d'un tableau pour les sets de ce block
        ];
    }

    // Ajout du set au block correspondant, s'il y a des informations de set
    if ($row['id_set'] !== null) {
        $organizedBlocks[$row['id_block']]['sets'][] = [
            'id_set' => $row['id_set'],
            'set_name' => $row['set_name'],
            'nb_card' => $row['nb_card'],
            'releaseDate' => $row['releaseDate'],
            'set_updatedAt' => $row['set_updatedAt'],
            'logo' => $row['logo'],
            'set_order' => $row['set_order']
        ];
    }
}

require_once "../../inc/header.php"; ?>
<link rel="stylesheet" href="../../asset/css/pokemon.css">
<script src="../../asset/js/pokemon.js" defer></script>
<title>pokemon</title>
<?php require_once "../../inc/nav.php"; ?>
<div class="contenaire">
    <div class="menuBlock">
        <div class="blockContainer">
    
        </div>
        <div class="blockSelect">
                <?php // foreach ($organizedBlocks as $block) {
                //     echo "Block: " . $block['block_name'] . "<br>";
                //     foreach ($block['sets'] as $set) {
                //         echo "\tSet: " . $set['set_name'] . " - Cards: " . $set['nb_card'] . "<br>";
                //     }
                // } ?>
            <?php foreach ($organizedBlocks as $block) { ?>
                <div class="block">
                    <div class="blockName">
                        <?= $block['block_name'] ?>
                    </div>
                    <div class="setContenaire">
                    <?php foreach ($block['sets'] as $set) { ?>
                        <button class="set">
                            <img src="../../asset/img/tcg/pokemon/block/logo/<?= $set['logo'] ?>" class="setLogo" alt="">
                            <?= $set['set_name'] ?>
                        </button>
                    <?php } ?>
                    </div>
                </div>
                
            <?php } ?>
        </div>
    </div>
</div>
<?php require_once "../../inc/footer.php"; ?>
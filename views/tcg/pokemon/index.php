<?php 
require_once "../../../model/pokemonModel.php";
$token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;

$blockSet = Pokemon::blockSet($token);

// echo "<pre>";
// var_dump($allEtat);
// echo "</pre>";

$get = null;
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
    if(isset($_GET['q'])){
        $name = str_replace('+', ' ', trim($_GET['q']));
        if($row['set_name'] == $name){
           $get = $row; 
        }
    }
}


if(isset($_GET['q'])){
    $card = Pokemon::setCard($_GET['q'], $token);
}else{
    $card = Pokemon::setCard($blockSet[0]['set_name'], $token);
}

$logo = isset($get) ? $get['logo'] : $blockSet[0]['logo']; 
$getName = isset($get) ? $get['set_name'] : $blockSet[0]['set_name']; 
$getUser_card = isset($get) ? $get['user_card'] : $blockSet[0]['user_card']; 
$setCard = isset($get) ? $get['nb_card'] : $blockSet[0]['nb_card']; 

// echo '<pre style="color: red">';
// var_dump($get);
// echo "</pre>";

require_once "../../inc/header.php"; ?>
<link rel="stylesheet" href="../../asset/css/pokemon.css">
<script src="../../asset/js/pokemon.js" defer></script>
<title>pokemon</title>
<?php require_once "../../inc/nav.php"; ?>
<div class="contenaire">
    <div class="menuBlock">
        <div class="blockContainer">
            <div class="logo"><img src="../../asset/img/tcg/pokemon/logo/<?= $logo ?>" alt=""></div>
            <div class="name"><?= $getName ?></div>
            <div class="nbCard"><span class="userCard"><?= $getUser_card ?></span>/<span class="setCard"><?= $setCard ?></span></div>
        </div>
        <div class="blockSelect">
            <?php foreach ($organizedBlocks as $block) { ?>
                <div class="block">
                    <div class="blockName">
                        <?= $block['block_name'] ?>
                    </div>
                    <div class="setContenaire">
                    <?php foreach ($block['sets'] as $set) {
                        $name = str_replace(' ', '+', trim($set["set_name"])); ?>
                        
                        <button class="set" id="<?= $name ?>">
                            <img src="../../asset/img/tcg/pokemon/logo/<?= $set['logo'] ?>" class="setLogo" alt="">
                            <?= $set['set_name'] ?>
                        </button>
                    <?php } ?>
                    </div>
                </div>
                
            <?php } ?>
        </div>
    </div>
</div>
<div class="cardContenaire">
    <?php foreach ($card as $card) { 
        // echo "<pre>";
        // var_dump($card);
        // echo "</pre>";
        $name = str_replace(' ', '+', trim($card['set_name'])); 
        $cardSecondary = explode(', ', $card['card_secondary']); 
        
        $card_user = 0;
        
        foreach ($cardSecondary as $cardSecondaire) {
            $secondaireCarte = explode('=', $cardSecondaire); 

            if(isset($secondaireCarte[1]) && $secondaireCarte[1] == 1){
                $card_user = 1;
                break; 
            }
        } ?>
        
        <div class="contenaireCard">
            <div class="card">
                <div class="idCard">
                    <?= $card['cardId']; ?> / <?= $card['nb_card'] ?> 
                    <div class="idImg">
                        <img src="../../asset/img/tcg/pokemon/rarete/<?= $card['rarete_img'] ?>" alt="">
                    </div>
                </div>
                <img src="../../asset/img/tcg/pokemon/card/<?= $card['block'] . "/" . $name . "/" . $card['image'] ?>" alt="" <?= ($card['user_card'] >= 1 || $card_user >= 1) ? "" : 'style="opacity: 0.5"' ?>>    
            </div>

            <div class="cardLegend">
                <div class="normal <?= (isset($_COOKIE['token'])) ? 'pokeball' : ''  ?>">
                    <?php if(isset($_COOKIE['token'])){ ?>
                        <input type="text" class="ballSetId" value="set : [<?= $getName ?>] idCard : [<?= $card['cardId'] ?>] user_card : [<?=$card['user_card']?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                        <div class="hover">standard</div>
                        <img src="../../asset/img/tcg/pokemon/pokeball/normale.png" alt="" <?= ($card['user_card'] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                        <?php }else{ ?>
                            <a href="<?= $host ?>connexion">
                                <div class="hover">standard</div>
                                <img src="../../asset/img/tcg/pokemon/pokeball/normale.png" alt="" style="opacity: 0.5">
                            </a>
                    <?php } ?>
                </div>
                
                <?php foreach ($cardSecondary as $key) {
                    $cardSecondaryKey = explode('=', $key);
                    if(isset($cardSecondaryKey[1])){
                        if($cardSecondaryKey[0] == "Reverse"){ ?>
                            <div class="reverse <?= (isset($_COOKIE['token'])) ? 'pokeball' : ''  ?>">
                                <?php if(isset($_COOKIE['token'])){ ?>
                                    <input type="text" class="ballSetId" value="set : [<?= $getName ?>] idCard : [<?= $card['cardId'] ?>] secondaireName : [<?= $cardSecondaryKey[0] ?>] user_card : [<?=$cardSecondaryKey[1]?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                                    <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                   <img src="../../asset/img/tcg/pokemon/pokeball/reverse.png" alt="" <?= ($cardSecondaryKey[1] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                                <?php }else{ ?>
                                    <a href="<?= $host ?>connexion">
                                        <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                        <img src="../../asset/img/tcg/pokemon/pokeball/reverse.png" alt="" style="opacity: 0.5">
                                    </a>
                                <?php } ?>
                            </div>
                        <?php }else{ ?>
                            <div class="special <?= (isset($_COOKIE['token'])) ? 'pokeball' : '' ?>">
                                <?php if(isset($_COOKIE['token'])){ ?>
                                    <input type="text" class="ballSetId" value="set : [<?= $getName ?>] idCard : [<?= $card['cardId'] ?>] secondaireName : [<?= $cardSecondaryKey[0] ?>] user_card : [<?=$cardSecondaryKey[1]?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                                    <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                    <img src="../../asset/img/tcg/pokemon/pokeball/special.png" alt="" <?= ($cardSecondaryKey[1] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                                <?php }else{ ?>
                                    <a href="<?= $host ?>connexion">
                                        <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                        <img src="../../asset/img/tcg/pokemon/pokeball/special.png" alt="" style="opacity: 0.5">
                                    </a>
                                <?php } ?>
                            </div>
                        <?php }
                    }
                } ?>
            </div>
        </div>

    <?php } ?>
</div>
<?php require_once "../../inc/footer.php"; ?>
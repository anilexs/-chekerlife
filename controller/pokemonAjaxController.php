<?php
session_start();
require_once "../model/database.php";
require_once "../model/pokemonModel.php";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400; 
const HTTP_METHOD_NOT_ALLOWED = 405; 

const host = "http://localhost/!chekerlife/";

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST'){
    $response_code = HTTP_BAD_REQUEST;
    $message = "il manque le paramétre ACTION";
    if($_POST['action'] == "setcard" && isset($_POST['set_name'])){
        $response_code = HTTP_OK;
        $token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;
        
        $setInfo = Pokemon::setInfo($_POST['set_name'], $token);
        $cards = Pokemon::setCard($_POST['set_name'], $token);

        $html = ''; // Initialisez une variable pour contenir le HTML

        foreach ($cards as $card) {
            $name = str_replace(' ', '+', trim($card['set_name'])); 
            $cardSecondary = explode(', ', $card['card_secondary']); 

            $card_user = 0;
            foreach ($cardSecondary as $cardSecondaire) {
                $secondaireCarte = explode('=', $cardSecondaire); 
            
                if(isset($secondaireCarte[1]) && $secondaireCarte[1] == 1){
                    $card_user = 1;
                    break; 
                }
            }
        
            // Ajoutez le HTML généré à la chaîne
            ob_start(); // Démarrer la temporisation de sortie
            ?>
            <div class="contenaireCard <?= $card['energie'] ?>">
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
                            <input type="text" class="ballSetId" value="set : [<?= $_POST['set_name'] ?>] idCard : [<?= $card['cardId'] ?>] user_card : [<?=$card['user_card']?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                            <div class="hover">standard</div>
                            <img src="../../asset/img/tcg/pokemon/pokeball/normale.png" alt="" <?= ($card['user_card'] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                            <?php }else{ ?>
                                <a href="<?= host ?>connexion">
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
                                        <input type="text" class="ballSetId" value="set : [<?= $_POST['set_name'] ?>] idCard : [<?= $card['cardId'] ?>] secondaireName : [<?= $cardSecondaryKey[0] ?>] user_card : [<?=$cardSecondaryKey[1]?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                                        <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                        <img src="../../asset/img/tcg/pokemon/pokeball/reverse.png" alt="" <?= ($cardSecondaryKey[1] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                                    <?php }else{ ?>
                                        <a href="<?= host ?>connexion">
                                            <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                            <img src="../../asset/img/tcg/pokemon/pokeball/reverse.png" alt="" style="opacity: 0.5">
                                        </a>
                                    <?php } ?>
                                </div>
                            <?php }else{ ?>
                                <div class="special <?= (isset($_COOKIE['token'])) ? 'pokeball' : '' ?>">
                                    <?php if(isset($_COOKIE['token'])){ ?>
                                        <input type="text" class="ballSetId" value="set : [<?= $_POST['set_name'] ?>] idCard : [<?= $card['cardId'] ?>] secondaireName : [<?= $cardSecondaryKey[0] ?>] user_card : [<?=$cardSecondaryKey[1]?>] card_name : [<?= $card['nomFr'] ?>]" readonly hidden>
                                        <div class="hover"><?= $cardSecondaryKey[0]; ?></div>
                                        <img src="../../asset/img/tcg/pokemon/pokeball/special.png" alt="" <?= ($cardSecondaryKey[1] >= 1) ? "" : 'style="opacity: 0.5"' ?>>
                                    <?php }else{ ?>
                                        <a href="<?= host ?>connexion">
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
            <?php
            $html .= ob_get_clean(); // Récupérer le contenu de la temporisation et l'ajouter à $html
        }

        $responseTab = [
            "response_code" => HTTP_OK,
            "html" => $html,
            "setInfo" => $setInfo
        ];

        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "pokeball"){
        $response_code = HTTP_OK;
        $secondary_name = isset($_POST['secondary_name']) ? $_POST['secondary_name'] : null;
        $pokeball = Pokemon::pokeball($_COOKIE['token'], $_POST['idCard'], $_POST['set_name'], $_POST['etat'], $secondary_name, $_POST['update']);

        $responseTab = [
            "response_code" => HTTP_OK,
            "pokeball" => $pokeball
        ];

        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "userCardEtat"){
        $response_code = HTTP_OK;
        $secondary_name = isset($_POST['secondary_name']) ? $_POST['secondary_name'] : null;
        
        $etat = Pokemon::userEtatCard($_COOKIE['token'], $_POST['set_name'], $_POST['idCard'], $secondary_name);
        $responseTab = [
            "response_code" => HTTP_OK,
            "etat" => $etat
        ];

        reponse($response_code, $responseTab);
    }
}else {
    $response_code = HTTP_METHOD_NOT_ALLOWED;
    $responseTab = [
        "response_code" => HTTP_METHOD_NOT_ALLOWED,
        "message" => "method not allowed"
    ];
    
    reponse($response_code, $responseTab);
}

function reponse($response_code, $response){
    header('Content-Type: application/json');
    http_response_code($response_code);
    
    echo json_encode($response);
}
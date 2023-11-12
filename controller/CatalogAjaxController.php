<?php
session_start();
require_once "../model/database.php";
require_once "../model/userModel.php";
require_once "../model/catalogModel.php";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400; 
const HTTP_METHOD_NOT_ALLOWED = 405; 

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST'){
    $response_code = HTTP_BAD_REQUEST;
    $message = "il manque le paramétre ACTION";

    if($_POST['action'] == "catalog"){
        $catalog = Catalog::Cataloglimit($_POST['limit'], $_POST['offset']);
        $nbCatalog = Catalog::nbCatalog();
        $nbCatalog = $nbCatalog['COUNT(*)'];
        if(isset($_COOKIE['token'])){
            $userLike = User::userLike($_COOKIE['token']);
        }
        foreach ($catalog as $catalogItem) {
        echo '<div class="card">';

        $isActive = false;
        if (isset($_COOKIE['token'])) {
            foreach ($userLike as $like) {
                if ($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['like_active'] == 1) {
                    $isActive = true;
                    break;
                }
            }
        }
        card($catalogItem["id_catalogue"], $isActive, $catalogItem["nom"], $catalogItem['likes'], $catalogItem["image_catalogue"], $catalogItem['saison'], $catalogItem['type']);
    }
    echo '<script type="text/javascript">pagination('. $nbCatalog .');</script>';
    
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

function card($id_catalogue, $isActive, $nom, $like, $image_catalogue, $saison, $type){
    $urlName = str_replace(' ', '+', $nom);
    echo '<button class="like ' . ($isActive ? 'activeTrue' : 'activeFalse') .  ' ' .'likeCollor'. $id_catalogue . '" id="' . $id_catalogue . ' " onclick="like(' . $id_catalogue . ')">';
    echo '<span class="cataLike ' . $id_catalogue . ' likeId' . $id_catalogue .'" id="likeId' . $id_catalogue .'">' . $like . '</span>';
    echo '<i class="fa-solid fa-heart"></i>';
    echo '</button>';
    echo '<div class="type">'. $type .'</div>';
    if (!empty($saison)) {
        echo '<div class="saison">saison ' . $saison . '</div>';
    }



    echo '<a href="catalog/' . $urlName . '">';
    echo '<img src="http://localhost/!chekerlife/views/asset/img/catalog/' . $image_catalogue . '" alt="">';
    echo '</a>';
    echo '<script type="text/javascript"> likePosition('. $id_catalogue. '); ftrSize();</script>';
    echo '</div>';
}
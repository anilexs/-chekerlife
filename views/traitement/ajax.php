<?php
session_start();
require_once "../../model/database.php";
require_once "../../model/userModel.php";
require_once "../../model/catalogModel.php";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400; 
const HTTP_METHOD_NOT_ALLOWED = 405; 


if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST'){
    $response_code = HTTP_BAD_REQUEST;
    $message = "il manque la paramétre ACTION";

    if($_POST['action'] == "like" && isset($_POST['catalog_id'])){
        $response_code = HTTP_OK;
        $catalog_id = $_POST['catalog_id'];
        
        if(empty($_COOKIE['user_id'])){
                $responseTab = [
                    "connect" => false
                ];
        }else{
            $user_id = $_COOKIE['user_id'];
            $bool = User::like($user_id, $catalog_id);
            $nblike = User::likeCount($user_id);
            $CatalogInfo = Catalog::catalogInfo($_POST['catalog_id']);
            $response_code = HTTP_OK;
            $message = $bool;
            $responseTab = [
                "response_code" => HTTP_OK,
                "message" => $message,
                "nbLike" => $nblike['COUNT(*)'],
                "CatalogInfo" => $CatalogInfo
            ];
        }
        reponse($response_code, $responseTab);
        
    }else if($_POST['action'] == "catalog"){
        $catalog = Catalog::allCatalog();
        if(isset($_COOKIE['user_id'])){
            $userLike = User::userLike($_COOKIE['user_id']);
        }
        foreach ($catalog as $catalogItem) {
        echo '<div class="card">';

        $isActive = false;
        if (isset($_COOKIE['user_id'])) {
            foreach ($userLike as $like) {
                if ($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['active'] == 1) {
                    $isActive = true;
                    break;
                }
            }
        }
        card($catalogItem["id_catalogue"], $isActive, $catalogItem["nom"], $catalogItem['likes'], $catalogItem["image_catalogue"]);
    }
    }else if($_POST['action'] == "filtre"){
        $catalog = Catalog::filtreCatalog($_POST['filtre']);
        if(isset($_COOKIE['user_id'])){
            $userLike = User::userLike($_COOKIE['user_id']);
        }
        foreach ($catalog as $catalogItem) {
            echo '<div class="card">';

            $isActive = false;
            if (isset($_COOKIE['user_id'])) {
                foreach ($userLike as $like) {
                    if ($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['active'] == 1) {
                        $isActive = true;
                        break;
                    }
                }
            }
            card($catalogItem["id_catalogue"], $isActive, $catalogItem["nom"], $catalogItem['likes'], $catalogItem["image_catalogue"]);
        }
    }else if($_POST['action'] == "navFiltre"){
    $catalog = Catalog::navRechercher($_POST['filtreNav']);
    if(isset($_COOKIE['user_id'])){
        $userLike = User::userLike($_COOKIE['user_id']);
    }
    if(empty($catalog)){
        echo '<li class="navRechercheCard">';
        echo  '0 résultat n\'a été trouvé';
        echo '</li>';
    }else{
        foreach ($catalog as $catalogItem) {
            echo '<li class="navRechercheCard">';
    
            $isActive = false;
            if (isset($_COOKIE['user_id'])) {
                foreach ($userLike as $like) {
                    if ($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['active'] == 1) {
                        $isActive = true;
                        break;
                    }
                }
            }
            $nbCaracter = strlen($catalogItem["nom"]);
    
            if($nbCaracter >= 22) {
                $catalogNom = substr($catalogItem["nom"], 0, 19)."...";
            }else{
                $catalogNom = $catalogItem["nom"];
            }
    
            $urlName = str_replace(' ', '-', $catalogItem["nom"]);
            echo '<button class="likeNavRecherche '. ($isActive ? 'activeTrue' : 'activeFalse') . ' likeCollor'. $catalogItem["id_catalogue"] . '" id="' . $catalogItem["id_catalogue"] . ($isActive ? 'activeTrue' : 'activeFalse') .'" onclick="like(' . $catalogItem["id_catalogue"] . ')">';
            echo '<span class="cataLike ' . $catalogItem["id_catalogue"] . ' likeId' . $catalogItem["id_catalogue"] .'" id="likeId' . $catalogItem["id_catalogue"] .'">' . $catalogItem['likes'] . '</span>';
            echo '<i class="fa-solid fa-heart"></i>';
            echo '</button>';
            echo '<a href="http://localhost/!chekerlife/list/' . $urlName . '" class="cardA">';
            echo '<img class="navRechercheImg" src="http://localhost/!chekerlife/views/asset/img/' . $catalogItem["image_catalogue"] . '" alt="">';
            echo '<h3>'. $catalogNom .'</h3>';
            echo '</a>';
            echo '<script type="text/javascript"> likePosition('. $catalogItem["id_catalogue"]. '); </script>';
            echo '</li>';
        }
    }
}else if($_POST['action'] == "lastAdd"){
    $response_code = HTTP_OK;
    $lastAdd = Catalog::lastAdd();
    $responseTab = [
                    "response_code" => HTTP_OK,
                    "lastAdd" => $lastAdd,
                ];
    reponse($response_code, $responseTab);
}else if($_POST['action'] == "catalogNbLike"){

    $response_code = HTTP_OK;
    $catalogNbLike = Catalog::categoryNbLike($_POST['id_catalog']);
    $responseTab = [
                    "response_code" => HTTP_OK,
                    "catalogNbLike" => $catalogNbLike,
                ];
    reponse($response_code, $responseTab);
}else if($_POST['action'] == "views"){
    if(isset($_COOKIE['user_id'])){
        
        $catalog = Catalog::episodeInfo($_POST['chekboxId']); 
        $episodeViews = User::episodeUserViews($_COOKIE['user_id'], $_POST['chekboxId'], $catalog['catalog_id']);
        $nbEpisodeUserViewsActife = User::nbEpisodeUserViewsActife($_COOKIE['user_id'], $catalog['catalog_id']);
        $response_code = HTTP_OK;
        $responseTab = [
                        "response_code" => HTTP_OK,
                        "connecter" => true,
                        "nbEpisodeUserViewsActife" => $nbEpisodeUserViewsActife['COUNT(*)'],
                    ];
    }else{
        $response_code = HTTP_OK;
        $responseTab = [
                        "response_code" => HTTP_OK,
                        "connecter" => false,
                    ];
        }
    reponse($response_code, $responseTab);
}

}else {
    
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

function card($id_catalogue, $isActive, $nom, $like, $image_catalogue){
    $urlName = str_replace(' ', '-', $nom);
    echo '<button class="like ' . ($isActive ? 'activeTrue' : 'activeFalse') .  ' ' .'likeCollor'. $id_catalogue . '" id="' . $id_catalogue . ' " onclick="like(' . $id_catalogue . ')">';
    echo '<span class="cataLike ' . $id_catalogue . ' likeId' . $id_catalogue .'" id="likeId' . $id_catalogue .'">' . $like . '</span>';
    echo '<i class="fa-solid fa-heart"></i>';
    echo '</button>';
    echo '<a href="list/' . $urlName . '">';
    echo '<img src="http://localhost/!chekerlife/views/asset/img/' . $image_catalogue . '" alt="">';
    echo '</a>';
    echo '<script type="text/javascript"> likePosition('. $id_catalogue. '); ftrSize();</script>';
    echo '</div>';
}
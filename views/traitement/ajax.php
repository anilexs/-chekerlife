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

        echo '<button class="like ' . ($isActive ? 'activeTrue' : 'activeFalse') . '" id="' . $catalogItem["id_catalogue"] . '" onclick="like(' . $catalogItem["id_catalogue"] . ')">';
        echo '<span class="cataLike ' . $catalogItem['id_catalogue'] . '" id="likeId' . $catalogItem["id_catalogue"] .'">' . $catalogItem['likes'] . '</span>';
        echo '<i class="fa-solid fa-heart"></i>';
        echo '</button>';
        echo '<a href="list/' . $catalogItem["nom"] . '">';
        echo '<img src="asset/img/' . $catalogItem["image_catalogue"] . '" alt="">';
        echo '</a>';
        echo '<script type="text/javascript"> likePosition(' . $catalogItem['id_catalogue'] .'); </script>';
        echo '</div>';
        
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
            $urlName = str_replace(' ', '-', $catalogItem["nom"]);

        echo '<button class="like ' . ($isActive ? 'activeTrue' : 'activeFalse') . '" id="' . $catalogItem["id_catalogue"] . '" onclick="like(' . $catalogItem["id_catalogue"] . ')">';
        echo '<span class="cataLike ' . $catalogItem['id_catalogue'] . '" id="likeId' . $catalogItem["id_catalogue"] .'">' . $catalogItem['likes'] . '</span>';
        echo '<i class="fa-solid fa-heart"></i>';
        echo '</button>';
        echo '<a href="list/' . $catalogItem["nom"] . '">';
        echo '<img src="asset/img/' . $catalogItem["image_catalogue"] . '" alt="">';
        echo '</a>';
        echo '<script type="text/javascript"> likePosition(' . $catalogItem['id_catalogue'] .'); </script>';
        echo '</div>';

        }
    }
}else{
    
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
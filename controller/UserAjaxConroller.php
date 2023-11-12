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

    if($_POST['action'] == "deconnexion"){
        User::deconnexion();
        
        $response_code = HTTP_OK;
        $responseTab = [
            "response_code" => HTTP_OK,
        ];
        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "like" && isset($_POST['catalog_id'])){
        $response_code = HTTP_OK;
        $catalog_id = $_POST['catalog_id'];
        
        if(empty($_COOKIE['token'])){
                $responseTab = [
                    "connect" => false
                ];
        }else{
            $actif = User::user_actif($_COOKIE['token']);
            if($actif['user_actif'] == 1 && $actif['token_active'] == 1){
                $bool = User::like($_COOKIE['token'], $catalog_id);
                $nblike = User::likeCount($_COOKIE['token']);
                $CatalogInfo = Catalog::catalogInfo($_POST['catalog_id']);
                $response_code = HTTP_OK;
                $message = $bool;
                $responseTab = [
                    "response_code" => HTTP_OK,
                    "message" => $message,
                    "nbLike" => $nblike['COUNT(*)'],
                    "CatalogInfo" => $CatalogInfo,
                    "actif" => $actif
                ];
            }else{
                $logout = User::deconnexion();
                $responseTab = [
                    "response_code" => HTTP_OK,
                    "actif" => $actif
                ];
            }
        }
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
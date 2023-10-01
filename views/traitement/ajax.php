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
        $user_id = $_COOKIE['user_id'];
        $catalog_id = $_POST['catalog_id'];

        $bool = User::like($user_id, $catalog_id);
        $nblike = User::likeCount($user_id);
        
        $response_code = HTTP_OK;
        $message = $bool;
        $responseTab = [
            "response_code" => HTTP_OK,
            "message" => $message,
            "nbLike" => $nblike['COUNT(*)']
        ];
    }
        reponse($response_code, $responseTab);
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
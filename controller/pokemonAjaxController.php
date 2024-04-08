<?php
session_start();
require_once "../model/database.php";
require_once "../model/pokemonModel.php";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400; 
const HTTP_METHOD_NOT_ALLOWED = 405; 

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST'){
    $response_code = HTTP_BAD_REQUEST;
    $message = "il manque le paramétre ACTION";
    if($_POST['action'] == "setcard" && isset($_POST['set_name'])){
        $card = Pokemon::setCard($_POST['set_name'], $_COOKIE['token']);
    }else if($_POST['action'] == "pokeball"){
        $response_code = HTTP_OK;
        $pokeball = Pokemon::pokeball($_COOKIE['token'], $_POST['idCard'], $_POST['set_name'], $_POST['secondary_name']);

        $responseTab = [
            "response_code" => HTTP_OK,
            "pokeball" => $pokeball
        ];

        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "userCardEtat"){
        $response_code = HTTP_OK;
        
        $etat = Pokemon::userEtatCard($_COOKIE['token'], $_POST['set_name'], $_POST['idCard'], $_POST['secondary_name']);
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
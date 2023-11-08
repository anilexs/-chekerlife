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

    if($_POST['action'] == "inscription"){
        $response_code = HTTP_OK;
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);
        $newslatter = $_POST['Newslatter'];
        // boolvar potensiellement inutile a verifier
        $newslatter = boolval($newslatter); 

        $inscription = User::inscription($pseudo, $email, $password);
        
        if(!is_string($inscription[0]) && $newslatter == true && $inscription[0] == true){
            User::newsletter($inscription[1], $email);
            $newslatter = "entre";
        }
        
        if ($inscription[0] !== "error") {
            $error = null;
            $errorBool = null;
        }else{
            $error = $inscription[1];
            $errorBool = $inscription[2];
        }
        $responseTab = [
            "response_code" => HTTP_OK,
            "error" => $error,
            "errorBool" => $errorBool,
        ];

        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "connexion"){
        $response_code = HTTP_OK;
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);
        $login = User::login($email, $password);    
        if($login[0] !== "error"){
            $error = null;
        }else{
            $error = $login[1];
        }
        $responseTab = [
            "response_code" => HTTP_OK,
            "error" => $error,
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
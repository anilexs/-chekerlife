<?php
session_start();
require_once "../../model/database.php";
require_once "../../model/userModel.php";
require_once "../../model/catalogModel.php";

// if(isset($_POST['connexion'])){
//     $authentification = htmlspecialchars($_POST['email']);
//     $password = htmlspecialchars($_POST['password']);
    
//     User::login($authentification, $password);
// }

if(isset($_POST['deconnexion'])){  
    User::deconnexion();
}
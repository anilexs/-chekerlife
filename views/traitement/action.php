<?php
require_once "../../model/database.php";
require_once "../../model/userModel.php";
if(isset($_POST['inscription'])){
    $pseudo = htmlspecialchars($_POST['pseudo']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    User::inscription($pseudo, $email, $password);
}

if(isset($_POST['test'])){
    $authentification = "tete";
    $password = "test";
    
    User::login($authentification, $password);
}
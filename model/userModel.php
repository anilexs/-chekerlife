<?php
require_once "database.php";
class User{
    public static function inscription($pseudo, $email, $password) {
    $db = Database::dbConnect();
    $request = $db->prepare("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)");
    
    try {
        $request->execute(array($pseudo, $email, $password));
        $lastUserId = $db->lastInsertId();
        echo $lastUserId;
        setcookie("user_id", $lastUserId, time() + 3600, "/");

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}

}
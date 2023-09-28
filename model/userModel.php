<?php
require_once "database.php";
class User{
    public static function inscription($pseudo, $email, $password) {
    $db = Database::dbConnect();
    $request = $db->prepare("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)");
    $hash = password_hash($password, PASSWORD_DEFAULT);
    
    try {
        $request->execute(array($pseudo, $email, $hash));
        $lastUserId = $db->lastInsertId();
        echo $lastUserId;
        setcookie("user_id", $lastUserId, time() + 3600, "/");

    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}
    public static function login($authentification, $password) {
    $db = Database::dbConnect();
    $request = $db->prepare("SELECT * FROM users WHERE pseudo  = ? OR email = ?");
    
    try {
        $request->execute(array($authentification, $authentification));
        $user = $request->fetch(PDO::FETCH_ASSOC);
        var_dump($user);
        if(empty($user)){
            header('Location: ' . $_SERVER['HTTP_REFERER']);
        }else{
            if(password_verify($password, $user['password'])){
                echo "wow sais le bon";
            }else{
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }
        }

        // setcookie("user_id", $lastUserId, time() + 3600, "/");
    } catch (PDOException $e) {
        echo $e->getMessage();
    }
}

}
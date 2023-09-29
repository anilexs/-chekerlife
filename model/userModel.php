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
        if(isset($_SESSION)){
            session_destroy();
        }
        setcookie("user_id", $lastUserId, time() + 3600, "/");

    } catch (PDOException $e) {
        // echo $e->getMessage();
        $_SESSION["pseudo"] = $pseudo;
        $_SESSION["email"] = $email;
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
}
    public static function login($authentification, $password) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM users WHERE pseudo  = ? OR email = ?");
        
        try {
            $request->execute(array($authentification, $authentification));
            $user = $request->fetch(PDO::FETCH_ASSOC);
            if(empty($user)){
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }else{
                if(password_verify($password, $user['password'])){
                    setcookie("user_id", $user['id_user'], time() + 3600, "/");
                    header('Location: index');
                }else{
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                }
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
    }
}
    public static function deconnexion() {
        if(isset($_COOKIE)){
            setcookie("user_id", "", time() - 3600, "/");
            header('Location: index');
        }else{
            session_destroy();
            header('Location: index');
        }
    }

    public static function like(){
        
    }
}
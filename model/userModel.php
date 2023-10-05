<?php
require_once "database.php";
require_once "catalogModel.php";
define("DOMAINNAME", "localhost");
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
        setcookie("user_id", $lastUserId, time() + 3600, "/", DOMAINNAME);
        header('Location: http://localhost/!chekerlife/');
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
                    setcookie("user_id", $user['id_user'], time() + 3600 * 5, "/", DOMAINNAME);
                    header('Location: http://localhost/!chekerlife/');
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
            setcookie("user_id", "", time() - 3600, "/", DOMAINNAME);
            header('Location: http://localhost/!chekerlife/');
        }else{
            session_destroy();
            header('Location: http://localhost/!chekerlife/');
        }
    }

    public static function like($user_id, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM `likes` WHERE user_id = ? AND catalog_id = ?");
        $request2 = $db->prepare("INSERT INTO  likes (user_id, catalog_id) VALUES (?, ?)");
        $request3 = $db->prepare("UPDATE `likes` SET `active`= ? WHERE user_id = ? AND catalog_id = ?");
        
        try {
            $request->execute(array($user_id, $catalog_id));
            $like = $request->fetch(PDO::FETCH_ASSOC);

            $bool = null;
            if(empty($like)){
                $request2->execute(array($user_id, $catalog_id));
                Catalog::categoryLike(1, $catalog_id);
                $bool = true;
            }else{
                if($like['active'] == 0){
                    $request3->execute(array(1, $user_id, $catalog_id));
                    Catalog::categoryLike(1, $catalog_id);
                    $bool = true;
                }else{
                    $request3->execute(array(0, $user_id, $catalog_id));
                    Catalog::categoryLike(0, $catalog_id);
                    $bool = false;
                }
            }
            return $bool;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userLike($user_id) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM likes WHERE user_id = ?");
        try {
            $request->execute(array($user_id));
            $user_list = $request->fetchAll(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function likeCount($user_id) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM `likes` WHERE user_id = ? AND active = 1");
        try {
            $request->execute(array($user_id));
            $user_list = $request->fetch(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
<?php
require_once "database.php";
require_once "catalogModel.php";
define("DOMAINNAME", "localhost");
define("host", "http://localhost/!chekerlife/");
class User{
    public static function inscription($pseudo, $email, $password) {
        $db = Database::dbConnect();

        $requestVerify = $db->prepare("SELECT * FROM users WHERE pseudo = ? OR email = ?");
        $request = $db->prepare("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)");

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $requestVerify->execute(array($pseudo, $email));

        $userVerify = $requestVerify->fetch(PDO::FETCH_ASSOC);

        if(!empty($userVerify)){
            $pseudoError = false;
            $emailError = false;
            $equivalent = [];
            if($email === $userVerify['email'] && $pseudo === $userVerify['pseudo']){
                $equivalent [] = "Adresse e-mail déjà utilisée. <a href=connexion>Merci de vous connecter</a> ou de choisir une autre adresse e-mail.";
                $equivalent [] = "Nom d'utilisateur déjà pris";
                $pseudoError = true;
                $emailError = true;
            }else{
                if($pseudo === $userVerify['pseudo']){
                    $pseudoError = true;
                    $equivalent [] = "Nom d'utilisateur déjà pris";
                }
                if($email === $userVerify['email']){
                    $equivalent [] = "Adresse e-mail déjà utilisée. <a href=connexion>Merci de vous connecter</a> ou de choisir une autre adresse e-mail.";
                    $emailError = true;
                }

            }
            $errorBool = [$pseudoError, $emailError];
            $confirmation = ["error", $equivalent, $errorBool];
        }else{
            try {
                $request->execute(array($pseudo, $email, $hash));
    
                $lastUserId = $db->lastInsertId();
                setcookie("user_id", $lastUserId, time() + 3600, "/", DOMAINNAME);
                $confirmation = [true, $lastUserId];
            } catch (PDOException $e) {
                $equivalent [] = "Erreur du côté de la base de données. Si le problème persiste, contactez-nous.";;
                $confirmation = $equivalent;
            }
        }
        
        return $confirmation;
    }

    public static function newsletter($user_id, $email) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM newsletter WHERE email = ?");
        $request->execute(array($email));
        $userVerify = $request->fetch(PDO::FETCH_ASSOC); // Correction de la variable userVerify

        try {
            if (!empty($userVerify)) {
                $update = $db->prepare("UPDATE newsletter SET user_id = ? WHERE email = ?");
                $update->execute(array($user_id, $email));
            } else {
                $inser = $db->prepare("INSERT INTO newsletter (user_id, email) VALUES (?, ?)");
                $inser->execute(array($user_id, $email));
            }
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
            if(empty($user)){
                header('Location: ' . $_SERVER['HTTP_REFERER']);
            }else{
                if(password_verify($password, $user['password'])){
                    setcookie("user_id", $user['id_user'], time() + 3600 * 5, "/", DOMAINNAME);
                    header('Location:'. host);
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
            header('Location:' . host);
        }else{
            session_destroy();
            header('Location:' . host);
        }
    }

    public static function like($user_id, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM `likes` WHERE user_id = ? AND catalog_id = ?");
        $request2 = $db->prepare("INSERT INTO  likes (user_id, catalog_id) VALUES (?, ?)");
        $request3 = $db->prepare("UPDATE `likes` SET `active` = ?, `last_edited` = NOW() WHERE user_id = ? AND catalog_id = ?");
        
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

    public static function userInfo($user_id) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM users WHERE id_user = ?");
        try {
            $request->execute(array($user_id));
            $user_list = $request->fetch(PDO::FETCH_ASSOC);
            return $user_list;
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

    public static function episodeUserViews($user_id, $id_episode, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM user_episode_views WHERE user_id = ? AND episode_id = ?");
        $request2 = $db->prepare("INSERT INTO user_episode_views (user_id, episode_id, episode_catalog_id) VALUES (?, ?, ?)");
        $request3 = $db->prepare("UPDATE user_episode_views SET `active` = ?, `last_edited` = NOW() WHERE user_id = ? AND episode_id = ?");
        
        try {
            $request->execute(array($user_id, $id_episode));
            $episodeViews = $request->fetch(PDO::FETCH_ASSOC);

            $bool = null;
            if(empty($episodeViews)){
                $request2->execute(array($user_id, $id_episode, $catalog_id));
                $bool = true;
            }else{
                if($episodeViews['active'] == 0){
                    $request3->execute(array(1, $user_id, $id_episode));
                    $bool = true;
                }else{
                    $request3->execute(array(0, $user_id, $id_episode));
                    $bool = false;
                }
            }
            return $bool;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function nbEpisodeUserViewsActife($user_id, $id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM user_episode_views WHERE user_id = ? AND episode_catalog_id = ? AND active = 1");
        try {
            $request->execute(array($user_id, $id_catalog));
            $nbEpisodeUserViewsActife = $request->fetch(PDO::FETCH_ASSOC);
            return $nbEpisodeUserViewsActife;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function episodeViewsActifeUser($user_id, $id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM user_episode_views WHERE user_id = ? AND episode_catalog_id = ? AND active = 1");
        try {
            $request->execute(array($user_id, $id_catalog));
            $userViews = $request->fetchAll(PDO::FETCH_ASSOC);
            return $userViews;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
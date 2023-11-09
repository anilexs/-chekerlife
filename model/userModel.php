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
        $requestToken = $db->prepare("INSERT INTO token (user_id, token) VALUES (?, ?)");

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $requestVerify->execute(array($pseudo, $email));

        $userVerify = $requestVerify->fetch(PDO::FETCH_ASSOC);

        function generateToken($length = 16) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.@%$*_-';
            $token = '';
                
            for ($i = 0; $i < $length; $i++) {
                $token .= $characters[rand(0, strlen($characters) - 1)];
            }
        
            return $token;
        }

        if(!empty($userVerify)){
            $pseudoError = false;
            $emailError = false;
            $errorInscription = [];
            if($email === $userVerify['email'] && $pseudo === $userVerify['pseudo']){
                $errorInscription [] = "Adresse e-mail déjà utilisée. <a href=connexion>Merci de vous connecter</a> ou de choisir une autre adresse e-mail.";
                $errorInscription [] = "Nom d'utilisateur déjà pris";
                $pseudoError = true;
                $emailError = true;
            }else{
                if($pseudo === $userVerify['pseudo']){
                    $pseudoError = true;
                    $errorInscription [] = "Nom d'utilisateur déjà pris";
                }
                if($email === $userVerify['email']){
                    $errorInscription [] = "Adresse e-mail déjà utilisée. <a href=connexion>Merci de vous connecter</a> ou de choisir une autre adresse e-mail.";
                    $emailError = true;
                }

            }
            $errorBool = [$pseudoError, $emailError];
            $confirmation = ["error", $errorInscription, $errorBool];
        }else{
            try {
                $request->execute(array($pseudo, $email, $hash));
                
                $lastUserId = $db->lastInsertId();
                $token = generateToken(32);
                $requestToken->execute(array($lastUserId, $token));
                setcookie("token", $token, time() + 3600 * 5, "/", DOMAINNAME);
                $confirmation = [true, $lastUserId];
            } catch (PDOException $e) {
                $errorInscription [] = "Erreur du côté de la base de données. Si le problème persiste, contactez-nous.";;
                $confirmation = $errorInscription;
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
                $newsletter = $db->prepare("UPDATE newsletter SET user_id = ? WHERE email = ?");
                $newsletter->execute(array($user_id, $email));
            } else {
                $inser = $db->prepare("INSERT INTO newsletter (user_id, email) VALUES (?, ?)");
                $inser->execute(array($user_id, $email));
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }


    public static function login($email, $password) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT users.*, token.token FROM users LEFT JOIN token ON users.id_user = token.user_id AND token.token_active = 1 WHERE users.email = ?");
        $return = null;
        $errorInscription = [];
        
        try {
            $request->execute(array($email));
            $user = $request->fetch(PDO::FETCH_ASSOC);
            if(empty($user)){
                $errorInscription[] = "Veuillez vérifier vos informations de connexion.";
                $return = ["error", $errorInscription];
            }else{
                if(password_verify($password, $user['password'])){

                    setcookie("token", $user['token'], time() + 3600 * 5, "/", DOMAINNAME);
                    $return = ["successful", true];
                }else{
                    $errorInscription[] = "Veuillez vérifier vos informations de connexion.";
                    $return = ["error", $errorInscription];
                }
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
        return $return;
    }
    public static function deconnexion() {
        if(isset($_COOKIE)){
            setcookie("token", "", time() - 3600, "/", DOMAINNAME);
            header('Location:' . host);
        }else{
            session_destroy();
            header('Location:' . host);
        }
    }

    public static function like($token, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT likes.* FROM likes JOIN token ON likes.user_id = token.user_id WHERE token.token = ? AND token.token_active = 1 AND likes.catalog_id = ?");
        
        $request2 = $db->prepare("INSERT INTO likes (user_id, catalog_id) SELECT t.user_id, ? AS catalog_id FROM token t  WHERE t.token = ? AND t.token_active = 1;");

        $request3 = $db->prepare("UPDATE likes l LEFT JOIN token t ON l.user_id = t.user_id SET l.like_active = ?, l.last_edited = NOW() WHERE t.token = ? AND t.token_active = 1 AND l.catalog_id = ?");
        
        try {
            $request->execute(array($token, $catalog_id));
            $like = $request->fetch(PDO::FETCH_ASSOC);

            $bool = null;
            if(empty($like)){
                $request2->execute(array($catalog_id, $token));
                Catalog::categoryLike(1, $catalog_id);
                $bool = true;
            }else{
                if($like['like_active'] == 0){
                    $request3->execute(array(1, $token, $catalog_id));
                    Catalog::categoryLike(1, $catalog_id);
                    $bool = true;
                }else{
                    $request3->execute(array(0, $token, $catalog_id));
                    Catalog::categoryLike(0, $catalog_id);
                    $bool = false;
                }
            }
            return $bool;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userInfo($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT users.* FROM users JOIN token ON users.id_user = token.user_id WHERE token.token = ? AND token.token_active = 1");
        try {
            $request->execute(array($token));
            $user_list = $request->fetch(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userLike($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT likes.* FROM likes JOIN token ON likes.user_id = token.user_id WHERE token.token = ? AND token.token_active = 1");
        try {
            $request->execute(array($token));
            $user_list = $request->fetchAll(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function likeCount($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM likes JOIN token ON likes.user_id = token.user_id WHERE token.token = ? AND likes.like_active = 1");
        try {
            $request->execute(array($token));
            $user_list = $request->fetch(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function episodeUserViews($token, $id_episode, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT uev.* FROM user_episode_views uev JOIN token t ON uev.user_id = t.user_id WHERE t.token = ? AND t.token_active = 1 AND uev.episode_id = ?");
        
        $request2 = $db->prepare("INSERT INTO user_episode_views (user_id, episode_id, episode_catalog_id) SELECT user_id, ?, ? FROM token WHERE token = ? AND token_active = 1 LIMIT 1");

        $request3 = $db->prepare("UPDATE user_episode_views AS uev LEFT JOIN token AS t ON uev.user_id = t.user_id SET uev.views_active = ?, uev.last_edited = NOW() WHERE t.token = ? AND t.token_active = 1 AND uev.episode_id = ?");
        
        try {
            $request->execute(array($token, $id_episode));
            $episodeViews = $request->fetch(PDO::FETCH_ASSOC);

            $bool = null;
            if(empty($episodeViews)){
                $request2->execute(array($id_episode, $catalog_id, $token));
                $bool = true;
            }else{
                if($episodeViews['views_active'] == 0){
                    $request3->execute(array(1, $token, $id_episode));
                    $bool = true;
                }else{
                    $request3->execute(array(0, $token, $id_episode));
                    $bool = false;
                }
            }
            return $bool;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function nbEpisodeUserViewsActife($token, $id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM user_episode_views uev JOIN token t ON uev.user_id = t.user_id WHERE t.token = ? AND t.token_active = 1 AND uev.episode_catalog_id = ? AND uev.views_active = 1");
        try {
            $request->execute(array($token, $id_catalog));
            $nbEpisodeUserViewsActife = $request->fetch(PDO::FETCH_ASSOC);
            return $nbEpisodeUserViewsActife;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function episodeViewsActifeUser($token, $id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM user_episode_views uev JOIN token t ON uev.user_id = t.user_id WHERE t.token = ? AND t.token_active = 1 AND uev.episode_catalog_id = ? AND uev.views_active = 1");
        try {
            $request->execute(array($token, $id_catalog));
            $userViews = $request->fetchAll(PDO::FETCH_ASSOC);
            return $userViews;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
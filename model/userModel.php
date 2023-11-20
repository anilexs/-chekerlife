<?php
require_once "database.php";
require_once "catalogModel.php";
define("DOMAINNAME", "localhost");
define("host", "http://localhost/!chekerlife/");
class User{
    public static function user_actif($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT user_actif, token.token_active FROM users LEFT JOIN token ON users.id_user = token.user_id WHERE token.token = ?");
        try {
            $request->execute(array($token));
            $userActif = $request->fetch(PDO::FETCH_ASSOC);
            return $userActif;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function isTokenAvailable($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT id_token FROM token WHERE token = ?");
        try {
            $request->execute(array($token));
            $tokenDisponible = $request->fetch(PDO::FETCH_ASSOC);
            return !$tokenDisponible;
        } catch (PDOException $e) {
            echo $e->getMessage();
            return false;
        }
    }

    public static function generateToken($length = 32) {
        $db = Database::dbConnect();
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.@$*_-,=+';
        $token = '';
        
        do {
            $token = '';
            for ($i = 0; $i < $length; $i++) {
                $token .= $characters[rand(0, strlen($characters) - 1)];
            }
        } while (!self::isTokenAvailable($token));
    
        return $token;
    }
    
    public static function defaux_img($user_id) {
        $db = Database::dbConnect();
        $image = $db->prepare("INSERT INTO user_image (user_id, user_image, image_type) VALUES (?, ?, ?), (?, ?, ?)");
        try {
            $image->execute(array($user_id, "profile-defaux.png", "profil", $user_id, "banner-defaux.png", "banner"));
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function inscription($pseudo, $email, $password) {
        $db = Database::dbConnect();

        $requestVerify = $db->prepare("SELECT * FROM users WHERE pseudo = ? OR email = ?");
        $request = $db->prepare("INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)");
        $requestToken = $db->prepare("INSERT INTO token (user_id, token) VALUES (?, ?)");

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $requestVerify->execute(array($pseudo, $email));

        $userVerify = $requestVerify->fetch(PDO::FETCH_ASSOC);
            

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
                self::defaux_img($lastUserId);
                $token = self::generateToken();
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
                        if($user['user_actif'] == 1 && $user['token'] != null){
                            setcookie("token", $user['token'], time() + 3600 * 5, "/", DOMAINNAME);
                            $return = ["successful", true];
                        }else{
                            if($user['user_actif'] != 1){
                                $errorInscription[] = "Ce compte est inactif. S'il s'agit d'une erreur, merci de nous <a href=". host ."contact> contacter </a>.";
                            }
                            $return = ["error", $errorInscription];
                        }
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

    public static function userInfo($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT u.*, profile.user_image AS user_image, banner.user_image AS banner_image, cadre.user_image AS cadre_image FROM users u JOIN token t ON u.id_user = t.user_id LEFT JOIN user_image profile ON u.id_user = profile.user_id AND profile.image_type = 'profil' AND profile.image_active = 1 LEFT JOIN user_image banner ON u.id_user = banner.user_id AND banner.image_type = 'banner' AND banner.image_active = 1 LEFT JOIN user_image cadre ON u.id_user = cadre.user_id AND cadre.image_type = 'cadre' AND cadre.image_active = 1 WHERE t.token = ?");
        try {
            $request->execute(array($token));
            $user_list = $request->fetch(PDO::FETCH_ASSOC);
            return $user_list;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function profilInfo($pseudo){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT DISTINCT u.id_user, u.pseudo, u.user_statut, profile.user_image AS user_image, banner.user_image AS banner_image, cadre.user_image AS cadre_image FROM users u LEFT JOIN user_image profile ON u.id_user = profile.user_id AND profile.image_type = 'profil' AND profile.image_active = 1 LEFT JOIN user_image banner ON u.id_user = banner.user_id AND banner.image_type = 'banner' AND banner.image_active = 1 LEFT JOIN user_image cadre ON u.id_user = cadre.user_id AND cadre.image_type = 'cadre' AND cadre.image_active = 1 WHERE u.pseudo = ?");
        try {
            $request->execute(array($pseudo));
            $profileinfo = $request->fetch(PDO::FETCH_ASSOC);
            return $profileinfo;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userXPProfil($token){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT level, xp_actuelle FROM `users` LEFT JOIN token ON id_user = token.user_id WHERE token = ?");
        try {
            $request->execute(array($token));
            $userXPProfil = $request->fetch(PDO::FETCH_ASSOC);
            return $userXPProfil;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function updateXP($xpValu, $token){
        $db = Database::dbConnect();
        $request = $db->prepare("UPDATE users LEFT JOIN token ON users.id_user = token.user_id SET users.xp_actuelle = GREATEST(users.xp_actuelle + ?, 0) WHERE token.token = ?");
        try {
            $request->execute(array($xpValu, $token));
            $userXPProfil = $request->fetch(PDO::FETCH_ASSOC);
            return $userXPProfil;
        } catch (PDOException $e) {
            echo $e->getMessage();
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

            if(empty($episodeViews)){
                $request2->execute(array($id_episode, $catalog_id, $token));
            }else{
                if($episodeViews['views_active'] == 0){
                    $request3->execute(array(1, $token, $id_episode));
                }else{
                    $request3->execute(array(0, $token, $id_episode));
                }
            }
            self::prograision($token, $catalog_id);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function prograision($token, $id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog_progression LEFT JOIN token ON catalog_progression.user_id = token.user_id  WHERE token.token = ? AND catalog_id = ?");
        $insert = $db->prepare("INSERT INTO `catalog_progression`(`user_id`, `catalog_id`) SELECT token.user_id, ? FROM token WHERE token.token = ? AND token.token_active = 1");
        $update = $db->prepare("UPDATE catalog_progression LEFT JOIN token ON catalog_progression.user_id = token.user_id SET catalog_progression.etat = ?, catalog_progression.visible = 1 WHERE token.token = ? AND catalog_progression.catalog_id = ?");
        
        $episode = Catalog::episode($id_catalog);
        $episodes = count($episode);

        $nbEpisodeUserViewsActife = User::nbEpisodeUserViewsActife($_COOKIE['token'], $id_catalog);;
        $nbEpisodeUserViewsActife = $nbEpisodeUserViewsActife['COUNT(*)'];
        try {
            $request->execute(array($token, $id_catalog));
            $prograision = $request->fetch(PDO::FETCH_ASSOC);

            if(empty($prograision)){
                $insert->execute(array($id_catalog, $token));
            }else if($prograision['etat'] != "en attente" && $nbEpisodeUserViewsActife === 0){
                $update->execute(array("en attente", $token, $id_catalog));
            }else if(($prograision['etat'] != "en cours" || $prograision['etat'] == 0) && $nbEpisodeUserViewsActife > 0 && $nbEpisodeUserViewsActife < $episodes){
                $update->execute(array("en cours", $token, $id_catalog));
            }else if($prograision['etat'] != "terminer" || $prograision['visible'] == 0 && $nbEpisodeUserViewsActife == $episodes){
                $update->execute(array("terminer", $token, $id_catalog));
            }
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
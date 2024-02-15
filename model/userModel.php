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
    
    public static function defaux_img($user_id, $profil = "profile-defaux.png") {
        $db = Database::dbConnect();
        $image = $db->prepare("INSERT INTO user_image (user_id, user_image, image_type) VALUES (?, ?, ?), (?, ?, ?)");
        try {
            $image->execute(array($user_id, $profil, "profil", $user_id, "banner-defaux.png", "banner"));
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
    
    public static function inscriptionGoogle($nom, $prenom, $pseudo, $google_email, $google_sub, $picture){
        $token = self::generateToken();
        $dateEtHeure = date("Y-m-d-H\hi\ms\s");
        
        $db = Database::dbConnect();
        $request = $db->prepare("INSERT INTO users (nom, prenom, pseudo, google_email, google_sub) VALUES (?,?,?,?,?)");

        $requestToken = $db->prepare("INSERT INTO token (user_id, token) VALUES (?, ?)");

        try {
            $request->execute(array($nom, $prenom, $pseudo, $google_email, $google_sub));
            
            $token = self::generateToken();
            $lastUserId = $db->lastInsertId();
            $requestToken->execute(array($lastUserId, $token));

            $pictureName = "picture-$dateEtHeure.jpg";
            $destination = "../views/asset/img/user/profile/$pictureName";
            $file = file_get_contents($picture);
            file_put_contents($destination, $file);
            self::defaux_img($lastUserId, $pictureName);

            setcookie("token", $token, time() + 3600 * 5, "/", DOMAINNAME);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function loginGoogle($googleEmail) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT token.token FROM users LEFT JOIN token ON users.id_user = token.user_id AND token.token_active = 1 WHERE google_email = ?");
        try {
            $request->execute(array($googleEmail));
            $token = $request->fetch(PDO::FETCH_ASSOC);
            setcookie("token", $token['token'], time() + 3600 * 5, "/", DOMAINNAME);
            header('Location:' . host);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
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

    public static function onligne($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("INSERT INTO user_online (user_id) SELECT user_id FROM token WHERE token = ?");
        try {
            $request->execute(array($token));
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function friend($token) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT f.*, u.id_user, u.pseudo, u.level, u.xp_total, u.xp_actuelle, CASE WHEN f.expediteur_id = t.user_id THEN profile_receiver.user_image ELSE profile_expediteur.user_image END AS user_image, CASE WHEN f.expediteur_id = t.user_id THEN banner_receiver.user_image ELSE banner_expediteur.user_image END AS banner_image, CASE WHEN f.expediteur_id = t.user_id THEN cadre_receiver.user_image ELSE cadre_expediteur.user_image END AS cadre_image FROM friend f LEFT JOIN token t ON t.token = ? LEFT JOIN users u ON (f.expediteur_id = u.id_user OR f.receiver_id = u.id_user) LEFT JOIN user_image AS profile_expediteur ON (f.expediteur_id = profile_expediteur.user_id AND profile_expediteur.image_type = 'profil') LEFT JOIN user_image AS profile_receiver ON (f.receiver_id = profile_receiver.user_id AND profile_receiver.image_type = 'profil') LEFT JOIN user_image AS banner_expediteur ON (f.expediteur_id = banner_expediteur.user_id AND banner_expediteur.image_type = 'banner') LEFT JOIN user_image AS banner_receiver ON (f.receiver_id = banner_receiver.user_id AND banner_receiver.image_type = 'banner') LEFT JOIN user_image AS cadre_expediteur ON (f.expediteur_id = cadre_expediteur.user_id AND cadre_expediteur.image_type = 'cadre') LEFT JOIN user_image AS cadre_receiver ON (f.receiver_id = cadre_receiver.user_id AND cadre_receiver.image_type = 'cadre') WHERE f.statut = 'confirme' AND (f.expediteur_id = t.user_id OR f.receiver_id = t.user_id) AND f.friend_actif = 1 AND u.id_user != t.user_id;");
        try {
            $request->execute(array($token));
            $friend = $request->fetchAll(PDO::FETCH_ASSOC);
            return $friend;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function friend_requette($token) {
        $db = Database::dbConnect();
        $request = $db->prepare('SELECT * FROM `friend` LEFT JOIN token ON token.token = ? WHERE statut="en attente" AND (expediteur_id = token.user_id OR receiver_id = token.user_id);');
        try {
            $request->execute(array($token));
            $friend = $request->fetch(PDO::FETCH_ASSOC);
            return $friend;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function removeFriend($id_friend) {
        $db = Database::dbConnect();
        $request = $db->prepare('UPDATE friend SET friend_actif=0 WHERE id_friend = ?');
        try {
            $request->execute(array($id_friend));
        } catch (PDOException $e) {
            echo $e->getMessage();
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

    public static function prograision($token, $id_catalogue){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog_progression LEFT JOIN token ON catalog_progression.user_id = token.user_id  WHERE token.token = ? AND catalog_id = ?");
        $insert = $db->prepare("INSERT INTO `catalog_progression`(`user_id`, `catalog_id`) SELECT token.user_id, ? FROM token WHERE token.token = ? AND token.token_active = 1");
        $update = $db->prepare("UPDATE catalog_progression LEFT JOIN token ON catalog_progression.user_id = token.user_id SET catalog_progression.etat = ?, catalog_progression.visible = 1 WHERE token.token = ? AND catalog_progression.catalog_id = ?");
        
        $episode = Catalog::episode($id_catalogue);
        $episodes = count($episode);

        $nbEpisodeUserViewsActife = User::nbEpisodeUserViewsActife($_COOKIE['token'], $id_catalogue);;
        $nbEpisodeUserViewsActife = $nbEpisodeUserViewsActife['COUNT(*)'];
        try {
            $request->execute(array($token, $id_catalogue));
            $prograision = $request->fetch(PDO::FETCH_ASSOC);

            if(empty($prograision)){
                $insert->execute(array($id_catalogue, $token));
            }else if($prograision['etat'] != "en attente" && $nbEpisodeUserViewsActife === 0){
                $update->execute(array("en attente", $token, $id_catalogue));
            }else if(($prograision['etat'] != "en cours" || $prograision['etat'] == 0) && $nbEpisodeUserViewsActife > 0 && $nbEpisodeUserViewsActife < $episodes){
                $update->execute(array("en cours", $token, $id_catalogue));
            }else if($prograision['etat'] != "terminer" || $prograision['visible'] == 0 && $nbEpisodeUserViewsActife == $episodes){
                $update->execute(array("terminer", $token, $id_catalogue));
            }
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function nbEpisodeUserViewsActife($token, $id_catalogue){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM user_episode_views uev JOIN token t ON uev.user_id = t.user_id WHERE t.token = ? AND t.token_active = 1 AND uev.episode_catalog_id = ? AND uev.views_active = 1");
        try {
            $request->execute(array($token, $id_catalogue));
            $nbEpisodeUserViewsActife = $request->fetch(PDO::FETCH_ASSOC);
            return $nbEpisodeUserViewsActife;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function episodeViewsActifeUser($token, $id_catalogue){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM user_episode_views uev JOIN token t ON uev.user_id = t.user_id WHERE t.token = ? AND t.token_active = 1 AND uev.episode_catalog_id = ? AND uev.views_active = 1");
        try {
            $request->execute(array($token, $id_catalogue));
            $userViews = $request->fetchAll(PDO::FETCH_ASSOC);
            return $userViews;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function googleAconteVerify($email, $sub){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT google_sub FROM users WHERE google_email = ?");
        try {
            $request->execute(array($email));
            $userSub = $request->fetch(PDO::FETCH_ASSOC);
            $acount = (!empty($userSub)) ? true : false;
            if($acount == "count"){
                if(password_verify($sub, $userSub["google_sub"])){
                    $retour = true;
                }else{
                    $retour = false;
                }
            }else{
                $retour = null;
            }
            return [$acount, $retour];
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
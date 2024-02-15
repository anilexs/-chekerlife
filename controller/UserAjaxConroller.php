<?php
session_start();
require_once "../model/database.php";
require_once "../model/userModel.php";
require_once "../model/catalogModel.php";

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400; 
const HTTP_METHOD_NOT_ALLOWED = 405; 

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST'){
    $response_code = HTTP_BAD_REQUEST;
    $message = "il manque le paramétre ACTION";

    if($_POST['action'] == "deconnexion"){
        User::deconnexion();
        
        $response_code = HTTP_OK;
        $responseTab = [
            "response_code" => HTTP_OK,
        ];
        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "like" && isset($_POST['catalog_id'])){
        $response_code = HTTP_OK;
        $catalog_id = $_POST['catalog_id'];
        
        if(empty($_COOKIE['token'])){
                $responseTab = [
                    "connect" => false
                ];
        }else{
            $actif = User::user_actif($_COOKIE['token']);
            if($actif['user_actif'] == 1 && $actif['token_active'] == 1){
                $bool = User::like($_COOKIE['token'], $catalog_id);
                $nblike = User::likeCount($_COOKIE['token']);
                $CatalogInfo = Catalog::catalogInfo($_POST['catalog_id']);
                $response_code = HTTP_OK;
                $message = $bool;
                $responseTab = [
                    "response_code" => HTTP_OK,
                    "message" => $message,
                    "nbLike" => $nblike['COUNT(*)'],
                    "CatalogInfo" => $CatalogInfo,
                    "actif" => $actif
                ];
            }else{
                $logout = User::deconnexion();
                $responseTab = [
                    "response_code" => HTTP_OK,
                    "actif" => $actif
                ];
            }
        }
        reponse($response_code, $responseTab);
        
    }else if($_POST['action'] == "views" && isset($_POST['chekboxId'])){
        if(isset($_COOKIE['token'])){
            $response_code = HTTP_OK;
            $actif = User::user_actif($_COOKIE['token']);
            if($actif['user_actif'] == 1 && $actif['token_active'] == 1){
                $catalog = Catalog::episodeInfo($_POST['chekboxId']); 
                $episodeViews = User::episodeUserViews($_COOKIE['token'], $_POST['chekboxId'], $catalog['catalog_id']);
                $nbEpisodeUserViewsActife = User::nbEpisodeUserViewsActife($_COOKIE['token'], $catalog['catalog_id']);
                $responseTab = [
                            "response_code" => HTTP_OK,
                            "connecter" => true,
                            "nbEpisodeUserViewsActife" => $nbEpisodeUserViewsActife['COUNT(*)'],
                            "actif" => $actif,
                        ];
            }else{
                User::deconnexion();
                $responseTab = [
                            "response_code" => HTTP_OK,
                            "connecter" => false,
                        ];
            }
            
        }else{
            $response_code = HTTP_OK;
            $responseTab = [
                            "response_code" => HTTP_OK,
                            "connecter" => false,
                        ];
            }
        reponse($response_code, $responseTab);
    }else if($_POST['action'] == "userXpViews"){
        $userXPProfil = User::userXPProfil($_COOKIE['token']);
        $response_code = HTTP_OK;
        $responseTab = [
            "response_code" => HTTP_OK,
            "xp_actuelle" => $userXPProfil['xp_actuelle'],
            "xp_requis" => 1200,
        ];
        reponse($response_code, $responseTab); 
    }else if($_POST['action'] == "userOnligne"){
        $response_code = HTTP_OK;
        User::onligne($_COOKIE['token']);
        $responseTab = [
            "response_code" => HTTP_OK,
        ];
        reponse($response_code, $responseTab); 
    }else if($_POST['action'] == "allFriend"){
        $response_code = HTTP_OK;
        $friend = User::friend($_COOKIE['token']);
        friendCard($friend);
    }else if($_POST['action'] == "removeFriend"){
        $response_code = HTTP_OK;
        User::removeFriend($_POST['friend']);
        
        $responseTab = [
            "response_code" => HTTP_OK,
            "friend" => $_POST['friend'],
        ];
        reponse($response_code, $responseTab);  
    }
    
}else {
    $response_code = HTTP_METHOD_NOT_ALLOWED;
    $responseTab = [
        "response_code" => HTTP_METHOD_NOT_ALLOWED,
        "message" => "method not allowed"
    ];
    
    reponse($response_code, $responseTab);
}

function reponse($response_code, $response){
    header('Content-Type: application/json');
    http_response_code($response_code);
    
    echo json_encode($response);
}

function friendCard($friend){   
    foreach ($friend as $friend) {
        $cadreName = explode(".", $friend['cadre_image']);
        echo $cadreName[0];
        echo '<div class="friendCard">';
            echo '<div class="friendImgContenair">';
                echo '<img src="views/asset/img/user/cadre/'.$friend['cadre_image'].'" alt="profil img" class="'.$cadreName[0].'">';
                echo '<img src="views/asset/img/user/profile/'.$friend['user_image'].'" alt="profil img" class="friendImg">';
            echo '</div>';
            echo '<div class="friendController">';

            echo '<div class="removeFriend"><button class="'. $friend['id_user'] .'" id="removeFriend"><i class="fa-solid fa-x"></i></button></div>';
            
            echo '</div>';
        echo '</div>';
    }
}
?>
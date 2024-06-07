<?php 
require_once "database.php";

class Pokemon{
    public static function blockSet($token) {
        $db = Database::dbConnect();
        // SELECT pb.id_block, pb.name AS block_name, pb.order AS block_order, pb.updatedAt AS block_updatedAt, ps.id_set, ps.name AS set_name, ps.nb_card, ps.releaseDate, ps.updatedAt AS set_updatedAt, ps.logo, ps.order AS set_order FROM pokemon_block pb LEFT JOIN pokemon_set ps ON pb.id_block = ps.block_id ORDER BY pb.order DESC, ps.order DESC
        $request = $db->prepare("SELECT pb.id_block, pb.name AS block_name, pb.order AS block_order, pb.updatedAt AS block_updatedAt, ps.id_set, ps.name AS set_name, ps.nb_card, ps.releaseDate, ps.updatedAt AS set_updatedAt, ps.logo, ps.order AS set_order, COUNT(puc.card_id) AS user_card FROM pokemon_block pb LEFT JOIN token t ON t.token = ? LEFT JOIN pokemon_set ps ON pb.id_block = ps.block_id LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND puc.card_id = pc.id_card  AND puc.user_card_actif = 1 GROUP BY pb.id_block, ps.id_set ORDER BY pb.order DESC, ps.order DESC");
        try {
            $request->execute(array($token));
            $blockSet = $request->fetchAll(PDO::FETCH_ASSOC);
            return $blockSet;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function setInfo($name, $token) {
        $db = Database::dbConnect();

        $request = $db->prepare("SELECT ps.*, COUNT(DISTINCT CASE WHEN puc.card_id IS NOT NULL THEN puc.card_id ELSE pcs.card_id END) AS possession FROM pokemon_set ps LEFT JOIN token t ON IFNULL(t.token, 'null') = :token LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set LEFT JOIN pokemon_user_card puc ON puc.user_id = IFNULL(t.user_id, 0) AND IFNULL(puc.user_card_actif, 0) = 1 AND IFNULL(puc.possession, 0) > 0 LEFT JOIN pokemon_card_secondaire pcs ON pcs.id_pk_card_secondaire = puc.card_secondaire_id WHERE ps.name = :name AND (puc.card_id IN (SELECT id_card FROM pokemon_card WHERE set_id = ps.id_set) OR puc.card_secondaire_id IN (SELECT id_pk_card_secondaire FROM pokemon_card_secondaire WHERE set_id = ps.id_set));"); 

        try {
            $request->bindParam(':name', $name, PDO::PARAM_STR);
            $request->bindParam(':token', $token, PDO::PARAM_STR);
            $request->execute();
            $setInfo = $request->fetch(PDO::FETCH_ASSOC);
            return $setInfo;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function setCard($name, $token) {
        $db = Database::dbConnect();

        $request = $db->prepare("SELECT pc.*, ps.name AS set_name, ps.nb_card, pb.name AS block, pr.name AS rarete, pr.image AS rarete_img, pe.name AS energie, pe.image AS energie_img, (SELECT COUNT(*) FROM pokemon_user_card puc WHERE puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1) AS user_card,IFNULL(GROUP_CONCAT(DISTINCT CONCAT(pcs.card_secondary, '=', IFNULL(pcs.card_secondary_owned, 0)) ORDER BY pcs.card_secondary SEPARATOR ', '), '') AS card_secondary FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_rarete pr ON pr.id_rarete = pc.rarete_id LEFT JOIN pokemon_energie pe ON pe.id_energie = pc.energy_id LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT pc.id_card, pcs.name AS card_secondary, COUNT(puc.user_card_actif) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id AND puc.user_id = t.user_id AND puc.user_card_actif = 1 WHERE pc.set_id = (SELECT id_set FROM pokemon_set WHERE name = :name) GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId"); 

        
        try {

            $request->bindParam(':name', $name, PDO::PARAM_STR);
            $request->bindParam(':token', $token, PDO::PARAM_STR);
            $request->execute();
            $blockSet = $request->fetchAll(PDO::FETCH_ASSOC);
            return $blockSet;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    
    public static function pokeball($token, $cardId, $set_name, $etat, $secondary_name = null, $update) {
        // INSERT INTO `pokemon_user_card` (`user_id`, `card_id`) SELECT t.user_id, pc.id_card FROM token t LEFT JOIN pokemon_set ps ON ps.name = ? LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = ? WHERE t.token = ? LIMIT 1

        
        
        $db = Database::dbConnect();
        
        
        try {
            if($secondary_name == null){
                $request = $db->prepare("SELECT puc.* FROM pokemon_user_card puc LEFT JOIN token t ON t.token = :token LEFt JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_etat pe ON pe.etat = :etat WHERE puc.user_id = t.user_id AND puc.card_id = pc.id_card  AND puc.etat_id = pe.id_pk_etat ORDER BY puc.etat_id AND puc.prix IS NULL DESC"); 
            }else{ 
                $request = $db->prepare("SELECT puc.* FROM pokemon_user_card puc LEFT JOIN token t ON t.token = :token LEFt JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_card_secondaire pcs ON pcs.name = :secondary_name AND pcs.set_id = ps.id_set AND pcs.card_id = pc.id_card LEFT JOIN pokemon_etat pe ON pe.etat = :etat WHERE puc.user_id = t.user_id AND puc.card_id IS NULL AND puc.card_secondaire_id = pcs.id_pk_card_secondaire AND puc.etat_id = pe.id_pk_etat ORDER BY puc.prix"); 
                
                $request->bindParam(':secondary_name', $secondary_name, PDO::PARAM_STR);
            }
            
            $request->bindParam(':token', $token, PDO::PARAM_STR);
            $request->bindParam(':etat', $etat, PDO::PARAM_STR);
            $request->bindParam(':set_name', $set_name, PDO::PARAM_STR);
            $request->bindParam(':cardId', $cardId, PDO::PARAM_STR);
            $request->execute();
            $cardUser = $request->fetchAll(PDO::FETCH_ASSOC);
            
            if($cardUser){
                if($update == 1){
                    // if($secondary_name == null){

                    // }else{

                    // }
                }else{
                    foreach ($cardUser as $card) {
                        if($card['user_card_actif'] == 1){
                            $cardUser = $card;
                            break;
                        }else{
                            $cardUser = "tout et null";
                        }
                    }
                }
                // $cardUser = $cardUser[0];
                // if($cardUser[0]['prix'] == null || $cardUser[0]['prix'] == 0.00){

                // }
                // if($cardUser['user_card_actif'] == 1){

                // }else 
                // if($update == 1){
                    // UPDATE `pokemon_user_card` SET `possession`='1', NOW(), `user_card_actif`='1'
                    // $request = $db->prepare();
                // }else{
                    // false
                // }
            }else{
                if($update == 1){
                    if($secondary_name == null){
                        $insert = $db->prepare('INSERT INTO `pokemon_user_card` (`user_id`, `card_id`, `etat_id`) SELECT t.user_id, pc.id_card, pe.id_pk_etat FROM token t LEFT JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_etat pe ON pe.etat = :etat WHERE `token` = :token AND pc.id_card IS NOT NULL');
                    }else{
                        $insert = $db->prepare('INSERT INTO `pokemon_user_card` (`user_id`, `card_secondaire_id`, `etat_id`) SELECT t.user_id, pcs.id_pk_card_secondaire, pe.id_pk_etat FROM token t LEFT JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_card_secondaire pcs ON pcs.card_id = pc.id_card AND pcs.set_id = ps.id_set AND pcs.name = :secondary_name LEFT JOIN pokemon_etat pe ON pe.etat = :etat WHERE `token` = :token AND pcs.id_pk_card_secondaire IS NOT NULL');
                        $insert->bindParam(':secondary_name', $secondary_name, PDO::PARAM_STR);
                    }
                    $insert->bindParam(':token', $token, PDO::PARAM_STR);
                    $insert->bindParam(':etat', $etat, PDO::PARAM_STR);
                    $insert->bindParam(':set_name', $set_name, PDO::PARAM_STR);
                    $insert->bindParam(':cardId', $cardId, PDO::PARAM_STR);
                    $insert->execute();
                    $lastId = $db->lastInsertId();

                    $cardUser = $lastId;
                    // $cardUser = {
                        
                    // }
                }else{
                    $cardUser = "imposible de reduire une ligne inexistant";
                } 
            }
            
            return $cardUser;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userEtatCard($token, $set_name, $cardId, $secondary_name = null) {
        $db = Database::dbConnect();

        if($secondary_name == null){
            // card
            // SELECT 
            //     pe.id_pk_etat,
            //     pe.etat,
            //     COALESCE(SUM(puc.possession), 0) AS nombre_de_cartes
            // FROM 
            //     pokemon_etat pe
            // LEFT JOIN 
            //     token t ON t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@'
            // LEFT JOIN 
            //     pokemon_set ps ON ps.name = 'Calendrier des Fêtes 2023'
            // LEFT JOIN 
            //     pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = 1
            // LEFT JOIN 
            //     pokemon_user_card puc ON puc.etat_id = pe.id_pk_etat 
            //                           AND puc.user_id = t.user_id 
            //                           AND puc.card_id = pc.id_card 
            //                           AND puc.user_card_actif = 1
            // GROUP BY 
            //     pe.id_pk_etat, 
            //     pe.etat;

            // SELECT pe.id_pk_etat, pe.etat, COALESCE(COUNT(puc.id_pk_user_card)  + puc.possession -1, 0) AS nombre_de_cartes FROM pokemon_etat pe LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_user_card puc ON puc.etat_id = pe.id_pk_etat AND puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1 GROUP BY pe.id_pk_etat, pe.etat;

            $request = $db->prepare("SELECT pe.id_pk_etat, pe.etat, COALESCE(SUM(puc.possession), 0) AS nombre_de_cartes FROM pokemon_etat pe LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_set ps ON ps.name = :set_name LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = :cardId LEFT JOIN pokemon_user_card puc ON puc.etat_id = pe.id_pk_etat AND puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1 GROUP BY pe.id_pk_etat, pe.etat");
        }else{
            // SELECT 
            // pe.id_pk_etat, 
            // pe.etat, 
            // COALESCE(SUM(puc.possession), 0) AS nombre_de_cartes
            // FROM 
            // pokemon_etat pe
            // LEFT JOIN 
            // pokemon_user_card puc ON pe.id_pk_etat = puc.etat_id
            // AND puc.user_card_actif = 1
            // AND puc.user_id = (SELECT t.user_id FROM token t WHERE t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@')
            // AND puc.card_secondaire_id IN (SELECT pcs.id_pk_card_secondaire FROM pokemon_card_secondaire pcs
            // INNER JOIN pokemon_card pc ON pcs.card_id = pc.id_card AND pcs.name = 'pokedex'
            // INNER JOIN pokemon_set ps ON pc.set_id = ps.id_set
            // WHERE pc.cardId = 1
            // AND ps.name = 'Calendrier des Fêtes 2023')
            // GROUP BY 
            // pe.id_pk_etat, 
            // pe.etat;


            // SELECT pe.id_pk_etat, pe.etat, COALESCE(COUNT(DISTINCT puc.id_pk_user_card) + puc.possession -1, 0) AS nombre_de_cartes FROM pokemon_etat pe LEFT JOIN pokemon_user_card puc ON pe.id_pk_etat = puc.etat_id AND puc.user_card_actif = 1 AND puc.user_id = (SELECT t.user_id FROM token t WHERE t.token = :token) AND puc.card_secondaire_id IN (SELECT pcs.id_pk_card_secondaire FROM pokemon_card_secondaire pcs INNER JOIN pokemon_card pc ON pcs.card_id = pc.id_card AND pcs.name = :secondary_name INNER JOIN pokemon_set ps ON pc.set_id = ps.id_set WHERE pc.cardId = :cardId AND ps.name = :set_name) GROUP BY pe.id_pk_etat, pe.etat;

            $request = $db->prepare("SELECT 
            pe.id_pk_etat, 
            pe.etat, 
            COALESCE(SUM(puc.possession), 0) AS nombre_de_cartes
            FROM 
            pokemon_etat pe
            LEFT JOIN 
            pokemon_user_card puc ON pe.id_pk_etat = puc.etat_id
            AND puc.user_card_actif = 1
            AND puc.user_id = (SELECT t.user_id FROM token t WHERE t.token = :token)
            AND puc.card_secondaire_id IN (SELECT pcs.id_pk_card_secondaire FROM pokemon_card_secondaire pcs
            INNER JOIN pokemon_card pc ON pcs.card_id = pc.id_card AND pcs.name = :secondary_name
            INNER JOIN pokemon_set ps ON pc.set_id = ps.id_set
            WHERE pc.cardId = :cardId
            AND ps.name = :set_name)
            GROUP BY 
            pe.id_pk_etat, 
            pe.etat;");
            
            $request->bindParam(':secondary_name', $secondary_name, PDO::PARAM_STR);
        }


        try {
            $request->bindParam(':token', $token, PDO::PARAM_STR);
            $request->bindParam(':set_name', $set_name, PDO::PARAM_STR);
            $request->bindParam(':cardId', $cardId, PDO::PARAM_STR);
            $request->execute();
            $etat = $request->fetchAll(PDO::FETCH_ASSOC);
            return $etat;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
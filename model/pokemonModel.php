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
    
    public static function setCard($name, $token) {
        $db = Database::dbConnect();
        // SELECT pc.*, ps.name, pb.name AS block FROM pokemon_card pc LEFT JOIN pokemon_set ps ON  ps.name = ? LEFT JOIN pokemon_block pb ON pb.id_block = ps.block_id WHERE pc.set_id = ps.id_set ORDER BY pc.cardId

        // SELECT pc.*, ps.name, pb.name AS block, pcs.card_secondary FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = ? LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT pcs.card_id, CASE WHEN COUNT(pcs.card_id) = 0 THEN NULL ELSE GROUP_CONCAT(pcs.name SEPARATOR ',') END AS card_secondary FROM pokemon_card_secondaire pcs GROUP BY pcs.card_id) pcs ON pc.id_card = pcs.card_id ORDER BY pc.cardId

        // SELECT pc.*, ps.name, pb.name AS block, GROUP_CONCAT(CONCAT(pcs.card_secondary, '=', pcs.card_secondary_owned) ORDER BY pcs.card_secondary SEPARATOR ', ') AS card_secondary, IF(puc.user_id IS NOT NULL, 1, 0) AS user_card FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND pc.id_card = puc.card_id AND puc.user_card_actif = 1 LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT DISTINCT pc.id_card, pcs.name AS card_secondary, IFNULL(MAX(CASE WHEN puc.user_id = t.user_id AND puc.user_card_actif = 1 THEN 1 ELSE 0 END), 0) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId;
        
        // SELECT pc.*, ps.name, pb.name AS block, GROUP_CONCAT(CONCAT(pcs.card_secondary, '=', pcs.card_secondary_owned) ORDER BY pcs.card_secondary SEPARATOR ', ') AS card_secondary, IF(puc.user_id IS NOT NULL, 1, 0) AS user_card FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND pc.id_card = puc.card_id AND puc.user_card_actif = 1 LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT DISTINCT pc.id_card, pcs.name AS card_secondary, IFNULL(MAX(CASE WHEN puc.user_id = t.user_id AND puc.user_card_actif = 1 THEN 1 ELSE 0 END), 0) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId
        // SELECT pc.*, ps.name, pb.name AS block, pr.name AS rarete, pr.image AS rarete_img, pe.name AS energie, pe.image AS energie_img, GROUP_CONCAT(CONCAT(pcs.card_secondary, '=', pcs.card_secondary_owned) ORDER BY pcs.card_secondary SEPARATOR ', ') AS card_secondary, IF(puc.user_id IS NOT NULL, 1, 0) AS user_card FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND pc.id_card = puc.card_id AND puc.user_card_actif = 1 LEFT JOIN pokemon_rarete pr ON pr.id_rarete = pc.rarete_id LEFT JOIN pokemon_energie pe ON pe.id_energie = pc.energy_id LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT DISTINCT pc.id_card, pcs.name AS card_secondary, IFNULL(MAX(CASE WHEN puc.user_id = t.user_id AND puc.user_card_actif = 1 THEN 1 ELSE 0 END), 0) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId
        $request = $db->prepare("SELECT pc.*, ps.name, pb.name AS block, pr.name AS rarete, pr.image AS rarete_img, pe.name AS energie, pe.image AS energie_img, IFNULL(GROUP_CONCAT(CONCAT(pcs.card_secondary, '=', IFNULL(pcs.card_secondary_owned, 0)) ORDER BY pcs.card_secondary SEPARATOR ', '), '') AS card_secondary, IF(puc.user_id IS NOT NULL, 1, 0) AS user_card FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND pc.id_card = puc.card_id AND puc.user_card_actif = 1 LEFT JOIN pokemon_rarete pr ON pr.id_rarete = pc.rarete_id LEFT JOIN pokemon_energie pe ON pe.id_energie = pc.energy_id LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT DISTINCT pc.id_card, pcs.name AS card_secondary, IFNULL(MAX(CASE WHEN puc.user_id = t.user_id AND puc.user_card_actif = 1 THEN 1 ELSE 0 END), 0) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId"); 

        
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
    
    public static function pokeball($token, $cardId, $set, $secondary_name = null) {
        // $db = Database::dbConnect();
        
        // if($secondary_name == null){
            // $request = $db->prepare("INSERT INTO `pokemon_user_card` (`user_id`, `card_id`) SELECT t.user_id, pc.id_card FROM token t LEFT JOIN pokemon_set ps ON ps.name = ? LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = ? WHERE t.token = ? LIMIT 1"); 
        // }else{
            // $request = $db->prepare(""); 
        // }
        
        try {
            // $blockSet = $request->fetchAll(PDO::FETCH_ASSOC);
            // $request->execute();
            // return $token;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
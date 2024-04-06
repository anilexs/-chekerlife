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


        // SELECT pc.*, ps.name, pb.name AS block, pr.name AS rarete, pr.image AS rarete_img, pe.name AS energie, pe.image AS energie_img, IFNULL(GROUP_CONCAT(CONCAT(pcs.card_secondary, '=', IFNULL(pcs.card_secondary_owned, 0)) ORDER BY pcs.card_secondary SEPARATOR ', '), '') AS card_secondary, IF(puc.user_id IS NOT NULL, 1, 0) AS user_card FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON puc.user_id = t.user_id AND pc.id_card = puc.card_id AND puc.user_card_actif = 1 LEFT JOIN pokemon_rarete pr ON pr.id_rarete = pc.rarete_id LEFT JOIN pokemon_energie pe ON pe.id_energie = pc.energy_id LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT DISTINCT pc.id_card, pcs.name AS card_secondary, IFNULL(MAX(CASE WHEN puc.user_id = t.user_id AND puc.user_card_actif = 1 THEN 1 ELSE 0 END), 0) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId
//         SELECT 
//     pc.*,
//     ps.name AS set_name,
//     pb.name AS block,
//     pr.name AS rarete,
//     pr.image AS rarete_img,
//     pe.name AS energie,
//     pe.image AS energie_img,
//     (SELECT COUNT(*) FROM pokemon_user_card puc WHERE puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1) AS user_card,
//     IFNULL(GROUP_CONCAT(DISTINCT CONCAT(pcs.card_secondary, '=', IFNULL(pcs.card_secondary_owned, 0)) ORDER BY pcs.card_secondary SEPARATOR ', '), '') AS card_secondary
// FROM 
//     pokemon_card pc
// JOIN 
//     pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = 'Calendrier des Fêtes 2023' 
// LEFT JOIN 
//     token t ON t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@' 
// LEFT JOIN 
//     pokemon_rarete pr ON pr.id_rarete = pc.rarete_id 
// LEFT JOIN 
//     pokemon_energie pe ON pe.id_energie = pc.energy_id
// LEFT JOIN 
//     pokemon_block pb ON ps.block_id = pb.id_block 
// LEFT JOIN 
//     (
//         SELECT 
//             pc.id_card, 
//             pcs.name AS card_secondary, 
//             COUNT(puc.user_card_actif) AS card_secondary_owned 
//         FROM 
//             pokemon_card pc 
//         LEFT JOIN 
//             pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id 
//         LEFT JOIN 
//             token t ON t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@'
//         LEFT JOIN 
//             pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id AND puc.user_id = t.user_id AND puc.user_card_actif = 1
//         WHERE 
//             pc.set_id = (SELECT id_set FROM pokemon_set WHERE name = 'Calendrier des Fêtes 2023')
//         GROUP BY 
//             pc.id_card, pcs.name
//     ) pcs ON pc.id_card = pcs.id_card 
// GROUP BY 
//     pc.id_card 
// ORDER BY 
//     pc.cardId;

        $request = $db->prepare("SELECT pc.*, ps.name AS set_name, pb.name AS block, pr.name AS rarete, pr.image AS rarete_img, pe.name AS energie, pe.image AS energie_img, (SELECT COUNT(*) FROM pokemon_user_card puc WHERE puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1) AS user_card,IFNULL(GROUP_CONCAT(DISTINCT CONCAT(pcs.card_secondary, '=', IFNULL(pcs.card_secondary_owned, 0)) ORDER BY pcs.card_secondary SEPARATOR ', '), '') AS card_secondary FROM pokemon_card pc JOIN pokemon_set ps ON pc.set_id = ps.id_set AND ps.name = :name LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_rarete pr ON pr.id_rarete = pc.rarete_id LEFT JOIN pokemon_energie pe ON pe.id_energie = pc.energy_id LEFT JOIN pokemon_block pb ON ps.block_id = pb.id_block LEFT JOIN (SELECT pc.id_card, pcs.name AS card_secondary, COUNT(puc.user_card_actif) AS card_secondary_owned FROM pokemon_card pc LEFT JOIN pokemon_card_secondaire pcs ON pc.id_card = pcs.card_id LEFT JOIN token t ON t.token = :token LEFT JOIN pokemon_user_card puc ON pcs.id_pk_card_secondaire = puc.card_secondaire_id AND puc.user_id = t.user_id AND puc.user_card_actif = 1 WHERE pc.set_id = (SELECT id_set FROM pokemon_set WHERE name = 'Calendrier des Fêtes 2023') GROUP BY pc.id_card, pcs.name) pcs ON pc.id_card = pcs.id_card GROUP BY pc.id_card ORDER BY pc.cardId"); 

        
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
    
    public static function pokeball($token, $cardId, $set_name, $secondary_name = null) {
        // INSERT INTO `pokemon_user_card` (`user_id`, `card_id`) SELECT t.user_id, pc.id_card FROM token t LEFT JOIN pokemon_set ps ON ps.name = ? LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = ? WHERE t.token = ? LIMIT 1

        
        
        $db = Database::dbConnect();
        
        
        try {
            if($secondary_name == null){
                // SELECT puc.* FROM pokemon_user_card puc 
                // LEFT JOIN token t ON t.token ="Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@"
                // LEFt JOIN pokemon_set ps ON ps.name = 'Calendrier des Fêtes 2023'
                // LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = 1
                // WHERE puc.user_id = t.user_id AND puc.card_id = pc.id_card ORDER BY puc.etat_id LIMIT 1

                $request = $db->prepare("SELECT puc.* FROM pokemon_user_card puc LEFT JOIN token t ON t.token = ? LEFT JOIN pokemon_etat pe ON pe.etat = 'Neuve' LEFt JOIN pokemon_set ps ON ps.name = ? LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = ? WHERE puc.user_id = t.user_id AND puc.etat_id = pe.id_pk_etat AND puc.card_id = pc.id_card"); 
                $request->execute(array($token, $set_name, $cardId));
                
                $cardUser = $request->fetch(PDO::FETCH_ASSOC);
            }else{
                // SELECT puc.* FROM pokemon_user_card puc 
                // LEFT JOIN token t ON t.token ="Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@"
                // LEFT JOIN pokemon_card_secondaire pcs ON pcs.name = "123"
                // WHERE puc.user_id = t.user_id AND puc.card_secondaire_id = pcs.card_id ORDER BY puc.etat_id LIMIT 1
    
                $request = $db->prepare("SELECT puc.* FROM pokemon_user_card puc LEFT JOIN token t ON t.token = ? LEFT JOIN pokemon_etat pe ON pe.etat = 'Neuve' LEFT JOIN pokemon_card_secondaire pcs ON pcs.name = ? WHERE puc.user_id = t.user_id AND puc.etat_id = pe.id_pk_etat AND puc.card_secondaire_id = pcs.card_id"); 
                $request->execute(array($token, $secondary_name));
                
                $cardUser = $request->fetch(PDO::FETCH_ASSOC);
            }

            return $cardUser;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public static function userEtatCard() {
        $db = Database::dbConnect();
        //  card etat a compte par la suit
        // card
        // SELECT pe.id_pk_etat, pe.etat, COALESCE(COUNT(puc.id_pk_user_card)  + puc.possession -1, 0) AS nombre_de_cartes
        // FROM pokemon_etat pe
        // LEFT JOIN token t ON t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@'
        // LEFT JOIN pokemon_set ps ON ps.name = 'Calendrier des Fêtes 2023'
        // LEFT JOIN pokemon_card pc ON pc.set_id = ps.id_set AND pc.cardId = 1
        // LEFT JOIN pokemon_user_card puc ON puc.etat_id = pe.id_pk_etat AND puc.user_id = t.user_id AND puc.card_id = pc.id_card AND puc.user_card_actif = 1
        // GROUP BY pe.id_pk_etat, pe.etat;

        // secondaire
        // SELECT pe.id_pk_etat, 
        // pe.etat, 
        // COALESCE(COUNT(DISTINCT puc.id_pk_user_card) + puc.possession -1, 0) AS nombre_de_cartes
        // FROM pokemon_etat pe
        // LEFT JOIN pokemon_user_card puc ON pe.id_pk_etat = puc.etat_id
        // AND puc.user_card_actif = 1
        // AND puc.user_id = (SELECT t.user_id FROM token t WHERE t.token = 'Vcs+bqCb=.ZLaWNkH@.85KbKUADe+VO@')
        // AND puc.card_secondaire_id IN (SELECT pcs.id_pk_card_secondaire FROM pokemon_card_secondaire pcs
        // INNER JOIN pokemon_card pc ON pcs.card_id = pc.id_card
        // INNER JOIN pokemon_set ps ON pc.set_id = ps.id_set
        // WHERE pc.cardId = 1
        // AND ps.name = 'Calendrier des Fêtes 2023')
        // GROUP BY pe.id_pk_etat, pe.etat;

        $request = $db->prepare("SELECT * FROM pokemon_etat");
        try {
            $request->execute();
            $etat = $request->fetchAll(PDO::FETCH_ASSOC);
            return $etat;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
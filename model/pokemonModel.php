<?php 
require_once "database.php";

class Pokemon{
    public static function blockSet() {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT pb.id_block, pb.name AS block_name, pb.order AS block_order, pb.updatedAt AS block_updatedAt, ps.id_set, ps.name AS set_name, ps.nb_card, ps.releaseDate, ps.updatedAt AS set_updatedAt, ps.logo, ps.order AS set_order FROM pokemon_block pb LEFT JOIN pokemon_set ps ON pb.id_block = ps.block_id ORDER BY pb.order DESC, ps.order DESC");
        try {
            $request->execute();
            $blockSet = $request->fetchAll(PDO::FETCH_ASSOC);
            return $blockSet;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function setCard($name) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT pc.* FROM pokemon_card pc LEFT JOIN pokemon_set ps ON  ps.name = ? WHERE pc.set_id = ps.id_set ORDER BY pc.number");
        try {
            $request->execute(array($name));
            $blockSet = $request->fetchAll(PDO::FETCH_ASSOC);
            return $blockSet;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
<?php
require_once "database.php";
class AdminCatalog{
    public static function catalogInfoAdmin($catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog WHERE id_catalogue = ?");

        try{
            $request->execute(array($catalog_id));
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function Cataloglimit($limit, $offset) {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM `catalog` WHERE brouillon = 0 AND catalog_actif = 1 LIMIT :offset, :limit");
        
        try {
            $request->bindParam(':offset', $offset, PDO::PARAM_INT);
            $request->bindParam(':limit', $limit, PDO::PARAM_INT);
            $request->execute();
            $catalog = $request->fetchAll(PDO::FETCH_ASSOC);
            return $catalog;
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }

    public static function nbCatalog() {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(*) FROM `catalog` WHERE brouillon = 0 AND catalog_actif = 1");
        
        try {
            $request->execute();
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }
}

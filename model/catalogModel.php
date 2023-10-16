<?php
require_once "database.php";
class Catalog{
    public static function allCatalog(){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM `catalog`");

        try{
            $request->execute(array());
            $catalog = $request->fetchAll(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    public static function filtreCatalog($filtres){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT DISTINCT c.* FROM catalog c LEFT JOIN alias a ON c.id_catalogue = a.catalog_id WHERE a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%')");

        try{
            $request->execute(array($filtres, $filtres));
            $catalog = $request->fetchAll(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    public static function catalogInfo($catalog_id){
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
    
    public static function catalogInfoName($name){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog WHERE nom = ?");

        try{
            $request->execute(array($name));
            $catalogInfoName = $request->fetch(PDO::FETCH_ASSOC);
            return $catalogInfoName;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

    public static function categoryLike($value, $catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("UPDATE catalog SET likes = likes + 1 WHERE id_catalogue = ?");
        $request2 = $db->prepare("UPDATE catalog SET likes = likes - 1 WHERE id_catalogue = ?");
        try{
            if($value == 1){
                $request->execute(array($catalog_id));
            }else{
                $request2->execute(array($catalog_id));
            }
        }catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function categoryNbLike($catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT likes FROM catalog WHERE id_catalogue = ? LIMIT 1");
        try{
            $request->execute(array($catalog_id));
            $like = $request->fetch();
            return $like;
        }catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function navRechercher($filtres){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT DISTINCT c.* FROM catalog c LEFT JOIN alias a ON c.id_catalogue = a.catalog_id WHERE a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%') LIMIT 3");

        try{
            $request->execute(array($filtres, $filtres));
            $catalog = $request->fetchAll(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function listViews($filtres){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT catalog.nom AS nom_catalog, episode.* FROM catalog LEFT JOIN episode ON catalog.id_catalogue = episode.catalog_id WHERE catalog.nom = ?");

        try{
            $request->execute(array($filtres));
            $filtres = $request->fetchAll(PDO::FETCH_ASSOC);
            return $filtres;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function lastAdd(){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog ORDER BY last_add DESC LIMIT 8");

        try{
            $request->execute();
            $lastAdd = $request->fetchAll(PDO::FETCH_ASSOC);
            return $lastAdd;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }

}

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
    
    public static function Cataloglimit($limit, $offset, $parametre) {

        $prepar = "";
        if($parametre['allViews']){
            $prepar = "SELECT null as id_brouillon, id_catalogue, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, likes, brouillon, catalog_actif, 'catalog' as origin FROM catalog UNION ALL SELECT id_brouillon, catalog_id, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, null, 0, 1, 'brouillon' as origin FROM catalog_brouillon ORDER BY id_catalogue, add_date LIMIT :offset, :limit";
        }else{
            $prepar = "SELECT null as id_brouillon, id_catalogue, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, likes, brouillon, catalog_actif, 'catalog' as origin FROM catalog UNION ALL SELECT id_brouillon, catalog_id, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, null, 0, 1, 'brouillon' as origin FROM catalog_brouillon ORDER BY id_catalogue, add_date LIMIT :offset, :limit";
        }
        $db = Database::dbConnect();
        $request = $db->prepare($prepar);
        
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
        // WHERE brouillon = 0 AND catalog_actif = 1
        $request = $db->prepare("SELECT COUNT(*) FROM `catalog`");
        
        try {
            $request->execute();
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }

    public static function filtreCatalog($filtres, $limit, $offset){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT DISTINCT c.* FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE brouillon = 0 AND catalog_actif = 1 AND (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) LIMIT :offset, :limit");

        $request->bindParam(':offset', $offset, PDO::PARAM_INT);
        $request->bindParam(':limit', $limit, PDO::PARAM_INT);
        $request->bindParam(':filtres', $filtres, PDO::PARAM_STR);

        try {
            $request->execute();
            $filtres = $request->fetchAll(PDO::FETCH_ASSOC);
            return $filtres;
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

   
    public static function nbFiltreCatalog($filtres){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT COUNT(DISTINCT c.id_catalogue) AS nbFiltre FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE brouillon = 0 AND catalog_actif = 1 AND (a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%'))");

        try{
            $request->execute(array($filtres, $filtres));
            $filtres = $request->fetch(PDO::FETCH_ASSOC);
            return $filtres;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
}

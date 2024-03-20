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
        $prepar = "SELECT ";
        if($parametre['allViews']){
            $prepar .= "NULL as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin, IFNULL(t.type, 'null') as type FROM catalog c LEFT JOIN type_principal_catalog p ON p.catalog_id = c.id_catalogue LEFT JOIN catalog_type_principal t ON t.id_type_principal = p.principal_id AND t.type_actif = 1 UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.saison, cb.publish_date, cb.add_date, NULL as likes, 0 as brouillon, 1 as catalog_actif, 'brouillon' as origin, IFNULL(tb.type, 'null') as type FROM catalog_brouillon cb LEFT JOIN type_principal_brouillon p ON p.brouillon_id = cb.id_brouillon LEFT JOIN brouillon_type_principal tb ON tb.	id_brouillon_type_p  = p.principal_id AND tb.type_actif = 1 ORDER BY id_catalogue, add_date LIMIT :offset, :limit";
        }else if($parametre['actif'] || $parametre['disable'] || $parametre['brouillon']){
            $prepar .= "NULL as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin, IFNULL(t.type, 'null') as type FROM catalog c LEFT JOIN type_principal_catalog p ON p.catalog_id = c.id_catalogue LEFT JOIN catalog_type_principal t ON t.id_type_principal = p.principal_id AND t.type_actif = 1";

            $where = " WHERE ";
            if($parametre['actif']){
                $where .= "catalog_actif=1";
            }
            if($parametre['disable']){
                if ($parametre['actif']) {
                    $where .= " OR ";
                }
                $where .= "catalog_actif=0";
            }
            if($parametre['brouillon']){
                if ($parametre['actif'] || $parametre['disable']) {
                    $where .= " OR ";
                }
                $where .= "brouillon=1";
                $prepar .= $where;
                $prepar .= " UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.saison, cb.publish_date, cb.add_date, NULL as likes, 0 as brouillon, 1 as catalog_actif, 'brouillon' as origin, IFNULL(tb.type, 'null') as type FROM catalog_brouillon cb LEFT JOIN type_principal_brouillon p ON p.brouillon_id = cb.id_brouillon LEFT JOIN brouillon_type_principal tb ON tb.	id_brouillon_type_p  = p.principal_id AND tb.type_actif = 1";
            }else{
                $prepar .= $where;
            }
            $prepar .= " ORDER BY id_catalogue, add_date LIMIT :offset, :limit";
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

    public static function nbCatalog($parametre) {
        $db = Database::dbConnect();
         $prepar = "SELECT COUNT(*) FROM ( SELECT nom FROM catalog ";
        if($parametre['allViews']){
            
            $prepar .= " UNION ALL SELECT nom FROM catalog_brouillon) AS combined_table";
        }else if($parametre['actif'] || $parametre['disable'] || $parametre['brouillon']){

            $where = " WHERE ";
            if($parametre['actif']){
                $where .= "catalog_actif=1";
            }
            if($parametre['disable']){
                if ($parametre['actif']) {
                    $where .= " OR ";
                }
                $where .= "catalog_actif=0";
            }
            if($parametre['brouillon']){
                if ($parametre['actif'] || $parametre['disable']) {
                    $where .= " OR ";
                }
                $where .= "brouillon=1";
                $prepar .= $where;
                $prepar .= " UNION ALL SELECT nom FROM catalog_brouillon) AS combined_table";
            }else{
                $prepar .= $where . ") AS combined_table";
            }
        }

        $request = $db->prepare($prepar);
        
        try {
            $request->execute();
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        } catch (PDOException $e) {
            $e->getMessage();
        }
    }

    public static function filtreCatalog($filtres, $limit, $offset, $parametre){
        $db = Database::dbConnect();

        $prepar = "SELECT ";
        if($parametre['allViews']){
            $prepar .= "NULL as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin, IFNULL(ctp.type, 'null') as type FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id LEFT JOIN type_principal_catalog tpc ON c.id_catalogue = tpc.catalog_id LEFT JOIN catalog_type_principal ctp ON tpc.principal_id = ctp.id_type_principal WHERE (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.saison, cb.publish_date, cb.add_date, NULL as likes, 0 as brouillon, 1 as catalog_actif, 'brouillon' as origin, IFNULL(ctp_brouillon.type, 'null') as type FROM catalog_brouillon cb LEFT JOIN type_principal_brouillon tpc_brouillon ON cb.catalog_id = tpc_brouillon.brouillon_id LEFT JOIN brouillon_type_principal ctp_brouillon ON tpc_brouillon.principal_id = ctp_brouillon.id_brouillon_type_p WHERE cb.nom LIKE CONCAT('%', :filtres, '%') ORDER BY id_catalogue, add_date LIMIT :offset, :limit;";
        }else if($parametre['actif'] || $parametre['disable'] || $parametre['brouillon']){
            $prepar .= "NULL as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin, IFNULL(ctp.type, 'null') as type FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id LEFT JOIN type_principal_catalog tpc ON c.id_catalogue = tpc.catalog_id LEFT JOIN catalog_type_principal ctp ON tpc.principal_id = ctp.id_type_principal";
            $where = " WHERE (";
            if($parametre['actif']){
                $where .= "catalog_actif=1";
            }
            if($parametre['disable']){
                if ($parametre['actif']) {
                    $where .= " OR ";
                }
                $where .= "catalog_actif=0";
            }
            if($parametre['brouillon']){
                if ($parametre['actif'] || $parametre['disable']) {
                    $where .= " OR ";
                }
                $where .= "brouillon=1";
                $prepar .= $where . " ) AND (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%'))";
                $prepar .= " UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.saison, cb.publish_date, cb.add_date, NULL as likes, 0 as brouillon, 1 as catalog_actif, 'brouillon' as origin, IFNULL(ctp_brouillon.type, 'null') as type FROM catalog_brouillon cb LEFT JOIN type_principal_brouillon tpc_brouillon ON cb.catalog_id = tpc_brouillon.brouillon_id LEFT JOIN brouillon_type_principal ctp_brouillon ON tpc_brouillon.principal_id = ctp_brouillon.id_brouillon_type_p WHERE cb.nom LIKE CONCAT('%', :filtres, '%')";
            }else{
                $prepar .= $where . " ) AND (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%'))";
            }
            $prepar .= " ORDER BY id_catalogue, add_date LIMIT :offset, :limit";
        }


        $request = $db->prepare($prepar);

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

   
    public static function nbFiltreCatalog($filtres, $parametre){
        $db = Database::dbConnect();

        $prepar = "SELECT COUNT(*) AS nbFiltre FROM ( SELECT nom FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE ";
        if($parametre['allViews']){
            
            $prepar .= "(a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) UNION ALL SELECT nom FROM catalog_brouillon cb WHERE cb.nom LIKE CONCAT('%', :filtres, '%')) AS combined_table";
        }else if($parametre['actif'] || $parametre['disable'] || $parametre['brouillon']){

            $where = " AND ";
            if($parametre['actif']){
                $where .= "catalog_actif=1";
            }
            if($parametre['disable']){
                if ($parametre['actif']) {
                    $where .= " OR ";
                }
                $where .= "catalog_actif=0";
            }
            if($parametre['brouillon']){
                if ($parametre['actif'] || $parametre['disable']) {
                    $where .= " OR ";
                }
                $where .= "brouillon=1";
                $prepar .= "((a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%'))) " . $where . "  UNION ALL SELECT nom FROM catalog_brouillon cb WHERE cb.nom LIKE CONCAT('%', :filtres, '%')) AS combined_table";
            }else{
                $prepar .= "((a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) " . $where . " ) ) AS combined_table;";
            }
        }

        $request = $db->prepare($prepar);

        try{
            $request->bindParam(':filtres', $filtres, PDO::PARAM_STR);
            $request->execute();
            $filtres = $request->fetch(PDO::FETCH_ASSOC);
            return $filtres;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    public static function catalogInfo($catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT *, t.type FROM catalog LEFT JOIN type_principal_catalog p ON p.catalog_id = id_catalogue  LEFT JOIN catalog_type_principal t ON t.id_type_principal = p.principal_id WHERE p.catalog_type_actif = 1 AND id_catalogue = ?");

        try{
            $request->execute(array($catalog_id));
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function brouilloninfo($brouillon_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM catalog_brouillon WHERE id_brouillon = ?");

        try{
            $request->execute(array($brouillon_id));
            $catalog = $request->fetch(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function episodeAll($catalog_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM (SELECT null as id_episode_brouillon, id_episode, catalog_id, nb_episode, title, dure, description, publish_date, add_date, brouillon, episod_actif, 'catalog' AS origin FROM episode UNION ALL SELECT id_episode_brouillon, null, catalog_id, nb_episode, title, dure, description, publish_date, add_date, null, null, 'brouillon' AS origin FROM episode_brouillon) AS combined_episodes WHERE catalog_id = ? ORDER BY nb_episode, add_date");

        try{
            $request->execute(array($catalog_id));
            $catalog = $request->fetchAll(PDO::FETCH_ASSOC);
            return $catalog;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
    
    public static function disabledEp($episode_id){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT episod_actif FROM `episode` WHERE id_episode = ?");
        $update = $db->prepare("UPDATE episode SET episod_actif = ? WHERE id_episode = ?");
        
        try{
            $request->execute(array($episode_id));
            $episod = $request->fetch(PDO::FETCH_ASSOC);
            $newEtat = ($episod['episod_actif'] == 1) ? 0 : 1; 
            $update->execute(array($newEtat, $episode_id));
            return $newEtat;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
}

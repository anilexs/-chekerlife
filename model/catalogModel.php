<?php
require_once "database.php";
class Catalog{
    public static function allCatalog(){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM `catalog`");

        try{
            $request->execute(array());
            $user = $request->fetchAll(PDO::FETCH_ASSOC);
            return $user;
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

}
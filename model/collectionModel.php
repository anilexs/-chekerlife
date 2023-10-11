<?php
require_once "database.php";
class Collection{
    public static function collection($id_catalog){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM collections WHERE collections_name = (SELECT collections_name FROM collections WHERE catalog_id = ?)");

        try{
            $request->execute(array($id_catalog));
            $collections = $request->fetchAll(PDO::FETCH_ASSOC);
            return $collections;
        }catch(PDOException $e){
            $e->getMessage();
        }
    }
}
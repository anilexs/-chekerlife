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
    }

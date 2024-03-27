<?php 
require_once "database.php";
// define("DOMAINNAME", "localhost");
// define("host", "http://localhost/!chekerlife/");
class Tcg{
    public static function tcg() {
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT * FROM tcg WHERE tcg_brouillon = 0 AND tcg_actif = 1");
        try {
            $request->execute();
            $tcg = $request->fetchAll(PDO::FETCH_ASSOC);
            return $tcg;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
?>
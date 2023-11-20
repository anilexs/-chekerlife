<?php
require_once "database.php";
require_once "catalogModel.php";
define("DOMAINNAME", "localhost");
define("host", "http://localhost/!chekerlife/");

class User{
    public static function Nombre_comptes_créés_jour($day){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT heures.heure, COUNT(u.created_at) AS nombre_dutilisateurs FROM ( SELECT 0 AS heure UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 ) heures LEFT JOIN users u ON HOUR(u.created_at) = heures.heure AND u.created_at >= ? AND u.created_at < ? + INTERVAL 1 DAY GROUP BY heures.heure ORDER BY heures.heure;");
        try {
            $request->execute(array($day, $day));
            $userActif = $request->fetch(PDO::FETCH_ASSOC);
            return $userActif;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
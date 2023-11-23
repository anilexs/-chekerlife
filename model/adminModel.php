<?php
require_once "database.php";
require_once "catalogModel.php";

class Admin{
    public static function nombre_dutilisateurs_total(){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT DATE_FORMAT(u.created_at, '%Y/%m/%d') AS jour, (SELECT COUNT(*) FROM users u1 WHERE u1.created_at <= u.created_at) AS total_utilisateurs, (SELECT COUNT(*) FROM users u2 WHERE u2.created_at <= u.created_at AND u2.role = 'member') AS membres, (SELECT COUNT(*) FROM users u3 WHERE u3.created_at <= u.created_at AND u3.role = 'beta-testeur') AS beta_testers, (SELECT COUNT(*) FROM users u4 WHERE u4.created_at <= u.created_at AND u4.role = 'admin') AS admins, (SELECT COUNT(*) FROM users u5 WHERE u5.created_at <= u.created_at AND u5.role = 'owner') AS owners FROM users u WHERE u.created_at >= '2022-01-01' GROUP BY jour ORDER BY jour");

        try {
            $request->execute();
            $nombre_dutilisateurs = $request->fetchAll(PDO::FETCH_ASSOC);
            return $nombre_dutilisateurs;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public static function nombre_comptes_créés_last_24h($date){
        $db = Database::dbConnect();
        $request = $db->prepare("SELECT heures.heure, COUNT(u.created_at) AS nombre_dutilisateurs FROM (SELECT 0 AS heure UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23) heures LEFT JOIN users u ON HOUR(u.created_at) = heures.heure AND u.created_at >= ? AND u.created_at < ? + INTERVAL 1 DAY GROUP BY heures.heure ORDER BY heures.heure;");

        try {
            $request->execute(array($date, $date));
            $nombre_comptes_crees_jour = $request->fetchAll(PDO::FETCH_ASSOC);
            return $nombre_comptes_crees_jour;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}
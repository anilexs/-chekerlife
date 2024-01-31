index

catalog :
SELECT * FROM catalog WHERE brouillon = 0 AND catalog_actif = 1 ORDER BY add_date DESC LIMIT 10;
tcg :
SELECT * FROM tcg WHERE tcg_brouillon = 0 AND tcg_actif = 1 ORDER BY created_at DESC LIMIT 10;

<!--  -->


exenple de bare de recherche : 
select * from nom_de_la_table where nom_colone like '%dghjkg%'; 
SELECT * FROM `users` WHERE pseudo LIKE '%ex%';

FILTRAGE
SELECT * FROM `catalog` WHERE type = 'films' OR type = 'drama'
 $request = $db->prepare("SELECT DISTINCT c.* FROM catalog c LEFT JOIN alias a ON c.id_catalogue = a.catalog_id WHERE a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%')");

// requette pour fair les collection par 1 id
SELECT *
FROM collections
WHERE collections_name = (SELECT collections_name FROM collections WHERE catalog_id = '7');

PAGINATION je pe pe etre uriliser
SELECT * FROM catalog LIMIT 5 OFFSET 8;


catalog php foreacH

<?php foreach($catalog as $catalogItem){ ?>
        <div class="card">
            <?php
            $isActive = false;
            if(isset($_COOKIE['user_id'])){
                foreach($userLike as $like){
                    if($like['catalog_id'] == $catalogItem["id_catalogue"] && $like['active'] == 1){
                        $isActive = true;
                        break;
                    }
                }
            }
            ?>
            <button class="like <?php echo $isActive ? 'activeTrue' : 'activeFalse'; ?>" id="<?= $catalogItem["id_catalogue"] ?>" onclick="like(<?= $catalogItem["id_catalogue"] ?>)">
                <i class="fa-solid fa-heart"></i>
            </button>
            <a href="list/<?= $catalogItem["nom"] ?>">
                <img src="asset/img/<?= $catalogItem["image_catalogue"] ?>" alt="">
            </a>
        </div>
    <?php } ?>

    
// foreach catalog

$(document).ready(function() {
    // Fonction pour générer le contenu HTML
    function generateCatalog() {
        var container = $('#catalog');
        container.empty(); // Effacer le contenu précédent s'il y en a

        $.each(catalog, function(index, catalogItem) {
            var isActive = false;

            // Votre logique pour vérifier si l'élément est actif ici
            if (typeof userLike !== 'undefined') {
                $.each(userLike, function(index, like) {
                    if (like['catalog_id'] == catalogItem.id_catalogue && like['active'] == 1) {
                        isActive = true;
                        return false; // Sortir de la boucle
                    }
                });
            }

            var likeClass = isActive ? 'activeTrue' : 'activeFalse';

            var cardHtml = `
                <div class="card">
                    <button class="like ${likeClass}" id="${catalogItem.id_catalogue}" onclick="like(${catalogItem.id_catalogue})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                    <a href="list/${catalogItem.nom}">
                        <img src="asset/img/${catalogItem.image_catalogue}" alt="">
                    </a>
                </div>
            `;

            container.append(cardHtml); // Ajouter la carte au conteneur
        });
    }

    // Appeler la fonction pour générer le contenu initial
    generateCatalog();
});

// code pour les dernier sortie sur le site 
SELECT * FROM catalog ORDER BY last_add DESC LIMIT 8;

// code pour les episode 
SELECT * FROM episode WHERE catalog_id = (SELECT id_catalogue FROM catalog WHERE id_catalogue = ?);
code pour les episode par leur numero despisode (obliger de metre me ; a la fin de la requette si non ca mais null)
(SELECT e.* FROM episode e JOIN catalog c ON e.catalog_id = c.id_catalogue WHERE c.id_catalogue = ? ORDER BY e.nb_episode ASC;);


requpere le get de lurl en jquery

// var urlParams = new URLSearchParams(window.location.search);
// var page = urlParams.get("page");

<!-- token -->
recupere les info utilisater par le token

SELECT users.* 
FROM users
JOIN token ON users.id_user = token.user_id
WHERE token.token = '3MIE*9cpTPOe0lEmNT420uT*jTgi.6aj' AND token.active = 1;

recupere tout les info de lutilisater + le token 
SELECT users.*, token.token FROM users LEFT JOIN token ON users.id_user = token.user_id AND token.active = 1 WHERE users.email = ?

recupere id user par le token
SELECT * FROM `users` LEFT JOIN token ON id_user = token.user_id WHERE token.token = "alexis" AND token.token_active = 1

requette pour les chekbox a metre en plase pour les etat en cour terminer etc ( fais )
INSERT INTO `catalog_progression`(`user_id`, `catalog_id`, `etat`) SELECT token.user_id, ?, ? FROM token WHERE token.token = ? AND token.token_active = 1;


recupere les contre cre avec une valer soit minut heur jour mois et annes

jour :
SELECT COUNT(*) 
FROM users
WHERE created_at >= CURDATE() - INTERVAL 5 DAY;

heur : 
SELECT COUNT(*) 
FROM users
WHERE created_at >= NOW() - INTERVAL 5 HOUR;

minut : 
SELECT COUNT(*) 
FROM users
WHERE created_at >= NOW() - INTERVAL 30 MINUTE;

mois : 
SELECT COUNT(*) 
FROM users
WHERE created_at >= NOW() - INTERVAL 3 MONTH;

anne :
SELECT COUNT(*)
FROM users
WHERE created_at >= NOW() - INTERVAL 2 YEAR;


grafice : 
<!-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"></script> -->
<!-- <div style="width: 80%;">
        <canvas id="myChart"></canvas>
    </div> -->
    <?php
        // Exemple de données (à remplacer par vos propres données de base de données)
        // $donnees = [
        //     ["date_creation" => "2023-01-01", "nombre_contes" => 15],
        //     ["date_creation" => "2023-02-01", "nombre_contes" => 25],
        //     ["date_creation" => "2023-03-01", "nombre_contes" => 30],
        //     // Ajoutez d'autres données au besoin
        // ];
    ?>
    <!-- <script>
        // Convertir les données PHP en format utilisable par JavaScript
        var donnees = <?php echo json_encode($donnees); ?>;

        // Préparer les tableaux pour les étiquettes de l'axe X et les données de l'axe Y
        var dates = [];
        var nombreContes = [];

        // Remplir les tableaux avec les données converties
        var interval = 3;  // Période entre chaque libellé en mois
    for (var i = 0; i < donnees.length; i++) {
        var date = new Date(donnees[i].date_creation);
        var mois = date.toLocaleString('default', { month: 'long' });
        var label = donnees[i].nombre_contes + ' contes ' + mois;  // Personnalisez le libellé comme vous le souhaitez
        dates.push(label);
        nombreContes.push(donnees[i].nombre_contes);

        // Ajouter des libellés personnalisés tous les 'interval' mois
        if (i > 0 && (i + 1) % interval === 0) {
            var periode = (i + 1) / interval;
            dates[i] = periode + ' ' + (periode > 1 ? 'mois' : 'mois');
        }
    }

    // Configuration du graphique
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Nombre de contes',
                data: nombreContes,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    // type: 'time',  // Ne pas utiliser 'time' si vous personnalisez les libellés
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    }); -->

    recupere les utilisater des 24 dernier heur :
CREATE TEMPORARY TABLE toutes_heures (heure INT);


INSERT INTO toutes_heures (heure) VALUES (0),(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23);


SELECT
    h.heure,
    COUNT(u.created_at) AS nombre_dutilisateurs
FROM
    toutes_heures h
LEFT JOIN
    users u ON HOUR(u.created_at) = h.heure AND u.created_at >= NOW() - INTERVAL 24 HOUR
GROUP BY
    h.heure
ORDER BY
    h.heure;

DROP TEMPORARY TABLE IF EXISTS toutes_heures;

v2 avec date
-- Remplacer '2023-11-20' par la date souhaitée
SET @date_specifique = '2023-11-20';

SELECT
    heures.heure,
    COUNT(u.created_at) AS nombre_dutilisateurs
FROM (
    SELECT 0 AS heure UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
    SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION
    SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION
    SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
) heures
LEFT JOIN
    users u ON HOUR(u.created_at) = heures.heure AND u.created_at >= @date_specifique AND u.created_at < @date_specifique + INTERVAL 1 DAY
GROUP BY
    heures.heure
ORDER BY
    heures.heure;


la requette que jais besoin avec 2 fois le parametre de date

SELECT
        heures.heure,
        COUNT(u.created_at) AS nombre_dutilisateurs
    FROM (
        SELECT 0 AS heure UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION
        SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION
        SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION
        SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
    ) heures
    LEFT JOIN
        users u ON HOUR(u.created_at) = heures.heure AND u.created_at >= ? AND u.created_at < ? + INTERVAL 1 DAY
    GROUP BY
        heures.heure
    ORDER BY
        heures.heure;
"


requette de statistique total
SELECT DATE_FORMAT(u.created_at, '%Y/%m/%d') AS jour, (SELECT COUNT(*) FROM users u1 WHERE u1.created_at <= u.created_at) AS total_utilisateurs, (SELECT COUNT(*) FROM users u2 WHERE u2.created_at <= u.created_at AND u2.role = 'member') AS membres, (SELECT COUNT(*) FROM users u3 WHERE u3.created_at <= u.created_at AND u3.role = 'beta-testeur') AS beta_testers, (SELECT COUNT(*) FROM users u4 WHERE u4.created_at <= u.created_at AND u4.role = 'admin') AS admins, (SELECT COUNT(*) FROM users u5 WHERE u5.created_at <= u.created_at AND u5.role = 'owner') AS owners, COUNT(u.created_at) AS nombre_dutilisateurs_jour, SUM(CASE WHEN u.role = 'member' THEN 1 ELSE 0 END) AS total_membres_jour, SUM(CASE WHEN u.role = 'beta-testeur' THEN 1 ELSE 0 END) AS total_beta_testers_jour, SUM(CASE WHEN u.role = 'admin' THEN 1 ELSE 0 END) AS total_admins_jour, SUM(CASE WHEN u.role = 'owner' THEN 1 ELSE 0 END) AS total_owners_jour FROM users u WHERE u.created_at >= '2022-01-01' GROUP BY jour ORDER BY jour


pour le textarea :
wysiwyg

requette pour la recherche admin :
SELECT null as id_brouillon, id_catalogue, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, likes, brouillon, catalog_actif FROM catalog UNION SELECT id_brouillon, catalog_id, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, null, null, null FROM catalog_brouillon ORDER BY id_catalogue;

inversion

SELECT null as id_brouillon, id_catalogue, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, likes, brouillon, catalog_actif, 'catalog' as origin FROM catalog UNION ALL SELECT id_brouillon, catalog_id, image_catalogue, last_img, nom, description, type, saison, publish_date, add_date, null, null, null, 'brouillon' as origin FROM catalog_brouillon ORDER BY id_catalogue;

ancien c atalog filtre
SELECT DISTINCT c.* FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE brouillon = 0 AND catalog_actif = 1 AND (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%'))


new catalog filtre 
SELECT null as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.type, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.type, cb.saison, cb.publish_date, cb.add_date, null, 0, 1, 'brouillon' as origin FROM catalog_brouillon cb WHERE cb.nom LIKE CONCAT('%', :filtres, '%') ORDER BY id_catalogue, add_date LIMIT :offset, :limit


echo "var_dump(" . var_export($catalog, true) . ");";

// SELECT DISTINCT c.* FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE brouillon = 0 AND catalog_actif = 1 AND (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) LIMIT :offset, :limit
        // $request = $db->prepare("SELECT null as id_brouillon, c.id_catalogue, c.image_catalogue, c.last_img, c.nom, c.description, c.type, c.saison, c.publish_date, c.add_date, c.likes, c.brouillon, c.catalog_actif, 'catalog' as origin FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) UNION ALL SELECT cb.id_brouillon, cb.catalog_id, cb.image_catalogue, cb.last_img, cb.nom, cb.description, cb.type, cb.saison, cb.publish_date, cb.add_date, null, 0, 1, 'brouillon' as origin FROM catalog_brouillon cb WHERE cb.nom LIKE CONCAT('%', :filtres, '%') ORDER BY id_catalogue, add_date LIMIT :offset, :limit");

        requette ancien pour nbCountFiltre
        SELECT COUNT(DISTINCT c.id_catalogue) AS nbFiltre FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE brouillon = 0 AND catalog_actif = 1 AND (a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%'))

        new requette

        SELECT COUNT(*) AS total_count FROM ( SELECT nom FROM catalog c LEFT JOIN catalog_alias a ON c.id_catalogue = a.catalog_id WHERE (a.aliasName LIKE CONCAT('%', :filtres, '%') OR c.nom LIKE CONCAT('%', :filtres, '%')) UNION ALL SELECT nom FROM catalog_brouillon cb WHERE cb.nom LIKE CONCAT('%', :filtres, '%')) AS combined_table;


requette a continuer : 
SELECT title FROM episode UNION ALL SELECT title FROM episode_brouillon ORDER BY nb_episode
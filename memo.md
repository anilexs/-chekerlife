exenple de bare de recherche : 
select * from nom_de_la_table where nom_colone like '%dghjkg%'; 
SELECT * FROM `users` WHERE pseudo LIKE '%ex%';

FILTRAGE
SELECT * FROM `catalog` WHERE type = 'films' OR type = 'drama'
 $request = $db->prepare("SELECT DISTINCT c.* FROM catalog c LEFT JOIN alias a ON c.id_catalogue = a.catalog_id WHERE a.aliasName LIKE CONCAT('%', ?, '%') OR c.nom LIKE CONCAT('%', ?, '%')");

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

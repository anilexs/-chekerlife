<?php 
// URL de l'API Pokémon TCG pour récupérer les ensembles en français
$api_key = 'c999f4f6-d22a-43ef-8fb1-61e176e219b7';
$url_sets_fr = 'https://api.pokemontcg.io/v2/sets?language=fr';
$url_sets_fr .= '&X-Api-Key=' . $api_key;

// Récupération des ensembles depuis l'API
$collection = file_get_contents($url_sets_fr);

// // Vérification de la réponse
// if ($response_sets_fr === false) {
    //     echo 'Erreur lors de la récupération des ensembles en français depuis l\'API.';
    // } else {
        // Conversion de la réponse JSON en tableau associatif
        $collection = json_decode($collection, true);
        // echo "<pre>";
        // var_dump($collection);
        // echo "</pre>";

    // Regrouper les bloc
    $blocks = array();
    foreach ($collection['data'] as $set) {
        $block = $set['series'];
        if (!isset($blocks[$block])) {
            $blocks[$block] = array();
        }
        $blocks[$block][] = $set;
    }
    // echo "<pre>";
    // var_dump($blocks);
    // echo "</pre>";

//     // Affichage des ensembles par bloc
    // foreach ($blocks as $block_name => $block_sets) {
    //     echo '<h2>' . $block_name . '</h2>';
    //     echo '<ul>';
    //     foreach ($block_sets as $set) {
    //         echo '<li><a href="?set=' . urlencode($set['id']) . '">' . $set['name'] . '</a></li>';
    //     }
    //     echo '</ul>';
    // }

    // Vérifier si un ensemble est sélectionné
    // if (isset($_GET['set'])) {
    //     // Récupérer l'ID de l'ensemble sélectionné
    //     $selected_set_id = $_GET['set'];

    //     // URL de l'API Pokémon TCG pour récupérer les cartes de l'ensemble sélectionné
    //     $url_cards_set = 'https://api.pokemontcg.io/v2/cards?set=' . urlencode($selected_set_id);
    //     $url_cards_set .= '&X-Api-Key=' . $api_key;

    //     // Récupération des cartes de l'ensemble sélectionné depuis l'API
    //     $response_cards_set = file_get_contents($url_cards_set);

    //     // Vérification de la réponse
    //     if ($response_cards_set === false) {
    //         echo 'Erreur lors de la récupération des cartes de l\'ensemble depuis l\'API.';
    //     } else {
    //         // Conversion de la réponse JSON en tableau associatif
    //         $cards_data_set = json_decode($response_cards_set, true);

    //         // Affichage des cartes de l'ensemble sélectionné
    //         echo '<h2>Cartes de l\'Ensemble Sélectionné</h2>';
    //         echo '<ul>';
    //         foreach ($cards_data_set['data'] as $card) {
    //             echo '<li>' . $card['name'] . '</li>';
    //         }
    //         echo '</ul>';
    //     }
    // }
// }
require_once "../../inc/header.php"; ?>
<link rel="stylesheet" href="../../asset/css/pokemon.css">
<script src="../../asset/js/pokemon.js" defer></script>
<title>pokemon</title>
<?php require_once "../../inc/nav.php"; ?>
<div class="controller">
    <div class="block">
    <?php foreach (array_reverse($blocks) as $block_name => $block_sets) { ?>
        <!-- <select name="" id="">
            <option value=""></option>
        </select> -->
        <!-- <h2><?= $block_name ?></h2>
        <ul>
        <?php foreach ($block_sets as $set) { ?>
            <li><a href="?set=' . urlencode($set['id']) . '"><?= $set['name'] ?></a></li>
        <?php } ?>
        </ul> -->
    <?php } ?>
    </div>
</div>
<?php require_once "../../inc/footer.php"; ?>
function catalogViews() {
    $.ajax({
        url: 'traitement/ajax.php',
        type: 'POST',
        data: {
            action: "catalog",
        },
        dataType: 'html',
        success: function (response) {
            $('#catalog').html(response);
        },
        error: function (xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function catalogFiltre($filtre){
    $.ajax({
        url: 'traitement/ajax.php', 
        type: 'POST',
        data: {
            action: "filtre",
            filtre: $filtre,
        },
        dataType: 'html',
        success: function(response) {
            $('#catalog').html(response);
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

$(document).ready(function () {
    ftrSize(); // Appel initial de la fonction

    $(window).on('resize', function () {
        // Appelez la fonction lorsqu'il y a un redimensionnement de la fenêtre
        ftrSize();
    });

    $("#rechercherCategorie").on("input", function (event) {
        var searchTerm = $(this).val();
        $("#catalog").html("");
        if (searchTerm === "") {
            catalogViews();
        } else {
            catalogFiltre(searchTerm);
        }
        ftrSize();
    });
});



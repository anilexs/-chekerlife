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
    $("#rechercherCategorie").on("input", function(event) {
        var searchTerm = $(this).val();
        $("#catalog").html("");
        switch(searchTerm){ 
            case "":
                catalogViews();
                break
            default:
                catalogFiltre(searchTerm);
                break
        }
    });
});

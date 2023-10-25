

function catalogViews(offset) {
    limit = 81;
    offset = 0;
    
    $.ajax({
        url: 'traitement/ajax.php',
        type: 'POST',
        data: {
            action: "catalog",
            limit: limit,
            offset: offset,
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
    var urlParams = new URLSearchParams(window.location.search);
    var titre = urlParams.get("titre");
    if (titre) {
        catalogFiltre(titre);
    }

    $("#rechercherCategorie").on("input", function (event) {
        var searchTerm = $(this).val();
        $("#catalog").html("");
        if (searchTerm === "") {
            catalogViews();
            removeTitreParameter(searchTerm);
        } else {
            catalogFiltre(searchTerm);
            updateURL(searchTerm);
        }
        ftrSize();
    });

    function updateURL(searchTerm) {
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.set("titre", searchTerm);
        var newURL = window.location.pathname + "?titre=" + searchTerm;
        urlParams.forEach(function (value, key) {
            if (key !== "titre") {
                newURL += "&" + key + "=" + value;
            }
        });
        window.history.replaceState(null, "", newURL);
    }


    function removeTitreParameter() {
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.delete("titre");
        if (urlParams.toString() === "") {
            window.history.replaceState(null, "", window.location.pathname);
        } else {
            var newURL = window.location.pathname + "?" + urlParams.toString();
            window.history.replaceState(null, "", newURL);
        }
    }
});



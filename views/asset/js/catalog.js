function catalogViews(offset, limit = 81) {
    offset -= 1;
    limit = 81;
    $("#pagination").html("");
    $.ajax({
        url: host + "controller/CatalogAjaxController.php",
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

function catalogFiltre(filtre, offset = 1, limit = 81){
    
    offset -= 1;    
    offset *= 81;

    $("#pagination").html("");
    $.ajax({
        url: host + "controller/CatalogAjaxController.php", 
        type: 'POST',
        data: {
            action: "filtre",
            filtre: filtre,
            limit: limit,
            offset: offset,
        },
        dataType: 'html',
        success: function(response) {
            $('#catalog').html(response);
            ftrSize();
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function pagination(nbElement) {
    var urlParams = new URLSearchParams(window.location.search);
    var filtre = urlParams.get("titre");
    var page = urlParams.get("page");
    $.ajax({
        url: host + "controller/CatalogAjaxController.php", 
        type: 'POST',
        data: {
            action: "pagination",
            nbElement: nbElement,
            page: page,
            filtre: filtre,
        },
        dataType: 'html',
        success: function(response) {
            $('#pagination').html(response);
            ftrSize();
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function edite(catalog_id){
    $.ajax({
        url: host + "controller/CatalogAjaxController.php", 
        type: 'POST',
        data: {
            action: "cataloginfo",
            catalog_id: catalog_id,
        },
        dataType: 'json',
        success: function(response) {
            console.log(response['cataloginfo']);

            var back = $('<div class="editeBack"></div>');
            var edite = $('<div class="editeContenaire"></div>');
            var left = $('<div class="left"></div>');
            var right = $('<div class="right"></div>');
            var nom = $('<input type="text" id="nom" value="' + response['cataloginfo']['nom'] +'">');
            var description = $('<textarea id="story" name="story">'+ response['cataloginfo']['description'] +'</textarea>');
            var submit = $('<button class="submit">enregistré</button>');

            var img = $('<div class="catalogimg"></div>');
            img.css('background-image', 'url("../asset/img/catalog/' + response['cataloginfo']['image_catalogue'] + '")');
            $('body').css('overflow', 'hidden');

            
           // Ajouter la div au corps de la page (ou à un autre élément de votre choix)
           $("body").prepend(back, edite);
           $(edite).prepend(right);
           $(edite).prepend(left);
           $(left).prepend(nom, description, submit);
           $(right).prepend(img);
       
           $('.editeBack').on("click", () =>{
               $('body').css('overflow', '');
               $('.editeBack, .editeContenaire').remove();
           })
           
           $('.submit').on("click", () =>{
                var nom = $('#nom').val();
                console.log(nom);
           })
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

$(document).ready(function () {
    ftrSize();
    var urlParams = new URLSearchParams(window.location.search);
    var titre = urlParams.get("titre");
    var page = urlParams.get("page");
    if (titre) {
        if(page == null){
            page = 1;
        }
        catalogFiltre(titre, page);
    }

    $("#rechercherCategorie").on("input", function (event) {
        var searchTerm = $(this).val();
        $("#pagination").html("");
        $("#catalog").html("");
        if (searchTerm === "") {
            catalogViews();
            removeGetParameter("titre");
            removeGetParameter("page");
        } else {
            page = 1;
            removeGetParameter("page");
            catalogFiltre(searchTerm, page);
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


    function removeGetParameter(get) {
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.delete(get);
        if (urlParams.toString() === "") {
            window.history.replaceState(null, "", window.location.pathname);
        } else {
            var newURL = window.location.pathname + "?" + urlParams.toString();
            window.history.replaceState(null, "", newURL);
        }
    }
});



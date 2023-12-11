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
            console.log(response['type']);
            
            var back = $('<div class="editeBack"></div>');
            var edite = $('<div class="editeContenaire"></div>');

            var controler = $('<div class="editeControler"></div>');
                controler.append('<button class="move"><i class="fa-solid fa-minus"></i></button>');
                controler.append('<button class="reload"><i class="fa-solid fa-rotate-right"></i></button>');
                controler.append('<button class="close"><i class="fa-solid fa-xmark"></i></button>');

                $("body").append(controler);

            var left = $('<div class="left"></div>');
            var right = $('<div class="right"></div>');
            


            var contenaireType = $('<div class="contenaireType"></div>');

            var form = $('<form id="catalogForm"></form>');
                form.append('<input type="text" id="nom" value="' + response['cataloginfo']['nom'] +'">');
                form.append('<input type="date" id="date" value="' + response['cataloginfo']['publish_date'] +'">');
                form.append('<textarea id="description" name="story">'+ response['cataloginfo']['description'] +'</textarea>');
                form.append('<input type="text" id="saison" placeholder="' + response['cataloginfo']['saison'] +'">');

            var type = $('<select name="type" id="type"></select>');
                type.append('<option value="option1">ajouter un type</option>');
                type.append('<option value="' + response['cataloginfo']['type'] +'" selected>' + response['cataloginfo']['type'] +'</option>');

                response['type'].forEach(typeCatalog => {
                    if(response['cataloginfo']['type'] != typeCatalog['type']){
                        type.append('<option value="'+ typeCatalog['type'] +'">'+ typeCatalog['type'] +'</option>');
                    }
                });

                contenaireType.append(type);
                form.append(contenaireType);
                
                var formController = $('<div class="formController"></div>');
                formController.append('<button class="enregistre">enregistré</button>');
                formController.append('<button class="brouillon">brouillon</button>');
                formController.append('<button class="desactiver">désactiver</button>');
                form.append(formController);


            var img = $('<div class="catalogimg"></div>');
                img.css('background-image', 'url("../asset/img/catalog/' + response['cataloginfo']['image_catalogue'] + '")');
                $('body').css('overflow', 'hidden');

            
           $("body").prepend(back, edite);
           $(edite).prepend(right);
           $(edite).prepend(left);
           $(left).prepend(form);
           $(right).prepend(img);

       
            $('.move').on("click", () => {
                $("a").click(function(event) {
                    event.preventDefault();
                    alert("L'exécution de la balise a est bloquée en raison de la condition.");
                });
                
                $('body').css('overflow', '');
                $('.move, .reload, .close').prop('disabled', true);
                
                var clone = $('.editeContenaire').clone();
                clone.removeClass('editeContenaire');
                clone.attr('id', 'clone');

                $('.editeBack, .editeContenaire, .editeControler').css({
                    "display": "none",
                });
            
                // Ajouter le clone à votre document
                $('body').append(clone);
            
                // Animation de la taille du clone
                clone.animate({
                    width: "7%",
                    height: "11%",
                    top: "100%",
                    left: "0",
                    opacity: "0",
                }, 1000, function () {
                    console.log("Animation zigzag terminée !");
                    clone.remove();
                    $('body').prepend('<button id="moveBtn"><i class="fa-solid fa-newspaper"></i></button>');
                    $('#moveBtn').on("click", () =>{
                        $('#moveBtn').remove();
                        $("a").off("click");
                    })
                });

            });

           $('.reload').on("click", () =>{
               $('#nom').val(response['cataloginfo']['nom']);
               $('#date').val(response['cataloginfo']['publish_date']);
               $('#description').val(response['cataloginfo']['description']);
               $('#saison').val('');
               $('#type').val(response['cataloginfo']['type']);
           })


           $('.editeBack, .close').on("click", () =>{
               $('body').css('overflow', '');
               $('.editeBack, .editeContenaire, .editeControler').remove();
           })
           
           
            $('#saison').on('change', function() {
                if (isNaN($('#saison').val()) || $('#saison').val() < 0) {
                    $('#saison').val('');
                }
            });
           
            type.on('change', function() {
                console.log(type.val());
            });


           $('.enregistre').on("click", function(e) {
                e.preventDefault();
                var nom = $('#nom').val();
                var date = $('#date').val();
                var story = $('#description').val();
                console.log(date);
           })
           
           $('.brouillon').on("click", function(e) {
                e.preventDefault();
           })
           $('.desactiver').on("click", function(e) {
                e.preventDefault();
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



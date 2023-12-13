var editBtnActif = true;

function catalogViews(offset, limit = 81) {
    offset -= 1;
    limit = 81;
    $("#pagination").html("");
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php",
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
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
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
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
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

function editeCode(catalog_id){
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
        type: 'POST',
        data: {
            action: "cataloginfo",
            catalog_id: catalog_id,
        },
        dataType: 'json',
        success: function(response) {
            editBtnActif = false
            
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
            var typeContenaire = $('<div class="typeContenaire"></div>');
                typeContenaire.append('<input type="text" id="saison" placeholder="' + response['cataloginfo']['saison'] +'">');
                form.append(typeContenaire);
            var type = $('<select name="type" id="type"></select>');
                type.append('<option value="addType">ajouter un type</option>');
                type.append('<option value="' + response['cataloginfo']['type'] +'" selected>' + response['cataloginfo']['type'] +'</option>');
            
                
                response['type'].forEach(typeCatalog => {
                    if(response['cataloginfo']['type'] != typeCatalog['type']){
                        type.append('<option value="'+ typeCatalog['type'] +'">'+ typeCatalog['type'] +'</option>');
                    }
                });
                
                var TypeSeconder = $('<div class="TypeSeconder"></div>');
                var TypeInputeContenaire = $('<div class="TypeInputeContenaire"></div>');
                    TypeInputeContenaire.append('<h1 class="labelTypeSeconder">Ajouter un type seconder ?</h1>');
                    TypeInputeContenaire.append('<input type="text" id="inputeType" autocomplete="off">');

                var contenaireSeconderType = $('<div class="contenaireSeconderType"></div>');
                
                    response['allType'].forEach(typeCatalog => {
                        contenaireSeconderType.append('<div class="seconderTypeDiv"><span class="spanTxtType"><div class="removeType"><i class="fa-solid fa-xmark"></i></div>' + typeCatalog['type'] + '</span></div>');
                    });
                
                    // $(document).on("click", '.removeType', function(e) {
                        // });
                        
                        $(document).on('click', '.removeType', function(e) {
                            e.preventDefault();
                            console.log("click"); // Ajout de guillemets autour du texte à logguer
                            $(this).closest('.seconderTypeDiv').remove();
                        });

                
                    TypeSeconder.append(TypeInputeContenaire);
                    TypeSeconder.append(contenaireSeconderType);
                    
                    $(document).on("keyup", '#inputeType', function(e) {
                        if(e.key === "Enter"){  
                            console.log("entre");
                            contenaireSeconderType.append('<div class="seconderTypeDiv"><span class="spanTxtType"><div class="removeType"><i class="fa-solid fa-xmark"></i></div>' + $(this).val() + '</span></div>');
                        }else{
                            console.log("Contenu de l'inputeType :", $(this).val());
                        }
                    });
                    
                
                contenaireType.append(type);
                form.append(contenaireType);
                form.append(TypeSeconder);
                
                var formController = $('<div class="formController"></div>');
                formController.append('<button class="enregistre">enregistré</button>');
                formController.append('<button class="brouillon">brouillon</button>');
                formController.append('<button class="desactiver">désactiver</button>');
                form.append(formController);


            var img = $('<div class="catalogimg"></div>');
                img.css('background-image', 'url("../asset/img/catalog/' + response['cataloginfo']['image_catalogue'] + '")');
                $('body').css('overflow', 'hidden');

            
           $("body").prepend(back, edite);
           edite.prepend(right);
           edite.prepend(left);
           left.prepend(form);
           right.prepend(img);

       
            $('.move').on("click", () => {
                $("a").click(function(e) {
                    $('body').css('overflow', 'hidden');
                    e.preventDefault();
                    var destination = $(this).attr("href");

                    exitBack = $('<div class="exitBack"></div>');
                    exit = $('<div class="exit"></div>');
                    txt = $('<div class="exitTxTContenner"></div>');
                    txt.append('<h2 class="exitTXT">Vous avez des modifications mises sur le côté. Que voulez-vous faire ? Voulez-vous afficher la page de modification en cours, rester sur la page actuelle ou poursuivre la navigation vers la page cliquée ?</h2>');
                    exit.append(txt);
                    exitControler = $('<div class="exitControler"></div>');
                    exitControler.append('<button class="aficher">Afficher les modification</button>');
                    exitControler.append('<button class="rester">Rester sur la page</button>');
                    exitControler.append('<button class="continuer">Continuer la navigation</button>');
                    $(exit).append(exitControler);
                    $("body").prepend(exitBack);
                    $("body").prepend(exit);

                    $('.exitBack, .rester').on("click", () =>{
                        $('.exit, .exitBack').remove();
                        $('body').css('overflow', '');
                    })

                    $('.aficher').on("click", () =>{
                        $('.exit, .exitBack').remove();
                        $('#moveBtn').remove();
                        $("a").off("click");
                        $('.editeContenaire').css({
                            "display": "",
                            "zIndex": 5
                        });

                        $('.editeContenaire').animate({
                            width: "90%",
                            height: "85%",
                            top: "50%",
                            left: "50%",
                            opacity: "1",
                        }, function () {
                            $('.move, .reload, .close').prop('disabled', false);
                            $('.editeBack, .editeControler').css({
                                "display": "",
                            });
                        })
                    })
                    $('.continuer').on("click", () =>{
                        window.location.href = destination;
                    })
                });

                
                $('body').css('overflow', '');
                $('.move, .reload, .close').prop('disabled', true);

                $('.editeBack, .editeControler').css({
                    "display": "none",
                });
            
                
                $('.editeContenaire').animate({
                    width: "7%",
                    height: "11%",
                    top: "100%",
                    left: "0",
                    opacity: "0",
                }, 1000, function () {
                    $('.editeContenaire').css({
                        "display": "none",
                    });
                    $('body').prepend('<button id="moveBtn"><i class="fa-solid fa-newspaper"></i></button>');

                    $('#moveBtn').on("click", () =>{
                        $('body').css('overflow', 'hidden');
                        $('#moveBtn').remove();
                        $("a").off("click");
                        $('.editeContenaire').css({
                            "display": "",
                            "zIndex": 5
                        });

                        $('.editeContenaire').animate({
                            width: "90%",
                            height: "85%",
                            top: "50%",
                            left: "50%",
                            opacity: "1",
                        }, function () {
                            $('.move, .reload, .close').prop('disabled', false);
                            $('.editeBack, .editeControler').css({
                                "display": "",
                            });
                        })
                    })
                });
            });

           $('.reload').on("click", () =>{
               $('#nom').val(response['cataloginfo']['nom']);
               $('#date').val(response['cataloginfo']['publish_date']);
               $('#description').val(response['cataloginfo']['description']);
               $('#saison').val('');
               $('#type').val(response['cataloginfo']['type']);
               
                $('.contenaireSeconderType').text('');
                response['allType'].forEach(typeCatalog => {
                    $('.contenaireSeconderType').append('<div class="seconderTypeDiv"><span class="spanTxtType"><div class="removeType"><i class="fa-solid fa-xmark"></i></div>' + typeCatalog['type'] + '</span></div>');
                });

           })


           $('.editeBack, .close').on("click", () =>{
               $('body').css('overflow', '');
               $('.editeBack, .editeContenaire, .editeControler').remove();
               editBtnActif = true;
           })
           
           
            $('#saison').on('change', function() {
                if (isNaN($('#saison').val()) || $('#saison').val() < 0) {
                    $('#saison').val('');
                }
            });
           
            type.on('change', function() {
                if(type.val() == "addType"){
                    var addInpute = $('<div class="addInpute"></div>');
                        addInpute.append('<label for="inputeType">Quel type voulez-vous ajouter ?</label>');
                        addInpute.append('<input type="text" id="inputeType">');
                    contenaireType.append(addInpute);
                }else{
                    $(".addInpute").remove();
                }
            });


           $('.enregistre').on("click", function(e) {
                e.preventDefault();
                var nom = $('#nom').val();
                var date = $('#date').val();
                var description = $('#description').val();
                var saison = $('#saison').val();
                var typePrincipal = $('#type').val();

                var valeurs = $('.seconderTypeDiv').map(function() {
                    return $(this).text();
                }).get();
           })
           
           $('.brouillon').on("click", function(e) {
                e.preventDefault();
                var nom = $('#nom').val();
                var date = $('#date').val();
                var description = $('#description').val();
                var saison = $('#saison').val();
                var typePrincipal = $('#type').val();
                if(typePrincipal == "addType"){
                    typePrincipal = $('#inputeType').val();
                }

                var valeurs = $('.seconderTypeDiv').map(function() {
                    return $(this).text();
                }).get();
                console.log(valeurs);
           })
           $('.desactiver').on("click", function(e) {
                e.preventDefault();
                console.log("desactiver");
           })
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function edite(catalog_id){
    if(editBtnActif){
        editeCode(catalog_id);
    }else{
        console.log("absens");
    }
}

function inputeSecondarType(valer){
    console.log(valer);
}

function addCatalog(){
    console.log("ajouter un catalog");
}

function addEpisode(id_episod){
    console.log("ajouter un episode au catalog avec id = " + id_episod);
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



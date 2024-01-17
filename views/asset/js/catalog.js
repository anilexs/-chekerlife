var editBtnActif = true;

// function parametre() {
//     $.urlParam = function(name) {
//         var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//         return results ? results[1] || 0 : false;
//     };

//     return {
//         allViews: $.urlParam('allViews') === 'true',
//         actif: $.urlParam('actif') === 'true',
//         disable: $.urlParam('disable') === 'true',
//         brouillon: $.urlParam('brouillon') === 'true',
//     };
// }



function catalogViews(offset, limit = 80) {
    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? results[1] || 0 : false;
    };

    var parametre = {
        allViews: $.urlParam('allViews') === 'true' ? true : null,
        actif: $.urlParam('actif') === 'false' ? null : true,
        disable: $.urlParam('disable') === 'true' ? true : null,
        brouillon: $.urlParam('brouillon') === 'true' ? true : null,
    };
    
    offset -= 1;
    limit = 80;
    $("#pagination").html("");
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php",
        type: 'POST',
        data: {
            action: "catalog",
            limit: limit,
            offset: offset,
            parametre: parametre,
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

function catalogFiltre(filtre, offset = 1, limit = 80){
    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? results[1] || 0 : false;
    };

    var parametre = {
        allViews: $.urlParam('allViews') === 'true' ? true : null,
        actif: $.urlParam('actif') === 'false' ? null : true,
        disable: $.urlParam('disable') === 'true' ? true : null,
        brouillon: $.urlParam('brouillon') === 'true' ? true : null,
    };
    console.log(parametre);
    
    offset -= 1;    
    offset *= 80;

    $("#pagination").html("");
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
        type: 'POST',
        data: {
            action: "filtre",
            filtre: filtre,
            limit: limit,
            offset: offset,
            parametre: parametre,
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
    $.urlParam = function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results ? results[1] || 0 : false;
    };

    var parametre = {
        allViews: $.urlParam('allViews') === 'true' ? true : null,
        actif: $.urlParam('actif') === 'false' ? null : true,
        disable: $.urlParam('disable') === 'true' ? true : null,
        brouillon: $.urlParam('brouillon') === 'true' ? true : null,
    };

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
            parametre: parametre
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

function editeCode(origin, catalog_id){
    action = (origin == "catalog") ? "cataloginfo" : "brouilloninfo";
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
        type: 'POST',
        data: {
            action: action,
            catalog_id: catalog_id,
        },
        dataType: 'json',
        success: function(response) {
            editBtnActif = false;
            
            var back = $('<div class="editeBack"></div>');
            var edite = $('<div class="editeContenaire"></div>');
            

            var controler = $('<div class="editeControler"></div>');
                controler.append('<button class="move"><i class="fa-solid fa-minus"></i></button>');
                controler.append('<button class="reload"><i class="fa-solid fa-rotate-right"></i></button>');
                controler.append('<button class="close"><i class="fa-solid fa-xmark"></i></button>');

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
                
                        
                        $(document).on('click', '.removeType', function(e) {
                            e.preventDefault();
                            $(this).closest('.seconderTypeDiv').remove();
                        });

                
                    TypeSeconder.append(TypeInputeContenaire, contenaireSeconderType);
                    
                    $(document).on("keyup", '#inputeType', function(e) {
                        if(e.key === "Enter" && $(this).val() != ""){  
                            var presence = false;
                            $('.spanTxtType').each(function() {
                                if ($(this).text() === $('#inputeType').val()) {
                                  presence = true;
                                  return false;
                                }
                            });
                            if(presence == false){
                                $('.contenaireSeconderType').append('<div class="seconderTypeDiv"><span class="spanTxtType"><div class="removeType"><i class="fa-solid fa-xmark"></i></div>' + $(this).val() + '</span></div>');
                                $('#inputeType').val('');
                            }else{
                                $('#inputeType').val('');
                            }
                        }else{
                            console.log("Contenu de l'inputeType :", $(this).val());
                        }
                    });
                    
                $("body").prepend(back, edite);
                $("body").append(controler);
                contenaireType.append(type);
                form.append(contenaireType, TypeSeconder);
                
                var formController = $('<div class="formController"></div>');
                if(origin == "catalog"){
                    formController.append('<button class="enregistre">enregistré</button>');
                    formController.append('<button class="brouillonCatalog">brouillon</button>');
                    if(response['cataloginfo']['catalog_actif'] == 1){
                        formController.append('<button class="desactiver">désactiver</button>');
                    }else{
                        formController.append('<button class="reactiver">Réactiver</button>');
                    }
                }else{
                    formController.append('<button class="update">metre a jour ver le catalog</button>');
                    formController.append('<button class="brouillon">metre a jour le brouillon</button>');
                }
                form.append(formController);


                var imgCatalogController = $('<div class="imgCatalogController"></div>');
                var imgCatalog = $('<div class="catalogimg"></div>');
                    imgCatalog.css('background-image', 'url("../asset/img/catalog/' + response['cataloginfo']['image_catalogue'] + '")');
                    $('body').css('overflow', 'hidden');

            
           
                    edite.append(left);
                    edite.append(right);
                    right.append(imgCatalogController);
                    right.append(imgCatalog);
                    left.append(form);

       
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
               $('.addInpute').remove();
               
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
           
           $('.brouillonCatalog').on("click", function(e) {
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
                // console.log(valeurs);
           })
           $(document).on('click', '.desactiver, .reactiver', function(e) {
                e.preventDefault();
                $.ajax({
                    url: host + "controller/CatalogAjaxControllerAdmin.php", 
                    type: 'POST',
                    data: {
                        action: "newCatalogActif",
                        catalog_id: catalog_id,
                    },
                    dataType: 'json',
                    success: function(response) {
                        if(response['newEtat'] == 1){
                            var boutonDesactiver = $('<button class="desactiver">désactiver</button>');
                            $(".reactiver").replaceWith(boutonDesactiver);
                            $('.'+ origin +"Id"+catalog_id).css({
                                "border": "3px solid rgb(0, 119, 255)",
                            });
                        }else{
                            var boutonReactiver = $("<button class='reactiver'>Réactiver</button>");
                            $(".desactiver").replaceWith(boutonReactiver);
                            $('.'+ origin +"Id"+catalog_id).css({
                                "border": "3px solid red",
                            });
                        }
                        // if(response['cataloginfo']['catalog_actif'] == 1){
                        //     formController.append('<button class="desactiver">désactiver</button>');
                        // }else{
                        //     formController.append('<button class="reactiver">Réactiver</button>');
                        // }

                    },
                    error: function(xhr, status, error) {
                        console.error('Une erreur s\'est produite lors du chargement du contenu.');
                    }
                });
           })
           
           $('.reactiver').on("click", function(e) {
                e.preventDefault();
                // $.ajax({
                //     url: host + "controller/CatalogAjaxControllerAdmin.php", 
                //     type: 'POST',
                //     data: {
                //         action: "reactiver",
                //         catalog_id: catalog_id,
                //     },
                //     dataType: 'json',
                //     success: function(response) {

                //     },
                //     error: function(xhr, status, error) {
                //         console.error('Une erreur s\'est produite lors du chargement du contenu.');
                //     }
                // });
           })
           
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function edite(origin, catalog_id){
    if(editBtnActif){
        editeCode(origin, catalog_id);
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

function addEpisode(catalog_id){
    $('body').css('overflow', 'hidden');
    var back = $('<div class="editeBack"></div>');
    var edite = $('<div class="editeContenaire"></div>');
    $("body").prepend(back, edite);
    var episodeView = $('<div id="episodeView"></div>');
    $("episodeView").prepend(episodeView);

    $('.editeBack, .close').on("click", () =>{
        $('body').css('overflow', '');
        $('.editeBack, .editeContenaire').remove();
    });
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
        type: 'POST',
        data: {
            action: "episodeViews",
        },
        dataType: 'html',
        success: function(response) {
            $('#episodeView').html(response);
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
            updateURL("titre" ,searchTerm);
        }
        ftrSize();
    });

    function updateURL(getName, valer) {
        var urlParams = new URLSearchParams(window.location.search);
        urlParams.set(getName, valer);
        var newURL = window.location.pathname + "?" + getName + "=" + valer;
        urlParams.forEach(function (value, key) {
            if (key !== getName) {
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

    function clearAllParams() {
        var url = window.location.href.split('?')[0];
        window.history.replaceState({}, document.title, url);
        updateURL("allViews", $("#allViews").is(":checked"));
    }

    function allCheked(){        
        var allNoCheked = !$("#actif").prop("checked") && !$("#brouillon").prop("checked") && !$("#disable").prop("checked");
        var allCheked = $("#actif").prop("checked") && $("#brouillon").prop("checked") && $("#disable").prop("checked");
        
        if(allNoCheked){
            $('#catalog').text("");
            $('#pagination').text("");
            var menuCatalog = $('<div class="cardNav"></div>');
                menuCatalog.append('<div class="cardNavHdr">menu catalog</div>');
            var cardNavAuto = $('<div class="cardNavAuto"></div>');
                cardNavAuto.append('<span class="cardNavSpan"><input type="checkbox" id="allViews"' + ($("#allViews").prop("checked") ? 'checked' : '') + '><label for="allViews">Tout afficher</label></span>');
                cardNavAuto.append('<span class="cardNavSpan"><input type="checkbox" id="actif"' + ($("#actif").prop("checked") || $("#allViews").prop("checked") ? 'checked' : '') + '><label for="actif">Catalogue actif</label></span>');
                cardNavAuto.append('<span class="cardNavSpan"><input type="checkbox" id="disable"' + ($("#disable").prop("checked") || $("#allViews").prop("checked") ? 'checked' : '') + '><label for="disable">Catalogue désactivé</label></span>');
                cardNavAuto.append('<span class="cardNavSpan"><input type="checkbox" id="brouillon"' + ($("#brouillon").prop("checked") || $("#allViews").prop("checked") ? 'checked' : '') + '><label for="brouillon">Catalogue brouillon</label></span>');
            menuCatalog.append(cardNavAuto);
            $('#catalog').html(menuCatalog);
            ftrSize();
        }else{
            if(allCheked){
                $("#allViews").prop("checked", true);
                updateURL("allViews", $("#allViews").is(":checked"));
                $("#actif").prop("checked", true);
                $("#disable").prop("checked", true);
                $("#brouillon").prop("checked", true);
                removeGetParameter("actif");
                removeGetParameter("disable");
                removeGetParameter("brouillon");
            }else{
                
                $("#allViews").prop("checked", false);
                removeGetParameter("allViews");
                var actif = $("#actif").is(":checked");
                var disable = $("#disable").is(":checked");
                var brouillon = $("#brouillon").is(":checked");

                if(!actif){
                    updateURL("actif", $("#actif").is(":checked"));
                }

                if(brouillon){
                    updateURL("brouillon", $("#brouillon").is(":checked"));
                }

                if(disable){
                    updateURL("disable", $("#disable").is(":checked"));
                }
            }
        }
        return [allCheked, allNoCheked];
    }


        $(document).on("change", "#allViews", function () {
            var allViews = $("#allViews").is(":checked");
            if(allViews){
                updateURL("allViews", $("#allViews").is(":checked"));
                $("#actif").prop("checked", true);
                $("#disable").prop("checked", true);
                $("#brouillon").prop("checked", true);
                removeGetParameter("actif");
                removeGetParameter("disable");
                removeGetParameter("brouillon");
            }else{
                $("#disable").prop("checked", false);
                $("#brouillon").prop("checked", false);
                removeGetParameter("allViews");
            }
            catalogMenu();
        });
        
        $(document).on("change", "#actif", function () {
            var allCheke = allCheked();
            if(allCheke[1]){
                updateURL("actif", $("#actif").is(":checked"));
            }else{
                if(!allCheke[0]){
                    var actif = $("#actif").is(":checked");
                    if(!actif){
                        updateURL("actif", $("#actif").is(":checked"));
                    }else{
                        removeGetParameter("actif");
                    }
                }
            
            }
            catalogMenu();
        });

        $(document).on("change", "#brouillon", function () {
            var allCheke = allCheked();
            if(allCheke[1]){
                removeGetParameter("brouillon");
            }else{
                if(!allCheke[0]){
                    var brouillon = $("#brouillon").is(":checked");
                    if(brouillon){
                        updateURL("brouillon", $("#brouillon").is(":checked"));
                    }else{
                        removeGetParameter("brouillon");
                    }               
                }

            }
            catalogMenu();
        });

        $(document).on("change", "#disable", function () {
            var allNoCheked = !$("#actif").prop("checked") && !$("#brouillon").prop("checked") && !$("#disable").prop("checked");
            var allCheke = allCheked();
            if(allCheke[1]){
                removeGetParameter("disable");
            }else{
                if(!allCheke[0]){
                    var disable = $("#disable").is(":checked");
                    if(disable){
                        updateURL("disable", $("#disable").is(":checked"));
                    }else{
                        removeGetParameter("disable");
                    }
                }     
                  
            }
            catalogMenu();
        });

        function catalogMenu (){
            removeGetParameter("page");
            var urlParams = new URLSearchParams(window.location.search);
            var titre = urlParams.get("titre");
            var allNoCheked = !$("#actif").prop("checked") && !$("#brouillon").prop("checked") && !$("#disable").prop("checked");
            if(allNoCheked){
                menuNoCheked();
            }else if(titre == null){
                catalogViews();
            }else{
                catalogFiltre(titre);
            }
        }

        function menuNoCheked (){
            console.log("yes");
        }
});
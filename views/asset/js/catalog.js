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


                // var imgCatalogController = $('<div class="imgCatalogController"></div>');
                var imgCatalog = $('<div class="catalogimg"></div>');
                    imgCatalog.css('background-image', 'url("../asset/img/catalog/' + response['cataloginfo']['image_catalogue'] + '")');
                    $('body').css('overflow', 'hidden');

            
           
                    edite.append(left, right);
                    // edite.append(right);
                    // right.append(imgCatalogController);
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
           $(document).keydown(function(e) {
                if (e.keyCode === 27) {
                    $('body').css('overflow', '');
                    $('.editeBack, .editeContenaire, .editeControler').remove();
                    editBtnActif = true;
                }
            });
           
           
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
                        // warning
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

function imageClick(event, clas) {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            $('.' + clas).css('background-image', 'url(' + e.target.result + ')');
            $('.' + clas).css({
                'background-position': '',
                'background-size': ''
            });
        }
        reader.readAsDataURL(file);
    }
    input.click();
}

// Fonction pour gérer la sélection de fichiers
function handleFileSelect(event, clas) {
    event.preventDefault();
    var file = event.originalEvent.dataTransfer.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        $('.' + clas).css('background-image', 'url(' + e.target.result + ')');
    }
    reader.readAsDataURL(file);
}

function addCatalog(){
    $('body').css('overflow', 'hidden');
    var back = $('<div class="editeBack"></div>');
    var edite = $('<div class="editeAddContenaire"></div>');

    var controler = $('<div class="editeControler"></div>');
        controler.append('<button class="move"><i class="fa-solid fa-minus"></i></button>');
        controler.append('<button class="reload"><i class="fa-solid fa-rotate-right"></i></button>');
        controler.append('<button class="close"><i class="fa-solid fa-xmark"></i></button>');

    $("body").prepend(back, edite, controler);

    var left = $('<div class="leftCatalog"></div>');
    var leftNom = $('<div class="leftNom"></div>');
            leftNom.append('<label for="addNom">Nom : </label>');
            leftNom.append('<div id="addNom" contentEditable></div>');
        left.append(leftNom);

        left.append('<div id="addDescription" contentEditable></div>');

    var formController = $('<div class="formController"></div>');
            formController.append('<button class="addEnregistre">enregistré</button>');
            formController.append('<button class="addBrouillonCatalog">brouillon</button>');
        left.append(formController);

        $(document).on('click', '.addEnregistre', function(e) {
            var nom = $('#addNom').html().replace(/<div>|<\/div>|<br>|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
            console.log(nom);
            var description = $('#addDescription').html().replace(/<div>|<\/div>|<br>|&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
            console.log(description);
        });




    
    var right = $('<div class="rightCatalog"></div>');
        right.append('<div class="catalogAddImgController"></div>');
        right.append('<div class="catalogAddImg"></div>');
        right.append('<div class="catalogAddLastImg"></div>');

    $(document).ready(function(){
        // $('.catalogAddImgController').append('<button class="catalogAddImgReset">reset</button>');
        // $('.catalogAddImgController').append('<button class="catalogAddImgCenter">center</button>');
        // $('.catalogAddImgController').append('<button class="catalogAddImgCover">cover</button>');
        // $('.catalogAddImgController').append('<button class="catalogAddImgMax">max</button>');
        $('.catalogAddImgController').append('<button class="catalogAddImgSetup">vus original</button>');
        $('.catalogAddImgController').append('<button class="catalogAddImgZoom" disabled>vus zoomer</button>');
        $('.catalogAddImgController').append('<button class="catalogAddImgRemplacer">remplacer l\'image</button>');
        $('.catalogAddImgController').append('<button class="catalogAddImgClear">suprime</button>');
        

        // var startX, startY, startLeft, startTop;
        // var isDragging = false;
        
        // var $div = $('.catalogAddImg');
        // var scale = 1.0;
        // var increment = 0.1;
        // var maxScale = 10.0;
        // var minScale = 0.5;
        
        // // Gérer le défilement de la molette de la souris sur la div spécifiée
        // $('.catalogAddImg').on('wheel', function(event) {
        //     event.preventDefault();

        //     // Calculer la nouvelle échelle en fonction de la direction du défilement
        //     scale += event.originalEvent.deltaY > 0 ? increment : -increment;
        //     scale = Math.min(Math.max(scale, minScale), maxScale);

        //     // Appliquer la nouvelle échelle à l'image de fond
        //     $div.css({
        //         'background-size': (scale * 100) + '%'
        //     });
        // });

        // // Gérer le clic sur l'image pour commencer le déplacement
        // $('.catalogAddImg').on('mousedown', function(e) {
        //     isDragging = true;
        //     startX = e.clientX;
        //     startY = e.clientY;
        //     startLeft = parseInt($(this).css('background-position-x'));
        //     startTop = parseInt($(this).css('background-position-y'));
        // });

        // // Gérer le mouvement de la souris pour déplacer l'image
        // $(document).on('mousemove', function(e) {
        //     if (isDragging) {
        //         var offsetX = e.clientX - startX;
        //         var offsetY = e.clientY - startY;
        //         var newLeft = startLeft + offsetX;
        //         var newTop = startTop + offsetY;
        //         $('.catalogAddImg').css({
        //             'background-position-x': newLeft + 'px',
        //             'background-position-y': newTop + 'px'
        //         });
        //     }
        // });

        // // Arrêter le déplacement lorsque le clic est relâché
        // $(document).on('mouseup', function() {
        //     isDragging = false;
        // });
    
        // Fonction pour gérer le background d'images
    
        // Activer la fonctionnalité glisser-déposer
        $('.catalogAddImg, .catalogAddLastImg').on('dragover', function(e) {
            e.preventDefault();
        });
    
        $('.catalogAddImg').on('drop', function(e) {
            handleFileSelect(e, "catalogAddImg");
        });
        
        $('.catalogAddLastImg').on('drop', function(e) {
            handleFileSelect(e, "catalogAddLastImg");
        });
    
        // Activer la fonctionnalité cliquer pour télécharger
        $('.catalogAddImg').on('click', function(e) {
            imageClick(e, "catalogAddImg");
        });
        
        $('.catalogAddLastImg').on('click', function(e) {
            imageClick(e, "catalogAddLastImg");
        });
    
    });

    edite.append(left, right);

    $('.editeBack, .close').on("click", () =>{
        $('body').css('overflow', '');
        $('.editeBack, .editeAddContenaire, .editeControler').remove();
        editBtnActif = true;
    })
    $(document).keydown(function(e) {
         if (e.keyCode === 27) {
             $('body').css('overflow', '');
             $('.editeBack, .editeAddContenaire, .editeControler').remove();
             editBtnActif = true;
         }
     });
}

// $(document).on('click', '.catalogAddImgReset', function(e) {
//     $(this).closest('.rightCatalog').find('.catalogAddImg').css({
//         'background-repeat': '',
//         'background-size': 'cover',
//         'background-position': 'center'
//     });
// })

// $(document).on('click', '.catalogAddImgCenter', function(e) {})

// $(document).on('click', '.catalogAddImgCover', function(e) {})

// $(document).on('click', '.catalogAddImgMax', function(e) {})

function BtnControllerAddImg(clas){
    $('.catalogAddImgSetup, .catalogAddImgZoom').prop('disabled', false);
    $('.' + clas).prop('disabled', true);
}

$(document).on('click', '.catalogAddImgSetup', function(e) {
    BtnControllerAddImg('catalogAddImgSetup');
    $('.catalogAddImg').css({
        'width': '180px',
        'height': '280px'
    })
})

$(document).on('click', '.catalogAddImgZoom', function(e) {
    BtnControllerAddImg('catalogAddImgZoom');
    $('.catalogAddImg').css({
        'width': '400px',
        'height': '600px'
    })
})

$(document).on('click', '.catalogAddImgClear', function(e) {
    BtnControllerAddImg('catalogAddImgZoom');
    $(this).closest('.rightCatalog').find('.catalogAddImg').removeAttr('style');
    // $('.catalogAddImg').on('click', function(event) {
    //     imageClick(event);
    // });
})

$(document).on('click', '.catalogAddImgRemplacer', function(e) {
    imageClick(e, "catalogAddImg");
})


function addEpisode(catalog_id, origin){
    $('body').css('overflow', 'hidden');
    var back = $('<div class="editeBack"></div>');
    var episodContenaire = $('<div class="episodContenaire"></div>');
    var controler = $('<div class="editeControler"></div>');
        controler.append('<button class="move"><i class="fa-solid fa-minus"></i></button>');
        controler.append('<button class="reload"><i class="fa-solid fa-rotate-right"></i></button>');
        controler.append('<button class="close"><i class="fa-solid fa-xmark"></i></button>');
    $("body").prepend(back, episodContenaire, controler);

    $('.editeBack, .close').on("click", () =>{
        $('body').css('overflow', '');
        $('.editeBack, .episodContenaire, .editeControler').remove();
        $(window).off('resize');
        $(document).off('keydown');
    });
    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            $('body').css('overflow', '');
            $('.editeBack, .episodContenaire, .editeControler').remove();
            $(window).off('resize');
            $(document).off('keydown');
        }
        console.log(e.keyCode);
    });

    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php", 
        type: 'POST',
        data: {
            action: "episodeAll",
            catalog_id: catalog_id,
            origin: origin,
        },
        dataType: 'json',
        success: function(response) {
            console.log(response['episodAll']);
            console.log(response['catalog']);
            var episodHdr = $(
                '<div class="hdrEpisod">'+
                '<div> <img src="../asset/img/catalog/'+ response['catalog']['image_catalogue'] +'" alt=""></div>' +
                '<div>'+ response['catalog']['description'] +'</div>' +
                '</div>'
                );
            episodContenaire.append(episodHdr);
            if(response['episodAll'].length > 0){
                var divEpisod = $('<div class="divEpisod"></div>');
                divEpisod.append(
                        '<div class="episodeHdr">' +
                            '<span>episode</span>' +
                            '<span>titre</span>' +
                            '<span>description</span>' +
                            '<span>date de publication</span>' +
                            '<span>durée</span>'+
                            '<span>edite</span>'+
                            '<span>disabled</span>'+
                            '<span><button class="afichageBtnHdr"><i class="fa-solid fa-arrow-right"></i></button></span>'+
                        '</div>'
                    );

                    response['episodAll'].forEach(episode => {
                        if(episode['origin'] == 'catalog'){
                            var etat = (episode['episod_actif'] == 1) ? "" : "epDisable";
                            divEpisod.append(
                                '<div class="catalogEp episodeCatalog detailCatalogDown episodeBd ' + etat + ' epBd'+ episode['id_episode'] +'">' +
                                    '<span><div>' + episode['nb_episode'] + '</div></span>' +
                                    '<span>' + episode['title'] + '</span>' +
                                    '<span>' + episode['description'] + '</span>' +
                                    '<span>' + episode['publish_date'] + '</span>' +
                                    '<span>' + episode['dure'] + '</span>' +
                                    '<span class="editeEp"><button>modifier</button></span>' +
                                    '<span class="desactiverEp"><button onclick="disabledEp('+ episode['id_episode']+')">disabled</button></span>' +
                                    '<span class="arrowBtn"><button class="afichageBtn"><i class="fa-solid fa-arrow-right"></i></button></span>' +
                                '</div>'
                            );
                        }else{
                            divEpisod.append(
                                '<div class="brouillonEp detailBrouillonDown episodeBd episodeBrouillon epBd'+ episode['id_episode'] +'">' +
                                    '<span><div>' + episode['nb_episode'] + '</div></span>' +
                                    '<span>' + episode['title'] + '</span>' +
                                    '<span>' + episode['description'] + '</span>' +
                                    '<span>' + episode['publish_date'] + '</span>' +
                                    '<span>' + episode['dure'] + '</span>' +
                                    '<span class="editeEp"><button>modifier</button></span>' +
                                    '<span class="desactiverEp"><button></button></span>' +
                                    '<span class="arrowBtn"><button class="afichageBtn"><i class="fa-solid fa-arrow-right"></i></button></span>' +
                                '</div>'
                            );
                        }
                    });
                    episodContenaire.append(divEpisod);
                    $(window).resize(function() {
                        // var largeurFenetre = $(window).width();
                        // console.log(largeurFenetre);
                        detailEpUp('.detailCatalogUp', 100);
                        detailEpUpBrouillon('.detailBrouillonUp', 100);
                        detailEpDown('.detailCatalogDown', 100);
                        detailEpDownBrouillon('.detailBrouillonDown', 100);
                    });
            }else{
                console.log("vide");
            }
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });

}

$(document).on('click', '.afichageBtnHdr', function(e) {
    e.preventDefault();

    var icon = $(this).find('i');
    $('.episodeBd').stop(true, false);
    $('.episodeBd').find('span').stop(true, true);

    if (!icon.hasClass('rotate-right')) {
        $('.episodeBd').find('span').css({
            "overflow": "visible"
        });
        $(icon).addClass('rotate-right');
        $('.episodeCatalog, .episodeBrouillon').find('span').css('position', 'absolute');
        $('.episodeBd i').addClass('rotate-right');
        $('.episodeBd').removeClass("detailCatalogDown detailBrouillonDown");
        $('.catalogEp').addClass("detailCatalogUp");
        $('.brouillonEp').addClass("detailBrouillonUp");
        detailEpUp(".episodeCatalog", 300);
        detailEpUpBrouillon(".episodeBrouillon", 300);
        
    } else {
        $('.episodeBd').find('span').css({
            "overflow": "hidden"
        });
        $(icon).removeClass('rotate-right');
        $('.episodeBd i').removeClass('rotate-right');
        $('.episodeBd').removeClass("detailCatalogUp detailBrouillonUp");
        $('.catalogEp').addClass("detailCatalogDown");
        $('.brouillonEp').addClass("detailBrouillonDown");
        detailEpDown(".episodeCatalog", 300);
        detailEpDownBrouillon(".episodeBrouillon", 300);

    }
});

$(document).on('click', '.afichageBtn', function(e) {
    e.preventDefault();

    var icon = $(this).find('i');
    var parent = $(this).closest('.episodeBd');
    var origin = (parent.hasClass('catalogEp')) ? "catalog" : "brouillon";
    parent.stop(true, false);
    parent.find('span').stop(true, true);
    
    if (!icon.hasClass('rotate-right')) {
        parent.find('span').css({
            "overflow": "visible"
        });
        $('.afichageBtnHdr i').addClass('rotate-right');
        if(origin == "catalog"){
            parent.removeClass("detailCatalogDown");
            parent.addClass("detailCatalogUp");
        }else{
            parent.removeClass("detailBrouillonDown");
            parent.addClass("detailBrouillonUp");
        }
        icon.addClass('rotate-right');
        $(parent).find('span').css('position', 'absolute');
        if(origin == 'catalog'){
            detailEpUp(parent, 300);
        }else{
            detailEpUpBrouillon(parent, 300);
        }
    } else {
        parent.find('span').css({
            "overflow": "hidden"
        });
        icon.removeClass('rotate-right');
        var countRotateRight = $(".episodeBd i.rotate-right").length;
        if(countRotateRight == 0){
            $('.afichageBtnHdr i').removeClass('rotate-right');
        }
        if(origin == 'catalog'){
            parent.removeClass("detailCatalogUp");
            parent.addClass("detailCatalogDown");
            detailEpDown(parent, 300);
        }else{
            parent.removeClass("detailBrouillonUp");
            parent.addClass("detailBrouillonDown");
            detailEpDownBrouillon(parent, 300);
        }
    }

});

function detailEpUp(parent, time){
    $(parent).find('span').css({
        "height": ""
    });
    if ($(parent).find('.brouillonEp').length === 0) {
        $(parent).append('<span class="brouillonEp"><button class="brouillonEpBtn">brouillon</button></span>');
        $(parent).find('.brouillonEp').css({
            'position': 'absolute',
            'zIndex': '0'
        });
    }
    
    var largeurFenetre = $(window).width();
    console.log(largeurFenetre);

    var nb_episod = $('<div class="txtBdEpisod">episode numero : </div>');
        if(largeurFenetre > 1320){
            $(parent).animate({
                'height': '60vh'
            }, time);

            $(parent).find('span:first-child').css({
                'top': '0%',
                "overflow": "visible"
            });
            $(parent).find('span:first-child').animate({
                'width': '25%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
            
            $(parent).find('span:nth-child(2)').css({
                'left': '7%',
                'top': '50%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '25%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(4)').css({
                'left': '55%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(5)').css({
                'left': '70%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '13%',
                'top': '50%'
            });

            $(parent).find('span:nth-child(7)').css({
                'right': '6%',
                'top': '50%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '50%'
            });
            
        }else if(largeurFenetre > 1075 && largeurFenetre <= 1320){
            $(parent).animate({
                'height': '60vh',
                "overflow": "visible"
            }, time);
            $(parent).find('span:first-child').css({
                'top': '5%'
            });
            $(parent).find('span:first-child').animate({
                'width': '9%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '9%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '27%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(4)').css({
                'left': '57%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '16.5%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').css({
                'right': '8%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 785 && largeurFenetre <= 1075){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').css({
                'top': '5%',
                "overflow": "visible"
            });
            $(parent).find('span:first-child').animate({
                'width': '11%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '11%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '32%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '21%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').css({
                'right': '10%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 530 && largeurFenetre <= 785){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').css({
                'top': '5%',
                "overflow": "visible"
            });
            $(parent).find('span:first-child').animate({
                'width': '13%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '13%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '34%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '13%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 380 && largeurFenetre <= 530){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').css({
                'top': '5%',
                "overflow": "visible"
            });
            $(parent).find('span:first-child').animate({
                'width': '24%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '24%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '18%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre <= 380){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').css({
                'top': '5%',
                "overflow": "visible"
            });
            $(parent).find('span:first-child').animate({
                // 'width': '25%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '30%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }
    }

function detailEpDown(parent, time){
    var largeurFenetre = $(window).width();
    var height = 0;
        if(largeurFenetre > 1320){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '7%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '7%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '25%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(4)').animate({
                'left': '55%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(5)').animate({
                'left': '70%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '6%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });
            
            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });
            
        }else if(largeurFenetre > 1075 && largeurFenetre <= 1320){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '9%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '9%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '27%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(4)').animate({
                'left': '57%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '16.5%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '8%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });

        }else if(largeurFenetre > 785 && largeurFenetre <= 1075){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '11%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '11%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '32%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '21%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '10%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });

        }else if(largeurFenetre > 530 && largeurFenetre <= 785){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '13%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '34%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }else if(largeurFenetre > 380 && largeurFenetre <= 530){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '24%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '24%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '18%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }else if(largeurFenetre <= 380){
            $(parent).find('span:first-child').animate({
                'top': '0%'
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '30%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }
    }

function detailEpUpBrouillon(parent, time){
    $(parent).find('span').css({
        "height": ""
    });
    if ($(parent).find('.brouillonEp').length === 0) {
        $(parent).append('<span class="brouillonEp"><button class="brouillonEpBtn">brouillon</button></span>');
        $(parent).find('.brouillonEp').css({
            'position': 'absolute',
            'zIndex': '0'
        });
    }
    
    var largeurFenetre = $(window).width();
    console.log(largeurFenetre);

    var nb_episod = $('<div class="txtBdEpisod">episode numero : </div>');
        if(largeurFenetre > 1320){
            $(parent).animate({
                'height': '60vh'
            }, time);

            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '25%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '7%',
                'top': '50%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '25%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(4)').css({
                'left': '55%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(5)').css({
                'left': '70%',
                'top': '50%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '13%',
                'top': '50%'
            });

            $(parent).find('span:nth-child(7)').css({
                'right': '6%',
                'top': '50%',
            });
            $(parent).find('span:nth-child(7)').animate({
                'opacity': '0'
            }, time);
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '50%'
            });
            
        }else if(largeurFenetre > 1075 && largeurFenetre <= 1320){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').animate({
                'top': '5%',
                'width': '9%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '9%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '27%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(4)').css({
                'left': '57%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '16.5%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').css({
                'right': '8%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').animate({
                'opacity': '0'
            }, time);
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 785 && largeurFenetre <= 1075){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').animate({
                'top': '5%',
                'width': '11%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '11%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '32%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '21%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').css({
                'right': '10%',
                'top': '20%'
            });
            $(parent).find('span:nth-child(7)').animate({
                'opacity': '0'
            }, time);
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 530 && largeurFenetre <= 785){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').animate({
                'top': '5%',
                'width': '13%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '13%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(3)').css({
                'left': '34%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '13%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre > 380 && largeurFenetre <= 530){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').animate({
                'top': '5%',
                'width': '24%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }

            $(parent).find('span:nth-child(2)').css({
                'left': '24%',
                'top': '20%'
            });
            
            $(parent).find('span:nth-child(6)').css({
                'right': '18%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }else if(largeurFenetre <= 380){
            $(parent).animate({
                'height': '60vh'
            }, time);
            $(parent).find('span:first-child').animate({
                'top': '5%',
                'width': '11%',
            }, time);
            if ($(parent).find('.txtBdEpisod').length === 0) {
                $(parent).find('span:first-child').prepend(nb_episod);
            }
    
            $(parent).find('span:nth-child(2)').css({
                'left': '30%',
                'top': '20%'
            });
    
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });

            $(parent).find('span:nth-child(9)').css({
                'right': '0%',
                'top': '30%'
            });
        }
    }

function detailEpDownBrouillon(parent, time){
    var largeurFenetre = $(window).width();
    var height = 0;
        if(largeurFenetre > 1320){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '7%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');
            
            $(parent).find('span:nth-child(2)').animate({
                'left': '7%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '25%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(4)').animate({
                'left': '55%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(5)').animate({
                'left': '70%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '6%',
                'top': '0%',
                'opacity': '1'
            }, time);

            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });
            
            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });
            
        }else if(largeurFenetre > 1075 && largeurFenetre <= 1320){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '9%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');
            
            $(parent).find('span:nth-child(2)').animate({
                'left': '9%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '27%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(4)').animate({
                'left': '57%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '16.5%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '8%',
                'top': '0%',
                'opacity': '1'
                
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });

        }else if(largeurFenetre > 785 && largeurFenetre <= 1075){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '11%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '11%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '32%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '21%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(7)').animate({
                'right': '10%',
                'top': '0%',
                'opacity': '1'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            });

        }else if(largeurFenetre > 530 && largeurFenetre <= 785){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '13%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(3)').animate({
                'left': '34%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '13%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }else if(largeurFenetre > 380 && largeurFenetre <= 530){
            $(parent).find('span:first-child').animate({
                'top': '0%',
                'width': '24%',
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '24%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(6)').animate({
                'right': '18%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }else if(largeurFenetre <= 380){
            $(parent).find('span:first-child').animate({
                'top': '0%'
            }, time);
            $(parent).find('.txtBdEpisod').remove('.txtBdEpisod');

            $(parent).find('span:nth-child(2)').animate({
                'left': '30%',
                'top': '0%'
            }, time);
            $(parent).find('span:nth-child(8)').css({
                'right': '0%',
                'top': '0%'
            });
            $(parent).find('span:nth-child(9)').animate({
                'opacity': '0',
                'top': '0%'
            }, time, function() {
                $(parent).find('.brouillonEp').remove();
            });

            height += 9;
            $(parent).animate({
                'height': height + "vh",
            }, time, function() {
                $(parent).find('span').css({
                    "height": "auto"
                });
                $(parent).find('span').css('position', '');
            }); 

        }
    }


function disabledEp(episod_id){
    $.ajax({
        url: host + "controller/CatalogAjaxControllerAdmin.php",
        type: 'POST',
        data: {
            action: "disabledEp",
            episod_id: episod_id,
        },
        dataType: 'json',
        success: function (response) {
            if(response['newEtat'] == 0){
                $('.epBd' + episod_id).addClass('epDisable');
            }else{
                $('.epBd' + episod_id).removeClass('epDisable');
            }
        },
        error: function (xhr, status, error) {
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
ftrSize();

$(document).ready(function() {
    ftrSize();

    var openMenu = false; 

    $('.blockContainer').click(function(event) {
        event.stopPropagation();
        $('.blockSelect').stop(true, false);

        if (openMenu == false) {
            $('.blockSelect').stop().animate({ height: '300px' }, 300);
            openMenu = true;
        } else {
            $('.blockSelect').stop().animate({ height: '0' }, 300);
            openMenu = false;
        }
    });


    $('.blockName').click(function() {
        
        var hauteur = $(this).parent('.block').css('height');
        
        if(hauteur !== '50px'){
            $(this).css("borderRadius", "15px");
            $(this).parent('.block').css("height", "50px");
        }else{
            $(this).css("borderRadius", "15px 15px 0 0");
            $(this).parent('.block').css("height", "auto");
        }
    })
    
    $('.set').click(function() {
        var name = $(this).attr('id');
        
        $(".set").prop("disabled", false);
        $(this).prop("disabled", true);

        var urlParts = window.location.href.split('/');
        var baseUrl = urlParts.slice(0, -1).join('/'); // Reconstitue l'URL sans la dernière partie (après le dernier slash)
        var newUrl = baseUrl + '/' + name; // Ajoutez le nouveau nom à la fin de l'URL
        history.pushState({}, '', newUrl);
    
        name = name.replace(/\+/g, ' ');
    
        $.ajax({
            url: host + "controller/pokemonAjaxController.php", 
            type: 'POST',
            data: {
                action: "setcard",
                set_name: name
            },
            dataType: 'html',
            success: function(response) {
                // $('.card').html(response);
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    });
    
    $('.card').click(function(e) {
        e.stopPropagation();
        console.log('card click');
    })
    
    $('.pokeball').click(function() {
        var $this = $(this);
        removePokeball();
        var type = $(this).attr('class').split(' '); // Diviser la chaîne des classes par les espaces
        var name = $(this).attr('id');
        
        var ballSetId = $(this).find('.ballSetId').val();
        
        var regex = /(\w+)\s*:\s*\[([^\]]+)\]/g;
        var tableauAssoc = ballSetId.match(regex).reduce(function(acc, match) {
            var parts = match.split(/:\s*\[|\]/);
            acc[parts[0].trim()] = parts[1].trim();
            return acc;
        }, {});

        if(type[0] == "normal" || type[0] == "reverse" || type[0] == "special"){

            var data = (type[0] == "normal") ? {
                action: "userCardEtat",
                idCard: tableauAssoc['idCard'],
                set_name: tableauAssoc['set']
            } : {
                action: "userCardEtat",
                idCard: tableauAssoc['idCard'],
                set_name: tableauAssoc['set'],
                secondary_name: tableauAssoc['secondaireName'],
            };
            
            var type = (type[0] == "normal") ? "normal" : "secondaire";
            $.ajax({
                url: host + "controller/pokemonAjaxController.php", 
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(response) {
                    
                    var options = '';
                    
                    response['etat'].forEach(function(etat) {
                        if(etat['id_pk_etat'] == 1){
                            options += '<span class="etatOpt"> <button> <span class="etatoptSelect">Etat : <span class="etatoptSelectVal">' + etat['etat'] + '</span></span> <span class="etatNbCard">Posession : <span class="nbPosession">' + etat['nombre_de_cartes'] + '</span></span> </button> </span>';
                        }else{
                            options += '<span class="etatOpt"> <button> <span class="etatoptSelect">Etat : <span class="etatoptSelectVal">' + etat['etat'] + '</span></span> <span class="etatNbCard">Posession :  <span class="nbPosession">' + etat['nombre_de_cartes'] + '</span></span> </button> </span>';
                        }
                    });
                    $this.parent('.cardLegend').parent('.contenaireCard').find('.card').prepend(
                        '<div class="cardEtatContenaire">' +
                        '<div class="cardEtatReturn"><button class="returne"><i class="fa-solid fa-arrow-right fa-rotate-180"></i> retour</button></div>'  +
                        '<div class="cardEtatTxt">vouler vous ajouter ou suprimer une carte ' + 
                        '<div class="etat"><button>' + response['etat'][0]['etat'] + '</button></div>' +
                        '<div class="selectEtat">' +
                            options +
                        '</div>' + 
                        (type == "normal" ? 'normal' : tableauAssoc['secondaireName']) + ' a ' + tableauAssoc['card_name'] + '</div>'  +
                        '<div class="cardEtatbtn">' +
                            '<button class="plus"><i class="fa-solid fa-plus"></i></button>' +
                            '<button class="moins" ' + (tableauAssoc['user_card'] > 0 ? '' : 'disabled') + '><i class="fa-solid fa-minus"></i></button>' +
                        '</div>' +
                    '</div>');

                    $('.returne').on('click', function(e){
                        e.stopPropagation();
                        removePokeball();
                    })
                    
                    $('.cardEtatContenaire').on('click', function(e) {
                        e.stopPropagation();
                    });

                    $('.etat, .etatOpt').on('click', function(e) {
                        e.stopPropagation();
                        var $selectEtat = $('.selectEtat');
                        $selectEtat.stop(true, false);
                        
                        if (!$selectEtat.hasClass('ouvert')) {
                            $selectEtat.addClass('ouvert');
                            $selectEtat.animate({ height: '174px' }, 300);
                        } else {
                            $selectEtat.removeClass('ouvert');
                            $selectEtat.animate({ height: '0' }, 300);
                        }
                    });
                    
                    $('.etatOpt').on('click', function() {
                        // La méthode jQuery siblings() permet de sélectionner tous les frères d'un élément spécifié
                        var nbPosession = $(this).find('button').find(".nbPosession").text();

                        if(nbPosession >= 1){
                            $('.moins').prop("disabled", false);
                        }else{
                            $('.moins').prop("disabled", true);
                        }

                        var etat = $(this).find('button').find('.etatoptSelectVal').html();

                        $('.etat').find('button').html(etat); 
                    });

                    data = (type[0] == "normal") ? {
                        action: "pokeball",
                        idCard: tableauAssoc['idCard'],
                        set_name: tableauAssoc['set'],
                    } : {
                        action: "pokeball",
                        idCard: tableauAssoc['idCard'],
                        set_name: tableauAssoc['set'],
                        secondary_name: tableauAssoc['secondaireName']
                    };
                            
                    $('.plus').on("click", (e) =>{
                        e.stopPropagation();
                        var etatRequette = $('.etat').find('button').text();
                        data['etat'] = etatRequette; 
                        data['update'] = 1; 
                        pokeballRequette(data, $this);
                    })
                
                    $('.moins').on("click", (e) =>{
                        e.stopPropagation();
                        var etatRequette = $('.etat').find('button').text();
                        data['etat'] = etatRequette; 
                        data['update'] = -1; 
                        pokeballRequette(data, $this);
                    })
                
                
                
                    $(document).on("keyup", function(e) {
                        if (e.key === "Escape") { 
                            removePokeball(); 
                        }
                    });
                },
                error: function(xhr, status, error) {
                    console.error(xhr);
                }
            });
        }else{
            console.log(false);
        }
    });

    function pokeballRequette(data, thiss){
        $.ajax({
            url: host + "controller/pokemonAjaxController.php", 
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response['pokeball']);
                // thiss.css("opacity", "0.5");
                // thiss.css("opacity", "");
            },
            error: function(xhr, status, error) {
                console.error(xhr);
            }
        });
    }

    function removePokeball(){
        $(".cardEtatContenaire").remove();
        $(document).off('keydown');
    }


// hover pokeball
    $('.pokeball img').mouseenter(function() {
        $(this).siblings('.hover').css("display", "block");
    });
    
    $('.pokeball img').mouseleave(function() {
        $(this).siblings('.hover').css("display", "none");
    });

    
});


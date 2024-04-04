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
        removePokeball();
        var type = $(this).attr('class').split(' '); // Diviser la chaîne des classes par les espaces
        var name = $(this).attr('id');
        
        var ballSetId = $(this).find('.ballSetId').val();
        console.log(ballSetId);
        
        var regex = /(\w+)\s*:\s*\[([^\]]+)\]/g;
        var tableauAssoc = ballSetId.match(regex).reduce(function(acc, match) {
            var parts = match.split(/:\s*\[|\]/);
            acc[parts[0].trim()] = parts[1].trim();
            return acc;
        }, {});

        if(type[0] == "normal" || type[0] == "reverse" || type[0] == "special"){

            $(this).parent('.cardLegend').parent('.contenaireCard').find('.card').prepend(
                '<div class="cardEtatContenaire">' +
                '<div class="cardEtatReturn"><button class="returne"><i class="fa-solid fa-arrow-right fa-rotate-180"></i> retour</button></div>'  +
                '<div class="cardEtatTxt">vouler vous ajouter ou suprimer une carte ' + (type[0] == "normal" ? 'normal' : tableauAssoc['secondaireName']) + ' a ' + tableauAssoc['card_name'] + '</div>'  +
                '<div class="cardEtatbtn">' +
                    '<button class="plus"><i class="fa-solid fa-plus"></i></button>' +
                    '<button class="moins" ' + (tableauAssoc['user_card'] == 0 ? 'disabled' : '') + '><i class="fa-solid fa-minus"></i></button>' +
                '</div>' +
            '</div>');
                
            var data = (type[0] == "normal") ? {
                action: "pokeball",
                idCard: tableauAssoc['idCard'],
                set_name: tableauAssoc['set'],
                secondary_name: null
            } : {
                action: "pokeball",
                idCard: tableauAssoc['idCard'],
                set_name: tableauAssoc['set'],
                secondary_name: tableauAssoc['secondaireName']
            };
                    
            $('.plus').on("click", (e) =>{
                e.stopPropagation();
                pokeballRequette(data, 1);
            })

            $('.moins').on("click", (e) =>{
                e.stopPropagation();
                pokeballRequette(data, -1);
            })

            $('.cardEtatContenaire').on('click', function(e) {
                e.stopPropagation();
            });

            $(document).on("keyup", function(e) {
                if (e.key === "Escape") { 
                    removePokeball(); 
                }
            });

            $('.cardEtatBack, .cardEtatReturn').on('click', function(e){
                e.stopPropagation();
                removePokeball();
            })
        }else{
            console.log(false);
        }
    });

    function pokeballRequette(data, etat){
        data['etat'] = etat; 
        console.log(data);
        $.ajax({
            url: host + "controller/pokemonAjaxController.php", 
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response);
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


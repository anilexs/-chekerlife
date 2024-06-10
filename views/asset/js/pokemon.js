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
            dataType: 'json',
            success: function(response) {
                $('.cardContenaire').html(response['html']);
                $('.pokeball').click(function(){
                    pokeclick($(this));
                });
                
                $('.logo img').attr('src', '../../asset/img/tcg/pokemon/logo/'+response.setInfo.logo);
                $('.name').text(response.setInfo.name);
                $('.userCard').text(response.setInfo.possession);
                $('.setCard').text(response.setInfo.nb_card);
                
                ftrSize();
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    });

    var openSelect = false; 
    
    $('.selectContenaire').click(function(event) {
        event.stopPropagation();
        $('.blockSelect').stop(true, false);
        
        $(".selectArrow").toggleClass('rotate-90');

        if (openSelect == false) {
            $('.selectContenaire').css({ 
                borderTopLeftRadius: '10px', 
                borderTopRightRadius: '10px', 
                borderBottomRightRadius: '0px', 
                borderBottomLeftRadius: '0px' 
            });
            
            $('.selectOptContenaie').stop().animate({ height: '300px' }, 300);
            openSelect = true;
        } else {
            $('.selectOptContenaie').stop().animate({ height: '0' }, 300, function() {
                $('.selectContenaire').css({ borderRadius: '10px' });
            });            
            openSelect = false;
        }
    });

    $('.selectOptContenaie').click(function(event) {
        event.stopPropagation();
    });

    $('.selectOpt').click(function(event) {
        event.stopPropagation();
        var select = $(this).html();
        $(".optSelect").html(select);
        
        var energie = $('.energieBtn').map(function() { return this.id; }).get();
        var rarete = $('.rareteBtn').map(function() { return this.id; }).get();
        
        if(select == "Toutes les cartes"){
            selectOptReset(energie, rarete);
        }else if(select == "cartes Manquantes"){
            selectOptReset(energie, rarete);

            selectOptCardManquantes();
        }else if(select == "cartes Manquantes normales"){
            selectOptReset(energie, rarete);

            selectOptCardMnormales();
        }else if(select == "cartes Manquantes reverses"){
            selectOptReset(energie, rarete);

            selectOptCardMreverses();
        }else if(select == "Ma collection"){
            selectOptReset(energie, rarete);

            selectOptCardMcollection();
        }else{
            console.log(false);
        }
        ftrSize();
    });

    function selectOptReset(energie, rarete){
        // rafiche tout les carte en prenent compte des energy et des rarete
        energie.forEach(energie => {
            rarete.forEach(rarete => {
                var energieVal = $("#" + energie).css('opacity');
                var rareteVal = $("#" + rarete).css('opacity');
        
                if (energieVal == 1 && rareteVal == 1) {
                    $('.' + energie + '.' + rarete).css('display', '');
                } else {
                    $('.' + energie + '.' + rarete).css('display', 'none');
                }
            });
        });
    }
    
    function selectOptCardManquantes(){
        
        $('.contenaireCard').each(function() {
            var opacity = true;
        
            
            $(this).find('.pokeball img').each(function() {
                if ($(this).css("opacity") != "1") {
                    opacity = false; 
                    return false; 
                }
            });
        
            
            if (opacity) {
                $(this).css("display", "none");
            }
        });
    }
    
    function selectOptCardMnormales(){
        
        $('.contenaireCard').each(function() {
            var opacity = true;
        
            
            $(this).find('.normal img').each(function() {
                if ($(this).css("opacity") != "1") {
                    opacity = false; 
                    return false; 
                }
            });
        
            
            if (opacity) {
                $(this).css("display", "none");
            }
        });
    }
    
    function selectOptCardMreverses(){
       
        $('.contenaireCard').each(function() {
            var opacity = true;
        
            
            $(this).find('.reverse img').each(function() {
                if ($(this).css("opacity") != "1") {
                    opacity = false; 
                    return false; 
                }
            });
        
            
            if (opacity) {
                $(this).css("display", "none");
            }
        });
    }
    function selectOptCardMcollection(){
        
        $('.contenaireCard').each(function() {
            var opacity = true;
        
            
            $(this).find('.pokeball img').each(function() {
                if ($(this).css("opacity") == "1") {
                    opacity = false; // Si une image est complètement opaque, changer la valeur de allOpaque
                    return false; 
                }
            });
        
            // Si une des images sont opaques, appliquer le style
            if (opacity) {
                $(this).css("display", "none");
            }
        });
    }
    
    $('.btnRechercherSetOnOff').click(function(e) {
        $('.slideIcon').stop(true, false);
        $('.onoffCollor').stop(true, false);
        if ($(this).attr('id') == "off") {
            $(this).attr('id', 'on');
            $('.slideIcon').animate({
                borderWidth: '2px',
                borderColor: '#ADFF2F'
            }, 100);
            $('.onoffCollor').animate({ width: '100%' }, 100, function() {
                $('.onoffCollor').css('border-radius', '0');
            });
        } else {
            $(this).attr('id', 'off');
            $('.slideIcon').animate({
                borderWidth: '2px',
                borderColor: 'red'
            }, 100);
            $('.onoffCollor').animate({ width: '20px' }, 100, function() {
                $('.onoffCollor').css('border-radius', '0 50% 50% 0');
            });
        }

        var rechercher = $('.rechercher input').val().trim();
        if(rechercher != ""){
            console.log(true);
        }else{
            console.log(false);
        }
    });

    $('.rareteBtn, .setRareteBtn').click(function(e) {
        var nbRarete = $('.rareteBtn').length;
        var opacity = $(this).css('opacity');
        var rarete = $(this).attr('id');

        var select = $('.optSelect').text();

        var energie = $('.energieBtn').map(function() { return this.id; }).get();
        var rareteTab = $('.rareteBtn').map(function() { return this.id; }).get();
        
        if(rarete == "rareteAllOn"){
            $('#rareteAllOff').css('opacity', '1');
            $('.rareteBtn').css('opacity', '1');
            $('#' + rarete).css('opacity', '0.5');

            if(select == "Toutes les cartes"){
                energie.forEach(energie => {
                    var energieVal = $("#"+energie).css('opacity');
                    
                    if(energieVal == 1){
                        $('.'+energie).css('display', '');
                    }
                });
            }else{
                if(select == "cartes Manquantes"){
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        $(this).find('.pokeball img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false; 
                            }
                        });

                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "cartes Manquantes normales"){
                    
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        $(this).find('.normal img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false; 
                            }
                        });
                    
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "cartes Manquantes reverses"){
                    
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        $(this).find('.reverse img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false;
                            }
                        });
                    
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "Ma collection"){
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        $(this).find('.pokeball img').each(function() {
                            if ($(this).css("opacity") == "1") {
                                opacity = false; 
                                return false;
                            }
                        });
                    
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }
                energie.forEach(energie => {
                    var energieVal = $("#"+energie).css('opacity');

                    if(energieVal != 1){
                        $('.'+energie).css('display', 'none');
                    }
                });
        }
        }else if(rarete == "rareteAllOff"){
            $('#rareteAllOn').css('opacity', '1');
            $('.rareteBtn').css('opacity', '0.5');
            $('.rareteBtn, #' + rarete).css('opacity', '0.5');
            $('.contenaireCard').css('display', 'none');
        }else{
            if(opacity == 1){
                $(this).css('opacity', '0.5');
                $('.'+rarete).css('display', 'none');
            }else{
                $(this).css('opacity', '1');
                if(select == "Toutes les cartes"){
                    energie.forEach(energie => {
                        rareteTab.forEach(rarete => {
                            var energieVal = $("#" + energie).css('opacity');
                            var rareteVal = $("#" + rarete).css('opacity');
                    
                            if (energieVal == 1 && rareteVal == 1) {
                                $('.' + energie + '.' + rarete).css('display', '');
                            } else {
                                $('.' + energie + '.' + rarete).css('display', 'none');
                            }
                        });
                    });
                }else{
                    if(select == "cartes Manquantes"){
                        $('.contenaireCard').each(function() {
                            var opacity = true;
                        
                            $(this).find('.pokeball img').each(function() {
                                if ($(this).css("opacity") != "1") {
                                    opacity = false; 
                                    return false; 
                                }
                            });
                        
                            if (!opacity) {
                                $(this).css("display", "");
                            }else{
                                $(this).css("display", "none");
                            }
                        });
                    }else if(select == "cartes Manquantes normales"){
                        $('.contenaireCard').each(function() {
                            var opacity = true;
                        
                            $(this).find('.normal img').each(function() {
                                if ($(this).css("opacity") != "1") {
                                    opacity = false;
                                    return false;
                                }
                            });
                        
                            if (!opacity) {
                                $(this).css("display", "");
                            }else{
                                $(this).css("display", "none");
                            }
                        });
                    }else if(select == "cartes Manquantes reverses"){
                        $('.contenaireCard').each(function() {
                            var opacity = true;
                        
                            $(this).find('.reverse img').each(function() {
                                if ($(this).css("opacity") != "1") {
                                    opacity = false;
                                    return false;
                                }
                            });
                        
                            if (!opacity) {
                                $(this).css("display", "");
                            }else{
                                $(this).css("display", "none");
                            }
                        });
                    }else if(select == "Ma collection"){
                        $('.contenaireCard').each(function() {
                            var opacity = true;
                        
                            $(this).find('.pokeball img').each(function() {
                                if ($(this).css("opacity") == "1") {
                                    opacity = false;
                                    return false;
                                }
                            });
                        
                            if (!opacity) {
                                $(this).css("display", "");
                            }else{
                                $(this).css("display", "none");
                            }
                        });
                    }

                    // enleve les carte indesirable apr leur rarete et leur energy
                    rareteTab.forEach(rarete => {
                        var rareteVal = $("#"+rarete).css('opacity');
    
                        if(rareteVal != 1){
                            $('.'+rarete).css('display', 'none');
                        }
                    });
                    energie.forEach(energie => {
                        var energieVal = $("#"+energie).css('opacity');
    
                        if(energieVal != 1){
                            $('.'+energie).css('display', 'none');
                        }
                    });
                }
            }
            
            var count = $('.rareteBtn').filter((_, el) => $(el).css('opacity') == '0.5').length;
            if(count == 0){
                $('#rareteAllOff').css('opacity', '1');
                $('#rareteAllOn').css('opacity', '0.5');
            }else if(count == nbRarete){
                $('#rareteAllOff').css('opacity', '0.5');
            }else if(count <= nbRarete){
                $('#rareteAllOff').css('opacity', '1');
                $('#rareteAllOn').css('opacity', '1');
            }else{
                $('#rareteAllOn').css('opacity', '1');
            }
        } 

        ftrSize();
    })

    
    $('.energieBtn, .setEnergieBtn').click(function(e) {
        var nbEnergy = $('.energieBtn').length;
        var opacity = $(this).css('opacity');
        var energie = $(this).attr('id');

        var select = $('.optSelect').text();

        var rarete = $('.rareteBtn').map(function() { return this.id; }).get();
        
        if(energie == "allOn"){
            $('#allOff').css('opacity', '1');
            $('.energieBtn').css('opacity', '1');
            $('#' + energie).css('opacity', '0.5');
            
            if(select == "Toutes les cartes"){
                rarete.forEach(rarete => {
                    var rareteVal = $("#"+rarete).css('opacity');
                    
                    if(rareteVal == 1){
                        $('.'+rarete).css('display', '');
                    }
                });
            }else{
                if(select == "cartes Manquantes"){
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        
                        $(this).find('.pokeball img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false; 
                            }
                        });
                    
                        
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "cartes Manquantes normales"){
                    
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        
                        $(this).find('.normal img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false; 
                            }
                        });
                    
                        
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "cartes Manquantes reverses"){
                    
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        
                        $(this).find('.reverse img').each(function() {
                            if ($(this).css("opacity") != "1") {
                                opacity = false; 
                                return false; 
                            }
                        });
                    
                        
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }else if(select == "Ma collection"){
                    
                    $('.contenaireCard').each(function() {
                        var opacity = true;
                    
                        
                        $(this).find('.pokeball img').each(function() {
                            if ($(this).css("opacity") == "1") {
                                opacity = false; // Si une image est complètement opaque, changer la valeur de allOpaque
                                return false; 
                            }
                        });
                    
                        // Si une des images sont opaques, appliquer le style
                        if (!opacity) {
                            $(this).css("display", "");
                        }else{
                            $(this).css("display", "none");
                        }
                    });
                }
                rarete.forEach(rarete => {
                    var rareteVal = $("#"+rarete).css('opacity');
                    
                    if(rareteVal != 1){
                        $('.'+rarete).css('display', 'none');
                    }
                });
        }
        }else if(energie == "allOff"){
            $('#allOn').css('opacity', '1');
            $('.energieBtn').css('opacity', '0.5');
            $('.energieBtn, #' + energie).css('opacity', '0.5');
            $('.contenaireCard').css('display', 'none');
        }else{
            if(opacity == 1){
                $(this).css('opacity', '0.5');
                $('.'+energie).css('display', 'none');
            }else{
                $(this).css('opacity', '1');
                rarete.forEach(rarete => {
                    var rareteVal = $("#"+rarete).css('opacity');
                    
                    if(rareteVal == 1){
                        $('.'+energie + '.'+rarete).css('display', '');
                    }
                });
            }
            
            var count = $('.energieBtn').filter((_, el) => $(el).css('opacity') == '0.5').length;
            if(count == 0){
                $('#allOff').css('opacity', '1');
                $('#allOn').css('opacity', '0.5');
            }else if(count == nbEnergy){
                $('#allOff').css('opacity', '0.5');
            }else if(count <= nbEnergy){
                $('#allOff').css('opacity', '1');
                $('#allOn').css('opacity', '1');
            }else{
                $('#allOn').css('opacity', '1');
            }
        } 

        ftrSize();
    })
    
    $('.card').click(function(e) {
        e.stopPropagation();
        console.log('card click');
    })
    
    $('.pokeball').click(function(){
        pokeclick($(this));
    });

    function pokeclick(self){

        var $this = self;
        removePokeball();
        var type = $this.attr('class').split(' '); // Diviser la chaîne des classes par les espaces
        var name = $this.attr('id');
        
        var ballSetId = $this.find('.ballSetId').val();
        
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
    }
    // });

    function pokeballRequette(data, $this){
        $.ajax({
            url: host + "controller/pokemonAjaxController.php", 
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {
                console.log(response['pokeball']);
                // $this.css("opacity", "0.5");
                // $this.css("opacity", "");
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


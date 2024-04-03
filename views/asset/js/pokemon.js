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
                $('.card').html(response);
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    });
    
    $('.card').click(function() {
        console.log('card click');
    })
});


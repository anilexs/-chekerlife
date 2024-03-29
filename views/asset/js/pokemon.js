ftrSize();

$(document).ready(function() {
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
});


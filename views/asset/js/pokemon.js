ftrSize();

$(document).ready(function() {
    $('.block').click(function() {
        var hauteur = $(this).css('height');
        console.log(hauteur);
        if(hauteur === 'auto'){
            $(this).css("height", "50px");
        }else{
            $(this).css("height", "auto");
        }
    })
});


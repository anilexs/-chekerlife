var $menu = $('.menu');
$(document).on('click', '.navParametre', function(e) {
    e.stopPropagation();
    var defauxHeight = $menu.height();
    $menu.stop().css({ height: defauxHeight });
    $menu.slideUp();

    $('body').css({
        'overflow': 'hidden'
    });
    var back = $('<div class="parametreBack"></div>');
        $('body').prepend(back);
    var left = $('<div class="parametreLeft"></div>');
        left.append('<button id="parametreReturn"><i class="fa-solid fa-arrow-right fa-rotate-180"></i> retour</button>');

    var right = $('<div class="parametreRight"></div>');
        $('.parametreBack').append(left, right);


    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            parametreReturn();
        }
    });
});

$(document).on('click', '#parametreReturn', function(e) {
    parametreReturn();
})

function parametreReturn(){
    $('.parametreBack').remove();
    $('body').css('overflow', '');
    $(document).off('keydown');
}
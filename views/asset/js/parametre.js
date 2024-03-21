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
        $('.parametreBack').append(left);

});
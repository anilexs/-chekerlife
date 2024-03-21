$(document).on('click', '.navParametre', function(e) {
    $('body').css({
        'overflow': 'hidden'
    });
    var back = $('<div class="parametreBack"></div>');
        $('body').prepend(back);
    var left = $('<div class="parametreLeft"></div>');
        $('.parametreBack').append(left);

});
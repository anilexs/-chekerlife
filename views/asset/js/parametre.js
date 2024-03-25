var $menu = $('.menu');

function parametre(page = 'profil'){
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

    var list = $('<ul class="parametreUl"></ul>');
        list.append('<li><button id="parametreComte">mon compte</button></li>');
        $(document).on('click', '#parametreComte', function(e) {
            myAcount();
        })

        list.append('<li><button id="parametreProfil">profils</button></li>');
        $(document).on('click', '#parametreProfil', function(e) {
            myProfil();
        })
        
        list.append('<li><button id="parametreConf">confidentialite & securite</button></li>');
        $(document).on('click', '#parametreConf', function(e) {
            mySecuAndConf();
        })
        
        list.append('<li><button id="parametreFriend">demandes d\'amis</button></li>');
        $(document).on('click', '#parametreFriend', function(e) {
            myFriend();
        })

        list.append('<li><button id="parametreSociaux">réseaux sociaux</button></li>');
        $(document).on('click', '#parametreSociaux', function(e) {
            console.log('parametreSociaux');
        })

        left.append(list);
    

    var right = $('<div class="parametreRight"></div>');
        $('.parametreBack').append(left, right);


    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            parametreReturn();
        }
    });
}

$(document).on('click', '#parametreReturn', function(e) {
    parametreReturn();
})

function parametreReturn(){
    $('.parametreBack').remove();
    $('body').css('overflow', '');
    $(document).off('keydown');
}

function myAcount(){
    console.log('parametreComte');
}

function myProfil(){
    console.log('parametreProfil');
}

function mySecuAndConf(){
    console.log('parametreConf');
}

function myFriend(){
    console.log('parametreFriend');
}
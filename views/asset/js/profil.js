urlAjax = "http://localhost/!chekerlife/controller/UserAjaxConroller.php";

$(document).ready(function () {
    $('img').on('dragstart', function (e) {
        e.preventDefault();
    });
    $('.divImgProfil').on('contextmenu', function (e) {
        e.preventDefault();
    });
});
function level(user) {
    $.ajax({
        url: urlAjax,
        type: 'POST',
        data: {
            action: "level",
            user: user,
        },
        dataType: 'json',
        success: function (response) {
            level = response['xp'];
            if(level < 1000){
                level = 1;
            }else if(level >= 1000 && level < 2000){
                level = 2;
            }else if(level >= null && level < null){
                level = 3;
            }else if(level >= null && level < null){
                level = 4;
            }else if(level >= null && level < null){
                level = 5;
            }else if(level >= null && level < null){
                level = 6;
            }else if(level >= null && level < null){
                level = 7;
            }else if(level >= null && level < null){
                level = 8;
            }else if(level >= null && level < null){
                level = 9;
            }else if(level >= null && level < null){
                level = 10;
            }else if(level >= null && level < null){
                level = 11;
            }else if(level >= null && level < null){
                level = 12;
            }else if(level >= null && level < null){
                level = 13;
            }else if(level >= null && level < null){
                level = 14;
            }
            $('#lvl').text(level);
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        }
    });
}

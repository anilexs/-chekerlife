function likeList (catalog_id){
    $.ajax({
        type: "POST",
        url: "http://localhost/!chekerlife/views/traitement/ajax.php",
        data: {
            action: "like",
            catalog_id: catalog_id
        },
        dataType: "json",
        success: function (response) {
            if(response['connect'] == false){
                window.location.href = "http://localhost/!chekerlife/connexion";
            }else{
                if(response['message'] == true){
                    $(".likeCollor" + catalog_id).css("color", "red");
                    $(".likeId" + response['CatalogInfo']['id_catalogue']).css("color", "white");
                }else{
                    $(".likeCollor" + catalog_id).css("color", "white");
                    $(".likeId" + response['CatalogInfo']['id_catalogue']).css("color", "black");
                }
                
                if (response['CatalogInfo']['likes'] < 1000){
                    $("." + catalog_id).text(response['CatalogInfo']['likes']);
                }else if(response['CatalogInfo']['likes'] >= 1000 && response['CatalogInfo']['likes'] < 10000){
                    $("." + catalog_id).text(response['CatalogInfo']['likes']);
                }
                $("#likeId" + catalog_id).text(response['CatalogInfo']['likes']);
                $("#likeCount").text(response['nbLike']);
                $likeCount = response['nbLike'];
            }
        }
    });
}

function views (epViews){
    $.ajax({
        type: "POST",
        url: "http://localhost/!chekerlife/views/traitement/ajax.php",
        data: {
            action: "views",
            epViews: epViews
        },
        dataType: "json",
        success: function (response) {
            
        }
    });
}


$(document).ready(function(){
    var $profilButton = $('.btnCollection');
    var $menu = $('.collection');
    
    $profilButton.click(function(event){
      $('#icon').toggleClass('fa-rotate-90');
      event.stopPropagation();
      if ($menu.is(":animated")) {
        var currentHeight = $menu.height();
        $menu.stop().css({ height: currentHeight });
      }
      $menu.slideToggle(function() {
        ftrSize();
      });
    });

    $('.chekboxViews').click(function() {
      if ($(this).is(':checked')) {
        console.log('Le checkbox est coché !');
      } else {
        console.log('Le checkbox est décoché !');
      }
    });
});


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

                if($likeCount < 10){
                    $("#likeCount").css({     
                        right: "11.5px",
                        top: "9px"        
                      });       
                }else if ($likeCount >= 10 && $likeCount < 100){
                    $("#likeCount").css({
                        right: "8px",
                        top: "8px"
                    });
                }else if($likeCount >= 100 && $likeCount < 1000){
                    $("#likeCount").css({     
                      right: "5px"        
                    });
                }
            }
        }
    });
}
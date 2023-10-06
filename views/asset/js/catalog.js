function catalogViews(page, itemsPerPage) {
    $.ajax({
        url: 'traitement/ajax.php',
        type: 'POST',
        data: {
            action: "catalog",
            page: page,
            itemsPerPage: itemsPerPage
        },
        dataType: 'html',
        success: function (response) {
            $('#catalog').html(response);
        },
        error: function (xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function catalogFiltre($filtre){
    $.ajax({
        url: 'traitement/ajax.php', 
        type: 'POST',
        data: {
            action: "filtre",
            filtre: $filtre,
        },
        dataType: 'html',
        success: function(response) {
            $('#catalog').html(response);
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

function like (catalog_id){
    $.ajax({
        type: "POST",
        url: "traitement/ajax.php",
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
                    $("#" + catalog_id).css("color", "red");
                    $("#likeId" + response['CatalogInfo']['id_catalogue']).css("color", "white");
                }else{
                    $("#" + catalog_id).css("color", "white");
                    $("#likeId" + response['CatalogInfo']['id_catalogue']).css("color", "black");
                }
                
                if (response['CatalogInfo']['likes'] < 1000){
                    $("." + catalog_id).text(response['CatalogInfo']['likes']);
                }else if(response['CatalogInfo']['likes'] >= 1000 && response['CatalogInfo']['likes'] < 10000){
                    $("." + catalog_id).text(response['CatalogInfo']['likes']);
                }
                $("#likeCount").text(response['nbLike']);
                $likeCount = response['nbLike'];

                if($likeCount < 10){
                    $("#likeCount").css({     
                        right: "10px"        
                      });       
                }else if ($likeCount >= 10 && $likeCount < 100){
                    $("#likeId" + catalog_id).css({
                        left: "12px"
                    });
                }else if($likeCount >= 100 && $likeCount < 1000){
                    $("#likeCount").css({     
                      right: "5px"        
                    });
                }

                likePosition(response['CatalogInfo']['id_catalogue'], response['CatalogInfo']['likes']);
            }
        }
    });
}

$(document).ready(function () {
    $("#rechercherCategorie").on("input", function(event) {
        var searchTerm = $(this).val();
        $("#catalog").html("");
        switch(searchTerm){ 
            case "":
                catalogViews();
                break
            default:
                catalogFiltre(searchTerm);
                break
        }
    });
});

function likePosition(catalog_id, $like = null) {
    var $like;
    if($like == null){
        nbLike = $("#likeId" + catalog_id).text();
    }else{
        nbLike = $like;
    }

    if (nbLike < 10) {
        $("#likeId" + catalog_id).css({
            "left": "16px",
            "top": "13px"
        });
    } else if (nbLike >= 10 && nbLike < 100) {
        $("#likeId" + catalog_id).css({
            "left": "12px",
            "top": "13px"
        });
    } else if (nbLike >= 100 && nbLike < 1000) {
        $("#likeId" + catalog_id).css({
            "left": "8.5px",
            "top": "11px"
        });
    } else if (nbLike >= 1000 && nbLike < 10000) {
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $("." + catalog_id).text(tabLike[0] + "," + tabLike[1] + "K");
        $("#likeId" + catalog_id).css({
            "font-size": "11px",
            "left": "9px",
            "top": "13px"
        });
    }else if(nbLike >= 10000 && nbLike < 100000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $("." + catalog_id).text(tabLike[0] + tabLike[1] + "K");
        $("#likeId" + catalog_id).css({
            "font-size": "11px",
            "left": "9px",
            "top": "14px"
        });
    }else if(nbLike >= 100000 && nbLike < 1000000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $("." + catalog_id).text(tabLike[0] + tabLike[1] + tabLike[1] + "K");
        $("#likeId" + catalog_id).css({
            "font-size": "10px",
            "left": "8px",
            "top": "14px"
        });
    }else if(nbLike >= 1000000 && nbLike < 10000000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $("." + catalog_id).text(tabLike[0] + "M");
        $("#likeId" + catalog_id).css({
            "font-size": "10px",
            "left": "13px",
            "top": "15px"
        });
    }
}





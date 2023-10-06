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
                }else{
                    $("#" + catalog_id).css("color", "white");
                }
                $("." + catalog_id).text(response['CatalogInfo']['likes']);
                $("#likeCount").text(response['nbLike']);
                $likeCount = response['nbLike'];

                if($likeCount < 10){
                    $("#likeCount").css({     
                        right: "10px"        
                      });       
                }else if ($likeCount >= 10 && $likeCount < 100){
                    $("#likeCount").css({     
                        right: "8px"        
                      });
                }else if($likeCount >= 100 && $likeCount < 1000){
                    $("#likeCount").css({     
                      right: "5px"        
                    });
                }

                if(response['nbLike'] < 10){
                    $("#likeId" + catalog_id).css({
                        left: "14px"
                    });
                } else if (response['nbLike'] >= 10 && response['nbLike'] < 100) {
                    console.log("10 < 100");
                    $("#likeId" + catalog_id).css({
                        left: "8px"
                    });
                }
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

function likePosition(catalog_id) {
    nbLike = $("#likeId" + catalog_id).text();
    console.log(nbLike);

    if (nbLike < 10) {
        $("#likeId" + catalog_id).css({
            left: "14px"
        });
    } else if (nbLike >= 10 && nbLike < 100) {
        console.log("10 < 100");
        $("#likeId" + catalog_id).css({
            left: "8px"
        });
    } else if (nbLike >= 100 && nbLike < 1000) {
        $("#likeId" + catalog_id).css({
            left: "5px"
        });
    } else {
        $("#likeId" + catalog_id).css({
            left: "10px"
        });
    }
}





// $(".like").click(function() {
//     var likeID = $(this).attr("id");
//     console.log(likeID);
// });

function catalogViews(){
    $.ajax({
        url: 'traitement/ajax.php', // Remplacez 'votre-fichier-php.php' par le chemin vers votre fichier PHP
        type: 'POST', // Vous pouvez également utiliser POST si nécessaire
        data: {
            action: "catalog",
        },
        dataType: 'html',
        success: function(response) {
            $('#catalog-container').html(response);
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
                
                $("#likeCount").text(response['nbLike']);
                $likeCount = response['nbLike'];
                if($likeCount < 10){
                    $("#likeCount").css({     
                        right: "10px"        
                      });       
                }else{
                    $("#likeCount").css({     
                        right: "8px"        
                      });
                }
            }
        }
    });
}


$("#rechercherCategorie").on("input", function(event) {
    var searchTerm = $(this).val();
    $("#catalog").html("");
    // switch(searchTerm){
    //     case "":
    //         break
    //     default:
    //         break
    // }
});


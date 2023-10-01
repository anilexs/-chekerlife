// $(".like").click(function() {
//     var likeID = $(this).attr("id");
//     console.log(likeID);
// });

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
    });
}

$("#rechercherCategorie").on("input", function(event) {
    var searchTerm = $(this).val();
});


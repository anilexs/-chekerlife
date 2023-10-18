$(document).ready(function(){
$likeCount = $("#likeCount").text();
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

  var $profilButton = $('.profil');
  var $menu = $('.menu');
  
  // Gestionnaire de clic sur le bouton "profil"
  $profilButton.click(function(event){
    event.stopPropagation(); // Empêche la propagation du clic au document
    if ($menu.is(":animated")) {
      var currentHeight = $menu.height();
      $menu.stop().css({ height: currentHeight });
    }
    $menu.slideToggle();
  });

  // Gestionnaire de clic sur le document entier
  $(document).click(function(event){
    if (!$(event.target).closest('.menu').length && !$(event.target).hasClass('profil')) {
      if ($menu.is(":animated")) {
        var currentHeight = $menu.height();
        $menu.stop().css({ height: currentHeight });
      }
      $menu.slideUp();
    }
  });
});

function navFiltre($filtre){
    $.ajax({
        url: 'http://localhost/!chekerlife/views/traitement/ajax.php', 
        type: 'POST',
        data: {
            action: "navFiltre",
            filtreNav: $filtre,
        },
        dataType: 'html',
        success: function(response) {
            $('#contenaireNavRecherche').html(response);
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite lors du chargement du contenu.');
        }
    });
}

$(document).ready(function () {
    $("#navRechercherBar").on("input", function(event) {
        var searchTerm = $(this).val();
        $("#contenaireNavRecherche").html("");
        switch(searchTerm){ 
            case "":
                $('#contenaireNavRecherche').hide();
                break
            default:
                $('#contenaireNavRecherche').show();
                navFiltre(searchTerm);
                break
        }
    });

        // Gestionnaire d'événement pour afficher l'ul au clic sur l'input
        $('#navRechercherBar').click(function(event) {
            var searchTerm = $(this).val();
            $('#contenaireNavRecherche').show();
            switch(searchTerm){ 
            case "":
                $('#contenaireNavRecherche').hide();
                break
            default:
              navFiltre(searchTerm);
              break
            }
            event.stopPropagation(); // Empêche la propagation du clic au document
        });

        $(document).click(function(event){
        if (!$(event.target).closest('#contenaireNavRecherche').length && !$(event.target).closest('#inputRecherche').length) {
                $('#contenaireNavRecherche').hide();
                $("#contenaireNavRecherche").html("");
            }
        });
    });

    function like (catalog_id){
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

                likePosition(response['CatalogInfo']['id_catalogue'], response['CatalogInfo']['likes']);
            }
        }
    });
}

function nbLike(catalog_id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost/!chekerlife/views/traitement/ajax.php',
        data: {
            action: "catalogNbLike",
            id_catalog: catalog_id,
        },
        dataType: "json",
        success: function(response) {
            console.log(response['catalogNbLike'][0]);
        },
        error: function(xhr, status, error) {
            console.error('Une erreur s\'est produite : ' + error);
        }
    });

}

function likePosition(catalog_id, $like = null) {
    var $like;
    var nbLike;
    if($like == null){
        nbLike = $("#likeId" + catalog_id).text();
        nbLike2 = $(".likeId" + catalog_id).text();
    }else{
        nbLike = $like;
    }
    console.log(nbLike2 + " .");
    console.log(nbLike + " #");

    if (nbLike < 10) {
        $(".likeId" + catalog_id).css({
            "left": "16px",
            "top": "13px"
        });
    } else if (nbLike >= 10 && nbLike < 100) {
        $(".likeId" + catalog_id).css({
            "left": "12px",
            "top": "13px"
        });
    } else if (nbLike >= 100 && nbLike < 1000) {
        $(".likeId" + catalog_id).css({
            "left": "8.5px",
            "top": "11px"
        });
    } else if (nbLike >= 1000 && nbLike < 10000) {
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $(".likeId" + catalog_id).text(tabLike[0] + "," + tabLike[1] + "K");
            $("#" + catalog_id).text(tabLike[0] + "," + tabLike[1] + "K");
        $(".likeId" + catalog_id).css({
            "font-size": "11px",
            "left": "8px",
            "top": "14px"
        });
    }else if(nbLike >= 10000 && nbLike < 100000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $(".likeId" + catalog_id).text(tabLike[0] + tabLike[1] + "K");
            $("#" + catalog_id).text(tabLike[0] + tabLike[1] + "K");
        $(".likeId" + catalog_id).css({
            "font-size": "11px",
            "left": "9px",
            "top": "14px"
        });
    }else if(nbLike >= 100000 && nbLike < 1000000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $(".likeId" + catalog_id).text(tabLike[0] + tabLike[1] + tabLike[1] + "K");
            $("#" + catalog_id).text(tabLike[0] + tabLike[1] + tabLike[1] + "K");
        $(".likeId" + catalog_id).css({
            "font-size": "10px",
            "left": "8px",
            "top": "14px"
        });
    }else if(nbLike >= 1000000 && nbLike < 10000000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $(".likeId" + catalog_id).text(tabLike[0] + "," + tabLike[1] + "M");
            $("#" + catalog_id).text(tabLike[0] + "," + tabLike[1] + "M");
        $(".likeId" + catalog_id).css({
            "font-size": "10px",
            "left": "8px",
            "top": "15px"
        });
    }else if(nbLike >= 10000000 && nbLike < 100000000){
        var likestr = nbLike.toString();
            tabLike = likestr.split("");
            $(".likeId" + catalog_id).text(tabLike[0] + tabLike[1] + "M");
            $("#" + catalog_id).text(tabLike[0] + tabLike[1] + "M");
        $(".likeId" + catalog_id).css({
            "font-size": "10px",
            "left": "10px",
            "top": "15px"
        });
    }
    // list des numero
    // 1 = 1
    // 10 = 10
    // 100 = 100
    // 1,000 = 1k (ou 1,000)
    // 10,000 = 10k
    // 100,000 = 100k
    // 1,000,000 = 1M (ou 1,000k)
    // 10,000,000 = 10M
    // 100,000,000 = 100M
    // 1,000,000,000 = 1G (ou 1,000M)
    // 10,000,000,000 = 10G
    // 100,000,000,000 = 100G
    // 1,000,000,000,000 = 1T (ou 1,000G)
    // 10,000,000,000,000 = 10T
    // 100,000,000,000,000 = 100T
    // 1,000,000,000,000,000 = 1P (ou 1,000T)
    // 10,000,000,000,000,000 = 10P
    // 100,000,000,000,000,000 = 100P
}
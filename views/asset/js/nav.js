$(document).ready(function(){
$likeCount = $("#likeCount").text();
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
            navFiltre(searchTerm);
            event.stopPropagation(); // Empêche la propagation du clic au document
        });

        $(document).click(function(event){
        if (!$(event.target).closest('#contenaireNavRecherche').length && !$(event.target).closest('#inputRecherche').length) {
                $('#contenaireNavRecherche').hide();
            }
        });
    });
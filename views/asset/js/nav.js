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

$(document).ready(function(){
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
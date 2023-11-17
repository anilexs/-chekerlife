function ftrSize() {
    var footer = document.getElementById('footer');
    if (document.body.scrollHeight > window.innerHeight) {
        // Il y a une barre de défilement, désactivez la position fixe du pied de page
        footer.style.position = 'static';
        footer.style.bottom = 'auto'; // Désactive "bottom: 0"
    } else {
        // Aucune barre de défilement, rétablissez la position absolue du pied de page avec "bottom: 0"
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
    }
}

$(document).ready(function() {
    var imageCliquable = $('<img>', {
      id: 'chibi',
      src: host + 'asset/img/chibi/miku-reverse.png',
    });
  
    imageCliquable.click(function() {
      // Animation d'explosion de feux d'artifice
      $(this).effect('explode', {
        pieces: 100,   // Nombre de pièces
        easing: 'easeOutQuad',  // Courbe d'animation
        duration: 1000  // Durée de l'animation en millisecondes
      });
    });
  
    $('body').prepend(imageCliquable);
    $('#chibi').css({
      width: '80px',
      height: '100px',
      position: 'absolute',
      top: '0px',
      zIndex: 1
    });
  
    $('#chibi').animate({
      top: '+=50px',
    }, 1000); 
});


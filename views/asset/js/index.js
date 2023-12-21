$(document).ready(function(){
    animateText();
});

function animateText() {
    var text = $("#animated-text");
    var words = text.text().split(" ");
    text.empty();

    for (var i = 0; i < words.length; i++) {
        if (i > 0) {
            text.append(" "); // Ajouter un espace entre les mots
        }

        var word = words[i];
        if (word === " ") {
            // Si le mot est un espace, ajouter un espace non animé
            text.append("<span style='display:inline-block;margin-right:0.3em;'>&nbsp;</span>");
        } else {
            var span = $("<span style='display:inline-block;opacity:0;transition:opacity 0.5s;'>" + word + "</span>");
            text.append(span);

            span.delay(7 * i).animate({opacity: 1}, 500);
        }
    }
}
$(document).ready(function () {
      var isDragging = false;
      var initialPosition = 0;

      $('.custom-scrollbar').mousedown(function (e) {
        isDragging = true;
        initialPosition = e.clientX - $('.custom-scrollbar').position().left;
      });

      $(document).mouseup(function () {
        isDragging = false;
      });

      $(document).mousemove(function (e) {
        if (isDragging) {
          var newPosition = e.clientX - initialPosition;
          var maxWidth = $('.lastCatalog').width() - $('.custom-scrollbar').width();

          if (newPosition >= 0 && newPosition <= maxWidth) {
            $('.custom-scrollbar').css('left', newPosition);
            var scrollPercentage = newPosition / maxWidth;
            var maxScroll = $('.catalogDiv')[0].scrollWidth - $('.lastCatalog').width();
            var newScroll = scrollPercentage * maxScroll;
            $('.catalogDiv').scrollLeft(newScroll);
          }
        }
      });
    });
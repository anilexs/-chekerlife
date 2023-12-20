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

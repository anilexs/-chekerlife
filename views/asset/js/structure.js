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
var lastAdd;

$.ajax({
    url: host + "controller/CatalogAjaxController.php",
    type: "POST",
    data: {
        action: "lastAdd",
    },
    dataType: "json",
    success: function (response) {
        lastAdd = response['lastAdd'];
    }
});

// Attendre un certain temps (par exemple, 1 seconde) pour la requête AJAX
setTimeout(function () {
    console.log(lastAdd); // Vous pouvez accéder à lastAdd ici
}, 100); // Attendez 1 seconde (1000 millisecondes)
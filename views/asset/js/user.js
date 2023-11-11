$(document).ready(function(){
    var host = "http://localhost/!chekerlife/";
    $("#deconnexion").on("click", function(e) {

        $.ajax({
            url: 'form/UserForm.php',
            type: 'POST',
            data: {
                action: "deconnexion",
            },
            dataType: 'html',
            success: function (response) {
                window.location.href = host;
            },
            error: function (xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    })
})
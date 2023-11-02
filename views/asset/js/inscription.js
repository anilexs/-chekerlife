$(document).ready(function(){
    $("#formInscription").on("submit", function(e) {
        e.preventDefault();
        var pseudo = $('#pseudo').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var Newslatter = $('#Newslatter').is(":checked");
        
        
        var blackListName = ["pute", "salop", "con"];
        var blackListMots = ["pute", "salop", "con"];
        var isBlacklisted = false;
        var pseudoToCheck = pseudo.toLowerCase();
        for (var i = 0; i < blackListName.length; i++) {
            if (blackListName[i].toLowerCase() === pseudoToCheck) {
                isBlacklisted = true;
                break; // Si le pseudo est trouvé, inutile de continuer à parcourir la liste
            }
        }
        if(isBlacklisted !== true){
            // Vérifier si le pseudo contient des mots de la liste blackListMots
            for (var j = 0; j < blackListMots.length; j++) {
                if (pseudoToCheck.includes(blackListMots[j].toLowerCase())) {
                    isBlacklisted = true;
                    break;
                }
            }
        }
        
        if(pseudo == "" || email == "" || password == "" || isBlacklisted == true){
            console.log("vide");
        }else{
            $.ajax({
                url: 'traitement/userAjax.php',
                type: 'POST',
                data: {
                    action: "inscription",
                    pseudo: pseudo,
                    email: email,
                    password: password,
                    Newslatter: Newslatter,
                },
                dataType: 'json',
                success: function (response) {
                    console.log("sucesse");
                },
                error: function (xhr, status, error) {
                    console.error('Une erreur s\'est produite lors du chargement du contenu.');
                }
            });
        }

    });
});
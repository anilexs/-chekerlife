$(document).ready(function(){
    var host = "http://localhost/!chekerlife/";
    $("#formInscription").on("submit", function(e) {
        e.preventDefault();
        var errorTab = [];
        var pseudo = $('#pseudo').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var Newslatter = $('#Newslatter').is(":checked");
        pseudo = pseudo.trim().replace(/\s+/g, ' ');
        var pseudoVerify = pseudo.replace(/\s/g, '');

        
        
        var blackListName = ["pute", "salop", "con", "vendetta"];
        var blackListMots = ["pute", "salop", "con", "vendetta"];
        var isBlacklisted = false;
        var pseudoToCheck = pseudo.toLowerCase();
        for (var i = 0; i < blackListName.length; i++) {
            if (blackListName[i].toLowerCase() === pseudoToCheck) {
                isBlacklisted = true;
                break; // Si le pseudo est trouvé, inutile de continuer à parcourir la liste
            }
        }
        // Vérifier si le pseudo contient des mots de la liste blackListMots
        for (var j = 0; j < blackListMots.length; j++) {
            if (pseudoToCheck.includes(blackListMots[j].toLowerCase())) {
                isBlacklisted = true;
                break;
            }
        }
        
        if(pseudo == "" || email == "" || password == "" || isBlacklisted == true || pseudoVerify.length <= 3){
            if(pseudo == ""){
                var pseudo = "le pseudo choisir n'est pas disponible sur ce site";
                errorTab.push(pseudo);
            }
            if(pseudoVerify.length <= 3){
                $("#pseudo").css("border", "3px solid red");
                var pseudoError = "le speudo doit avoir entre 3 et ? de caracter";
                errorTab.push(pseudoError);
            }
            if(email == ""){
                $("#email").css("border", "3px solid red");
                var email = "l'email ne pas conforme";
                errorTab.push(email);
            }
            if(password == ""){
                $("#password").css("border", "3px solid red");
                var password = "le password choisir ne corespon pas a nos attente";
                errorTab.push(password);
            }

            $('#right').text("");
            $("#right").css({
                "background-image":  "url(none)",
            });

            var error = $('<div>').attr('id', 'error');
            $('#right').append(error);
            
            var gif = $('<div>').attr('id', 'errorGif');
            $('#right').append(gif);


            errorTab.forEach(element => {
                var errorDiv = $('<div>').addClass('error').html('<i class="fa-solid fa-star" style="color: #ff0000;"></i>' + element);
                $('#error').append(errorDiv);
            });

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

    $('#btnReinitialiser').on('click', function() {
        $('#right').text("");
        $("#pseudo").css("border", "3px solid transparent");
        $("#right").css({
            "background": "url("+host+"views/asset/img/mikuInscription.gif), url("+host+"views/asset/img/inscriptionBgSchool.jpg) transparent center no-repeat",
            "background-position": "50%",
            "background-size": "cover, cover"
        });
    });
});
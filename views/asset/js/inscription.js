$(document).ready(function(){
    var host = "http://localhost/!chekerlife/";
    $("#formInscription").on("submit", function(e) {
        e.preventDefault();
        var errorTab = [];
        var pseudo = $('#pseudo').val();
        var emailPreviews = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var email = $('#email').val();
        var password = $('#password').val();
        var Newslatter = $('#Newslatter').is(":checked");
        if(Newslatter === false){
            Newslatter = null;
        }else{
            Newslatter = true;
        }

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
        $("#pseudo, #email, #password").css("border", "3px solid transparent");

        var conditions = [
            pseudo == "",
            email == "",
            password == "",
            isBlacklisted == true,
            pseudoVerify.length < 5,
            pseudoVerify.length > 18,
            !(email.match(emailPreviews))
        ];
        if(conditions.every(condition => condition === true)){
            if(pseudo == ""){
                $("#pseudo").css("border", "3px solid red");
                var pseudo = "le pseudo choisir n'est pas disponible sur ce site";
                errorTab.push(pseudo);
            }else if(pseudoVerify.length < 5){
                $("#pseudo").css("border", "3px solid red");
                var pseudoError = "le speudo doit pas etre inferieur a 5 caracter";
                errorTab.push(pseudoError);
            }else if(pseudoVerify.length > 18){
                $("#pseudo").css("border", "3px solid red");
                var pseudoError = "le speudo doit pas depasser les 18 caracter";
                errorTab.push(pseudoError);
            }

            if(email == ""){
                $("#email").css("border", "3px solid red");
                var email = "L'email n'est pas conforme.";
                errorTab.push(email);
            }else if (!(email.match(emailPreviews))) {
                $("#email").css("border", "3px solid red");
                var email = "L'email n'est pas conforme.";
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
                    reinitialiser();
                    if(response['error'] !== null){
                        $('#right').text("");
                        $("#right").css({
                            "background-image":  "url(none)",
                        });
                    
                        var error = $('<div>').attr('id', 'error');
                        $('#right').append(error);

                        var gif = $('<div>').attr('id', 'errorGif');
                        $('#right').append(gif);
                            response['error'].forEach(element => {
                                var errorDiv = $('<div>').addClass('error').html('<i class="fa-solid fa-star" style="color: #ff0000;"></i>' + element);
                                $('#error').append(errorDiv);
                            });
                        }else{
                              window.location.href = host;
                        }

                    },
                error: function (xhr, status, error) {
                    // console.error('Une erreur s\'est produite lors du chargement du contenu.');
                    console.log(xhr);
                }
            });
        }

    });

    $('#btnReinitialiser').on('click', function() {
        reinitialiser();
    });
});
function reinitialiser(gif = "mikuInscription.gif"){
    $('#right').text("");
    $("#pseudo, #email, #password").css("border", "3px solid transparent");
    
    $("#right").css({
        "background": "url("+host+"views/asset/img/"+ gif +"), url("+host+"views/asset/img/inscriptionBgSchool.jpg) transparent center no-repeat",
        "background-position": "50%",
        "background-size": "cover, cover"
    });
}
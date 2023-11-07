$(document).ready(function(){
    var host = "http://localhost/!chekerlife/";
    $("#formInscription").on("submit", function(e) {
        e.preventDefault();
        var errorTab = [];
        var pseudo = $('#pseudo').val();
        var emailPreviews = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordConfirmation = $('#passwordConfirmation').val();
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


        if(pseudo == "" || email == "" || password == "" || isBlacklisted == true || pseudoVerify.length < 5 || pseudoVerify.length > 18 || pseudoVerify.length > 18 || !(email.match(emailPreviews)) || password !== passwordConfirmation){
            if(pseudo == ""){
                // le pseudo choisir n'est pas disponible sur ce site
                $("#pseudo").css("border", "3px solid red");
                var pseudo = "Le pseudo ne peut pas être vide.";
                errorTab.push(pseudo);
            }else if(pseudoVerify.length < 5){
                $("#pseudo").css("border", "3px solid red");
                var pseudoError = "Le pseudo ne doit pas contenir moins de 5 caractères.";
                errorTab.push(pseudoError);
            }

            if(email == ""){
                $("#email").css("border", "3px solid red");
                var email = "L'email ne peut pas être vide.";
                errorTab.push(email);
            }else if (!(email.match(emailPreviews))) {
                $("#email").css("border", "3px solid red");
                var email = "L'adresse e-mail n'est pas conforme.";
                errorTab.push(email);
            }
            
            if(password == ""){
                // le password choisir ne corespon pas a nos attente
                $("#password").css("border", "3px solid red");
                var password = "Le mot de passe ne peut pas être vide.";
                errorTab.push(password);
            }
            
            if(passwordConfirmation == ""){
                // le password choisir ne corespon pas a nos attente
                $("#passwordConfirmation").css("border", "3px solid red");
                var password = "La confirmation du mot de passe ne peut pas être vide.";
                errorTab.push(password);
            }else if(password !== passwordConfirmation){
                $("#passwordConfirmation").css("border", "3px solid red");
                var password = "Le mot de passe est différent de la confirmation du mot de passe.";
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
                url: 'form/UserForm.php',
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
                        if(response['errorBool'][0]){
                            $("#pseudo").css("border", "3px solid red");
                        }
                        if(response['errorBool'][1]){
                            $("#email").css("border", "3px solid red");
                        }
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
    $("#pseudo, #email, #password, #passwordConfirmation").css("border", "3px solid transparent");
    
    $("#right").css({
        "background": "url("+host+"views/asset/img/"+ gif +"), url("+host+"views/asset/img/inscriptionBgSchool.jpg) transparent center no-repeat",
        "background-position": "50%",
        "background-size": "cover, cover"
    });
}
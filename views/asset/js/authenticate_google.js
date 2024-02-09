urlAjax = "http://localhost/!chekerlife/form/UserForm.php";

function inscription(name, prenom, email, subHach, picture){
    
    var pseudo = $('#pseudo').val();
        pseudo = pseudo.trim().replace(/\s+/g, ' ');
    if(pseudo == "" || pseudo.length < 5){
        console.log("null");
        console.log(pseudo.length);
    }else{
        $.ajax({
            url: urlAjax,
            type: 'POST',
            data: {
                action: "inscriptionGoogle",
                name: name,
                prenom: prenom,
                pseudo: pseudo,
                email: email,
                subHach: subHach,
                picture: picture,
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
    console.log(pseudo);
}
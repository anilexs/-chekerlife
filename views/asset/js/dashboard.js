urlAjax = "http://localhost/!chekerlife/controller/AdminAjaxController.php";
//  Object.values(labels) : pour convertire un associatif en indexe
var infoCountCreatedDay = new Date().toLocaleDateString().split('/').reverse().join('/');
var nbCoutCreatedHour = new Date().toLocaleDateString().split('/').reverse().join('/');


function ajusterDate(jours, date) {
    var dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() + jours);
    var dateAjustee = dateObj.toLocaleDateString().split('/').reverse().join('/');
    return dateAjustee;
}

function reset(value = false){
    $("#nombre_conte_total, #nombre_conte_jour, #inscriptions_journalières").prop('disabled', value);
    $('#nbDayplus24h, #nbDaymoins24h').css('display', 'none');
    $('#grafTXT').text("");
}


$(document).ready(function(){
    var ctx = $("#myGraf")[0].getContext('2d');
    var myGraf;

    function createLine(data) {
        if (myGraf) {
            myGraf.destroy();
        }
        var options = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                }
            }
        }
        var config = {
            type: 'line',
            data: data,
            options: options
        }
        myGraf = new Chart(ctx, config);
    }
    
    function createBar(data) {
        if (myGraf) {
            myGraf.destroy();
        }
        var options = {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                }
            }
        }
        var config = {
            type: 'bar',
            data: data,
            options: options
        }
        myGraf = new Chart(ctx, config);
    }


    function nombre_dutilisateurs(){
        reset();
        $('#grafTXT').text("nombre de compte total créés");
        $('#nombre_conte_total').prop('disabled', true);
        clearCanvas();
        $.ajax({
            url: urlAjax, 
            type: 'POST',
            data: {
                action: "nombre_dutilisateurs_total",
                date: nbCoutCreatedHour,
            },
            dataType: 'json',
            success: function(response) {
                var jour = response['userConte'].map(objet => objet.jour);
                var nombre_dutilisateurs_total = response['userConte'].map(objet => objet.total_utilisateurs);
                var beta_testers = response['userConte'].map(objet => objet.beta_testers);
                var membres = response['userConte'].map(objet => objet.membres);
                var admins = response['userConte'].map(objet => objet.admins);
                var owners = response['userConte'].map(objet => objet.owners);
                
                createLine({
                    labels: jour,
                    datasets: [{
                        label: "Nombre total d'utilisateurs créés",
                        data: nombre_dutilisateurs_total,
                        borderColor: '#FF00D1',
                    },{
                        label: "Nombre total de role : beta testers ",
                        data: beta_testers,
                        borderColor: '#7FFFDA',
                    },{
                        label: "Nombre total de role : membre ",
                        data: membres,
                        borderColor: '#0093FF',
                    },{
                        label: "Nombre total de role : admin ",
                        data: admins,
                        borderColor: '#000FFF',
                    },{
                        label: "Nombre total de role : owners ",
                        data: owners,
                        borderColor: '#FF0000',
                    }],
                });
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    }
    
    function nombre_conte_jour(date){
        reset();
        $('#grafTXT').text("nombre de compte cree le " + date);
        // $('#nbDayplus24h, #nbDaymoins24h').css('display', 'inline-block');
        $('#nombre_conte_jour').prop('disabled', true);
        clearCanvas();
        $.ajax({
            url: urlAjax, 
            type: 'POST',
            data: {
                action: "nombre_conte_jour",
                date: date,
            },
            dataType: 'json',
            success: function(response) {
                var data = Object.values(response['nombre_conte_jour'][0]); 
                console.log(response['nombre_conte_jour']);
                createBar({
                    labels: ["nombre d'utilisateurs cree", "nombre role : beta testeur", "nombre role : membre", "nombre role : admin", "nombre role : owner"],
                    datasets: [{
                        label: "Nombre d'utilisateurs créés le " + nbCoutCreatedHour,
                        backgroundColor: 'blue',
                        data: [data[1], data[3], data[4], data[2], data[5]],
                    }],
                });
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    }

    function nombre_comptes_créés_dernier_24h(date){
        reset();
        $('#grafTXT').text("nombre de compte cree le " + date);
        $('#nbDayplus24h, #nbDaymoins24h').css('display', 'inline-block');
        $('#inscriptions_journalières').prop('disabled', true);
        clearCanvas();
        $.ajax({
            url: urlAjax, 
            type: 'POST',
            data: {
                action: "nombre_dutilisateurs_day",
                date: date,
            },
            dataType: 'json',
            success: function(response) {
                var valeursNombreUtilisateurs = response['createsUserDay'].map(objet => objet.nombre_dutilisateurs);
                
                createLine({
                    labels: ['0 heure', '1 heure', '2 heures', '3 heures', '4 heures', '5 heures', '6 heures', '7 heures', '8 heures', '9 heures', '10 heures', '11 heures', '12 heures', '13 heures', '14 heures', '15 heures', '16 heures', '17 heures', '18 heures', '19 heures', '20 heures', '21 heures', '22 heures', '23 heures'],
                    datasets: [{
                        label: "Nombre d'utilisateurs créés le " + nbCoutCreatedHour,
                        data: valeursNombreUtilisateurs,
                        borderColor: 'rgba(255, 99, 132, 1)',
                    }],
                });
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    }

    $("#nbDayplus24h").on("click", function() {
        nbCoutCreatedHour = ajusterDate(-1, nbCoutCreatedHour);
        nombre_comptes_créés_dernier_24h(nbCoutCreatedHour);
    });

    $("#nbDaymoins24h").on("click", function() {
        nbCoutCreatedHour = ajusterDate(1, nbCoutCreatedHour);
        nombre_comptes_créés_dernier_24h(nbCoutCreatedHour)
    });
   
    
    nombre_dutilisateurs();

    $('#nombre_conte_total').on("click", function() {
        nombre_dutilisateurs();
    });

    $('#nombre_conte_jour').on("click", function() {
        nombre_conte_jour(infoCountCreatedDay)
    });
    
    $('#inscriptions_journalières').on("click", function() {
        nombre_comptes_créés_dernier_24h(nbCoutCreatedHour)
    });
    

    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
});

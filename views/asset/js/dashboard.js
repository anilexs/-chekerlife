urlAjax = "http://localhost/!chekerlife/controller/AdminAjaxController.php";
//  Object.values(labels) : pour convertire un associatif en indexe
$(document).ready(function(){
    var ctx = $("#myGraf")[0].getContext('2d');
    var myGraf;
    function btnDisabled(value = false){
        $("#nombre_dutilisateurs, #nombre_comptes_créés_jour").prop('disabled', value);
    }

    function createChart(data) {
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

    createChart({
        labels: ['label 1', 'label 2', 'label 3', 'label 4', ""],
        datasets: [{
            label: "text",
            data: [75,1,3,4, 5],
            borderColor: 'rgba(255, 99, 132, 1)',
        }],
    });
    
    $('#nombre_dutilisateurs').on("click", function() {
        btnDisabled();
        $(this).prop('disabled', true);
        clearCanvas();
        createChart({
            labels: ['1 heur', 'pal 2', 'pal 3', 'pal 4' ,""],
            datasets: [{
                label: "text",
                data: [1,1,2,2,5],
                borderColor: 'rgba(255, 99, 132, 1)',
            }],
        });
    });
    
    
    $('#nombre_comptes_créés_jour').on("click", function() {
        btnDisabled();
        $(this).prop('disabled', true);
        clearCanvas();
        $.ajax({
            url: urlAjax, 
            type: 'POST',
            data: {
                action: "nombre_dutilisateurs_day",
            },
            dataType: 'html',
            success: function(response) {
                createChart({
                    labels: ['0 heure', '1 heure', '2 heures', '3 heures', '4 heures', '5 heures', '6 heures', '7 heures', '8 heures', '9 heures', '10 heures', '11 heures', '12 heures', '13 heures', '14 heures', '15 heures', '16 heures', '17 heures', '18 heures', '19 heures', '20 heures', '21 heures', '22 heures', '23 heures', '0 heure'],
                    datasets: [{
                        label: "text",
                        data: [1,1,2,55,5],
                        borderColor: 'rgba(255, 99, 132, 1)',
                    }],
                });
            },
            error: function(xhr, status, error) {
                console.error('Une erreur s\'est produite lors du chargement du contenu.');
            }
        });
    });


    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
});

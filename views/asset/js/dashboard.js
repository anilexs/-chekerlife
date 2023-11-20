$(document).ready(function(){
    var ctx = $("#myGraf")[0].getContext('2d');
    var myGraf;
    function btnDisabled(value = false){
        $("#nombre_dutilisateurs, #nombre_dutilisateurs_day").prop('disabled', value);
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
    
    
    $('#nombre_dutilisateurs_day').on("click", function() {
        btnDisabled();
        $(this).prop('disabled', true);
        clearCanvas();
        createChart({
            labels: ['0 heur', '1 heur', '2 heur', '3 heur' ,"4 heur", '5 heur', '6 heur', '7 heur', '8 heur' ,"9 heur", '10 heur', '11 heur', '12 heur', '13 heur' ,"14 heur", '15 heur', '16 heur', '17 heur', '18 heur' ,"19 heur", '20 heur', '21 heur', '22 heur', '23 heur' ,"0 heur"],
            datasets: [{
                label: "text",
                data: [1,1,2,55,5],
                borderColor: 'rgba(255, 99, 132, 1)',
            }],
        });
    });


    function clearCanvas() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
});

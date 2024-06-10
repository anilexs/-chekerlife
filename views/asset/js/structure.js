const urlAjax = "http://localhost/!chekerlife/controller/UserAjaxConroller.php";

function ftrSize() {
    var footer = document.getElementById('footer');
    if (document.body.scrollHeight > window.innerHeight) {
        footer.style.position = 'static';
        footer.style.bottom = 'auto';
    } else {
        footer.style.position = 'absolute';
        footer.style.bottom = '0';
    }
}

// $(document).ready(function() {
//     function isElementBehindFooter($element, $footer) {
//         // Obtenir les positions et dimensions de l'élément et du footer
//         var elementRect = $element[0].getBoundingClientRect();
//         var footerRect = $footer[0].getBoundingClientRect();
        
//         // Vérifier si l'élément est recouvert par le footer
//         return (
//             elementRect.bottom > footerRect.top &&
//             elementRect.top < footerRect.bottom &&
//             elementRect.right > footerRect.left &&
//             elementRect.left < footerRect.right
//         );
//     }

//     var $footer = $('footer');
//     var elementsBehindFooter = [];

//     $('body *').each(function() {
//         var $element = $(this);
//         if ($element.is('footer')) return; // Ignorer le footer lui-même

//         if (isElementBehindFooter($element, $footer)) {
//             elementsBehindFooter.push($element);
//             console.log($element, 'est derrière le footer.');
//         }
//     });

//     if (elementsBehindFooter.length > 0) {
//         console.log('Des éléments se trouvent derrière le footer.');
//     } else {
//         console.log('Aucun élément n\'est derrière le footer.');
//     }
// });

// function ftrSize() {
//     var footer = document.getElementById('footer');
//     var contentHeight = document.body.scrollHeight;
//     var windowHeight = window.innerHeight;
//     var scrollPosition = window.scrollY || window.pageYOffset;

//     if (scrollPosition + windowHeight >= contentHeight) {
//         footer.style.position = 'static';
//         footer.style.bottom = 'auto';
//     } else {
//         footer.style.position = 'fixed';
//         footer.style.bottom = '0';
//     }
// }

// $(document).ready(function() {
//     var imageCliquable = $('<img>', {
//       id: 'chibi',
//       src: host + 'asset/img/chibi/miku-reverse.png',
//     });
  
//     imageCliquable.click(function() {
//       $(this).effect('explode', {
//         pieces: 100,   
//         easing: 'easeOutQuad', 
//         duration: 1000 
//       });
//     });
  
//     $('body').prepend(imageCliquable);
//     $('#chibi').css({
//       width: '80px',
//       height: '100px',
//       position: 'absolute',
//       top: '0px',
//       zIndex: 1
//     });
  
//     $('#chibi').animate({
//       top: '+=50px',
//     }, 1000); 
// });

$(document).ready(function() {

    function online() {
        $.ajax({
            url: urlAjax,
            type: 'POST',
            data: {
                action: "userOnligne",
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });
    }
    // online();
    // setInterval(online, 60000);
});
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
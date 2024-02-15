
$(document).ready(function() {
    const urlAjax = "http://localhost/!chekerlife/controller/UserAjaxConroller.php";
    $friend = $('.friend');

    $(document).on('click', '#online', function(e) {
        disable("online");
        console.log("click");
    })

    $(document).on('click', '#all', function(e) {
        disable("all");
        console.log("click");
        $friend.html("");
            $.ajax({
                url: urlAjax,
                type: 'POST',
                data: {
                    action: "allFriend",
                },
                dataType: 'html',
                success: function (response) {
                    $friend.append(response);
                    ftrSize();
                },
                error: function (xhr, status, error) {
                    console.log(xhr);
                }
            });
    })

    $(document).on('click', '#requette', function(e) {
        disable("requette");
        console.log("click");
    })

    $(document).on('click', '#blocket', function(e) {
        disable("blocket");
        console.log("click");
    })
    
    function disable(id){
        $("#online, #all, #requette, #blocket").prop("disabled", false);
        $("#" + id).prop("disabled", true);
    }
    
    $(document).on('click', '#removeFriend', function(e) {
        var id_friend = $(this).attr('class');

        $.ajax({
            url: urlAjax,
            type: 'POST',
            data: {
                action: "removeFriend",
                friend: id_friend,
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });
    }); 

})
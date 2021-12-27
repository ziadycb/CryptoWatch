$(document).ready(function () 
{
    $.ajax({//Process the form using $.ajax()
        type: 'POST', //Method type
        url: '../../BLL/checkSession.php', //Your form processing file url
        beforeSend: function (xhr) {
            console.log("Ajax call initiated");
        },
        success: function (data) {
            if (!data) { //If fails
                $(".dropdown").addClass("hidesession");
                $(".main-nav").removeClass("hidesession");
            } else {
                $(".dropdown").removeClass("hidesession");
                $(".main-nav").addClass("hidesession");
            }

            console.log("Ajax call success");
        },
        error: function () {
            alert("System  currently unavailable, try again later.");
            console.log("Ajax call error");
        },
        complete: function () {
            console.log("Ajax call completed");
        }

    });
})
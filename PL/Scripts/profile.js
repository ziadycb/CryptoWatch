jQuery(document).ready(function ($) {

    var settings = {
        "method": "GET",
        "url": "../../BLL/getSub.php",
        };

        $.ajax(settings).done(function (data) {

            var results = JSON.parse(data);

            for ( let i = 0; i < Object.keys(results[0]).length; i++) {  
    
                var result = $(results).get(i);
                
                
                console.log(result);
            }

        });


});
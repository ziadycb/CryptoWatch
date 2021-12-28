$(document).ready(function(){

    'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
        var settings = {
        "method": "GET",
        "url": "../../BLL/coinStats.php",
        };

        $.ajax(settings).done(function (data) {

            var result = JSON.parse(data);

            $('#cry').append(result.totalCoins);
            $('#exchange').append(result.totalExchanges);
            $('#marketCap').append(result.totalMarketCap);
            $('#vol').append(result.total24hVolume);
            $('#mark').append(result.totalMarkets);

            //console.log(result.totalCoins);
        });

        // window.location.href ="./Searched.php";

        settings = {
            "method": "GET",
            "url": "../../BLL/coinRanking.php",
            };
        
        $.ajax(settings).done(function (data) {

            
            var results = JSON.parse(data);
            //console.log(results);
            var name ="";
            var img ="";
            var price="";
            var change = "";
            var marketCap = "";
            var volume = "";
            var symbol = "";
            

        for ( let i = 0; i < 10; i++) {  
            
            var result = $(results.data.coins).get(i);
            //console.log(result);
            name = result.name;
            img = result.iconUrl;
            price = result.price;
            change = result.change;
            marketCap = result.marketCap;
            volume = result["24hVolume"];
            symbol = result.symbol;
            
            $("#tb").append(
                "<tr>"
                    +'<td><span><span id="btnClear" class="fa fa-star '+symbol+'"></span></span></td>'
                    +'<th scope="row">'+(i+1)+'</th>'
                    +"<td>"
                    +'<img src="'+img+'">'
                    + name+" "+ symbol + "</td>"
                    +"<td>$"+price+"</td>"
                    +"<td>"+change+"%</td>"
                    +"<td>$"+marketCap+"</td>"
                    +"<td>$"+volume+"</td>"
                    +"<td>Otto</td>"
                +"</tr>"
                  )
            }
        });
        
        $("body").on("click", "#btnClear", function() {

            if(!$(this).hasClass("checked"))
            {
                var get_cls = $(this).attr("class");
                var answer = get_cls.split(" ").pop();
                console.log(answer);

                $(this).attr('class', 'checked ' + $(this).attr('class'));
            }

            else
            {
                var get_cls = $(this).attr("class");
                var answer = get_cls.split(" ").pop();
                console.log(answer);

                $(this).removeClass("checked");
            }
        });

 })
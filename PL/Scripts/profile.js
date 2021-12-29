jQuery(document).ready(function ($) {

    var settings = {
        "method": "GET",
        "url": "../../BLL/getSub.php",
        };

        $.ajax(settings).done(function (data) {

            var results = JSON.parse(data);
            var s = "?";
            var len = results.length;
            var symb = results;

            for ( let i = 0; i < results.length; i++) {  
    
                var result = $(results).get(i);
                
                s = s + "symbols[]="+result+( i == (results.length-1) ? "" : "&");

                console.log(s);
            }

            var postForm = {
                apiURL: s,
              };
    
            settings = {
                "method": "POST",
                "url": "../../BLL/coinRanking.php",
                "data": postForm,
                };

                $.ajax(settings).done(function (data) {

                    
                var results = JSON.parse(data);
                console.log(results);    
                for ( let i = 0; i < len; i++) {  
                    
                    var result = $(results.data.coins).get(i);
                    
                    name = result.name;
                    img = result.iconUrl;
                    price = result.price;
                    change = result.change;
                    marketCap = result.marketCap;
                    volume = result["24hVolume"];
                    symbol = result.symbol;
                    rank = result.rank;
        
                    
                    
                    $("#tb").append(
                        "<tr>"
                            +'<td><span><span id="btnClear" class="fa fa-star '+symbol+'"></span></span></td>'
                            +'<th scope="row">'+rank+'</th>'
                            +"<td>"
                            +'<img src="'+img+'">'
                            + name+" "+ symbol + "</td>"
                            +"<td>$"+price+"</td>"
                            +"<td "+(change > 0 ? "class='pos'><i class='fa fa-caret-up'></i>" : "class='neg'><i class='fa fa-caret-down'></i>")+Math.abs(change)+"%</td>"
                            +"<td>$"+marketCap+"</td>"
                            +"<td>$"+volume+"</td>"
                            +"<td>Otto</td>"
                        +"</tr>"
                          )
        
                          
                    }
                    for ( let i = 0; i < 50; i++) {  
            
                        var result = $(symb).get(i);
                        
                        $("."+result).attr('class', 'checked ' + $("."+result).attr('class'));
                        console.log(result);
                    }
                    
                });

                
        });



});
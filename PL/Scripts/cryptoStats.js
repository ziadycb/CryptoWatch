$(document).ready(function(){
    
    var name ="";
    var img ="";
    var price="";
    var change = "";
    var marketCap = "";
    var volume = "";
    var symbol = "";

    function appendPos()
    {

    }

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

            var settings = {
                "method": "GET",
                "url": "../../BLL/getSub.php",
                };
        
                $.ajax(settings).done(function (data) {
        
                    var results = JSON.parse(data);
                    for ( let i = 0; i < 50; i++) {  
            
                        var result = $(results).get(i);
                        
                        $("."+result).attr('class', 'checked ' + $("."+result).attr('class'));
                        console.log(result);
                    }

                });
              
              
              
        for ( let i = 0; i < 50; i++) {  
            
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
                    +"<td "+(change > 0 ? "class='pos'><i class='fa fa-caret-up'></i>" : "class='neg'><i class='fa fa-caret-down'></i>")+Math.abs(change)+"%</td>"
                    +"<td>$"+marketCap+"</td>"
                    +"<td>$"+volume+"</td>"
                    +"<td>Otto</td>"
                +"</tr>"
                  )

                  
            }
            
            
        });
        
        $("body").on("click", "#btnClear", function() {
            
            
            var but = $(this);
            

            if(!$(".dropdown").hasClass("hidesession"))
            {

                if(!$(this).hasClass("checked"))
                {
                    var get_cls = $(this).attr("class");
                    var answer = get_cls.split(" ").pop();
                    console.log(answer);

                    var postForm = {
                        //Fetch form data
                        coin: answer,
                        add: 1,
                      };

                    var settings = {
                        "method": "POST",
                        "url": "../../BLL/subManager.php",
                        "data": postForm,
                        };
                
                    $.ajax(settings).done(function (data) {
                        
                        if(data){
                            but.attr('class', 'checked ' + but.attr('class'));
                        }

                        //console.log(result.totalCoins);
                    });

                }

                else
                {
                    
                    var get_cls = but.attr("class");
                    var answer = get_cls.split(" ").pop();
                    console.log("wohooooooooo");

                    var postForm = {
                        //Fetch form data
                        coin: answer,
                        add: 0,
                      };

                    var settings = {
                        "method": "POST",
                        "url": "../../BLL/subManager.php",
                        "data": postForm,
                        };
                
                    $.ajax(settings).done(function (data) {
                        
                        if(data){
                            but.removeClass("checked");
                        }

                        //console.log(result.totalCoins);
                    });

                }
            }

            else {
                $(".main-nav").children("ul").removeClass("is-visible");
                //show modal layer
                $(".cd-user-modal").addClass("is-visible");
                //show the selected form
                $(".cd-user-modal").find("#cd-login").addClass("is-selected");
            }
        });

 })
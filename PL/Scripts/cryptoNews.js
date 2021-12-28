jQuery(document).ready(function ($) {


    
    $('select').on('change', function(e){
        console.log($(this).find("option:selected").text());


        const settings = {
            "method": "GET",
            "url": "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&&api_key=88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3&&categories="+$(this).find("option:selected").text()
        };
        
        $.ajax(settings).done(function (response) {

            var results = JSON.parse(JSON.stringify(response.Data));
            //console.log(results);

            var body ="";
            var img ="";
            var title="";
            var url = "";
            var srcimg = "";
            var srcname = "";
            $(".newscont").html("");

            for ( let i = 0; i < 10; i++) {

                var result = $(results).get(i);

                body = result.body;
                img = result.imageurl;
                title = result.title;
                url = result.url;
                srcimg = result.source_info.img;
                srcname = result.source_info.name;

                if(body.length > 300) body = body.substring(0,300) + "...";
                if(title.length > 75) title = title.substring(0,100) + "...";

                $(".newscont").append(
                    '<div class="news col-3">'+
                        '<div class="row">'+
                            '<div class="col-7"><h4>'+title+'</h4></div>'+
                            '<div class="col-5"><img src="'+img+'" style="width: 120px; height: 120px;"></div></div>'+
                        '<div class="row">'+
                            '<p>'+body+'</p>'+
                        +'</div>'+
                        '<div class="row">'+srcname+'</div></div>'
                    )

            }
        });

      });

})
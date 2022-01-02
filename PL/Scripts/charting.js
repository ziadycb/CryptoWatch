jQuery(document).ready(function ($) {
  var postForm = {
    setCoin: 0,
    coin: null,
  };

  var settings = {
    method: "POST",
    url: "../../BLL/coinManager.php",
    data: postForm,
  };

  $.ajax(settings).done(function (data) {
    var resultData = JSON.parse(data);
    console.log(data);
    console.log(resultData);
    var chartElement = document.createElement("div");
    chartElement.classList.add("col-8");
    $(".chart").append(chartElement);

    var chart = LightweightCharts.createChart(chartElement, {
      width: 600,
      height: 300,
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
    });
    chart.applyOptions({
      logicalrange: {
        autoScale: false,
      },
    });

    var candleSeries = chart.addCandlestickSeries();
    const settings = {
      method: "GET",
      url:
        "https://min-api.cryptocompare.com/data/v2/histoday?fsym=" +
        resultData +
        "&tsym=USD&limit=300&api_key=88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3",
    };

    var openA = 0;
    var lowA = 0;
    var closeA = 0;
    var highA = 0;
    var formattedTime = "";

    $.ajax(settings).done(function (response) {
      var results = JSON.parse(JSON.stringify(response.Data));
      console.log(results);

      var data = [];
      var obj = {};

      for (let i = 0; i < 300; i++) {
        var result = $(results.Data).get(i);
        //console.log(result);

        date = new Date(result.time * 1000);
        openA = result.open;
        highA = result.high;
        lowA = result.low;
        closeA = result.close;

        var year = date.getFullYear();

        var month = "0" + (date.getMonth() + 1);

        var day = "0" + date.getDate();

        // Will display time in 10:30:23 format
        formattedTime = year + "-" + month.substr(-2) + "-" + day.substr(-2);

        //console.log(formattedTime);

        data.push({
          time: formattedTime,
          open: openA,
          high: highA,
          low: lowA,
          close: closeA,
        });
      }
      console.log(data);
      candleSeries.setData(data);

      const settings = {
        method: "GET",
        url:
          "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
          resultData +
          "&tsyms=USD&api_key=88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3",
      };

      $.ajax(settings).done(function (response) {
        var results = JSON.parse(JSON.stringify(response.DISPLAY));
        //console.log(results);

        var price = "";
        var name = "";
        var priceChange = "";
        var low = "";
        var high = "";
        var open = "";
        var tradingVolume = "";

        var result = results[Object.keys(results)[0]].USD;
        console.log(result);

        price = result.PRICE;
        //name = result.imageurl;
        priceChange = result.CHANGE24HOUR;
        low = result.LOWDAY;
        high = result.HIGHDAY;
        open = result.OPENDAY;
        tradingVolume = result.VOLUMEDAYTO;

        $(".chart").append(
          '<div class="col-3 coinstats">' +
            '<h4 class="row">' +
            resultData +
            " Price Statistics</h4>" +
            '<div class="row">' +
            '<p class="col">' +
            resultData +
            " price</p>" +
            '<p class="col price">' +
            price +
            "</p>" +
            "</div>" +
            "<hr>" +
            '<div class="row">' +
            '<p class="col">Price Change</p>' +
            '<p class="col">' +
            priceChange +
            "</p>" +
            "</div>" +
            "<hr>" +
            '<div class="row">' +
            '<p class="col">Day Low / Day High</p>' +
            '<p class="col">' +
            low +
            "/" +
            high +
            "</p>" +
            "</div>" +
            "<hr>" +
            '<div class="row">' +
            '<p class="col">Trading Volume</p>' +
            '<p class="col">' +
            tradingVolume +
            "</p>" +
            "</div>" +
            "<hr>" +
            '<div class="row">' +
            '<p class="col">Bitcoin price</p>' +
            '<p class="col">$46,959.08</p>' +
            "</div>" +
            "<hr>" +
            "</div>"
        );

        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          (today.getDate() + 1);
        price = price.split(".", 1)[0].replace(/\D/g, "");
        open = open.split(".", 1)[0].replace(/\D/g, "");
        high = high.split(".", 1)[0].replace(/\D/g, "");
        low = low.split(".", 1)[0].replace(/\D/g, "");
        console.log(date);

        candleSeries.update({
          time: date,
          open: open,
          high: high,
          low: low,
          close: price,
        });

        // this is where you paste your api key
        var apiKey =
          "88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3";
        var ccStreamer = new WebSocket(
          "wss://streamer.cryptocompare.com/v2?api_key=" + apiKey
        );
        ccStreamer.onopen = function onStreamOpen() {
          var subRequest = {
            action: "SubAdd",
            subs: ["0~Coinbase~"+resultData+"~USD"],
          };
          ccStreamer.send(JSON.stringify(subRequest));
        };

        ccStreamer.onmessage = function onStreamMessage(message) {
          var message =JSON.parse( message.data);
          
          if(message.TYPE == 0)
          {
            candleSeries.update({
              time: date,
              open: open,
              high: high,
              low: low,
              close: message.P,
            });
            $(".price").text(message.P)
            console.log(message.P);
          }
        };
      });
    });
  });

  /*
  setInterval(function () {
    const settings = {
      method: "GET",
      url: "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD&api_key=88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3",
    };

    $.ajax(settings).done(function (response) {
      var results = JSON.parse(JSON.stringify(response));
      console.log(results);
      
        var price = results.USD;

        highA = (highA>price ? highA:price);
        lowA = (lowA<price ? lowA:price);

        candleSeries.update({ time: formattedTime, open: openA, high: highA, low: lowA, close: price });
      
    });
  }, 20000);
  */
});

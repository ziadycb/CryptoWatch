jQuery(document).ready(function ($) {

    var chartElement = document.createElement('div');
    $(".chart").append(chartElement);

    var chart = LightweightCharts.createChart(chartElement, {
        width: 600,
        height: 300,
        crosshair: {
          mode: LightweightCharts.CrosshairMode.Normal,
        },
        
      });
      chart.applyOptions({
        logicalrange:{
          autoScale: false,
        }
      })
  
      var candleSeries = chart.addCandlestickSeries();
  const settings = {
    method: "GET",
    url: "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=300&api_key=88d2cc63e537bedbd86355d6a5a08b1009c01b1a9c265372777e2fcbecd84be3",
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
      console.log(result);

      date = new Date(result.time * 1000);
      openA = result.open;
      highA = result.high;
      lowA = result.low;
      closeA = result.close;

      var year = date.getFullYear();

      var month = "0" + (date.getMonth() + 1);

      var day = "0" + date.getDate();


      // Will display time in 10:30:23 format
      formattedTime = year + "-" + month.substr(-2) + "-" + day.substr(-2) ;

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

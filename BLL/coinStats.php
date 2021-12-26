<?php

function nice_number($n) {
    // first strip any formatting;
    $n = (0+str_replace(",", "", $n));

    // is this a number?
    if (!is_numeric($n)) return false;

    // now filter it;
    if ($n > 1000000000000) return round(($n/1000000000000), 2).'T';
    elseif ($n > 1000000000) return round(($n/1000000000), 2).'B';
    elseif ($n > 1000000) return round(($n/1000000), 2).'M';
    elseif ($n > 1000) return round(($n/1000), 2).'K';

    return number_format($n);
}

  $curl = curl_init();
  
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.coinranking.com/v2/stats",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "x-access-token: coinranking803dde0f7028d2f0bf8aa42ffcdb4598847e96a5b85ecf2e"
    ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  
  curl_close($curl);

  $json_a2 = json_decode($response, true);

  $json_a2['data']['totalMarketCap'] = nice_number($json_a2['data']['totalMarketCap']);
  $json_a2['data']['total24hVolume'] = nice_number($json_a2['data']['total24hVolume']);
  $json_a2['data']['totalMarkets'] = nice_number($json_a2['data']['totalMarkets']);

  $json_a2 = json_encode($json_a2['data'], true);


  echo $json_a2;
  //echo $response;

  ?>
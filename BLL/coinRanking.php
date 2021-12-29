<?php

$curl = curl_init();
  
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.coinranking.com/v2/coins".$_POST["apiURL"],
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
  //$json_a2 = json_encode($json_a2['coins'], true);

  echo $response;

?>
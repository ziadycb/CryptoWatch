<?php


if (session_id() == '' || !isset($_SESSION)) {
    session_start();
}

if($_POST['setCoin'] == 1){
    $_SESSION['coin'] = $_POST['coin'];
    echo $_POST['setCoin'];
}
else
    echo json_encode($_SESSION['coin']);


    ?>
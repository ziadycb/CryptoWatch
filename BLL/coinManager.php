<?php


if (session_id() == '' || !isset($_SESSION)) {
    session_start();
}

if($_POST['setCoin']){
    $_SESSION['coin'] = $_POST['coin'];
    echo true;
}
else
    echo $_SESSION['coin'];


    ?>
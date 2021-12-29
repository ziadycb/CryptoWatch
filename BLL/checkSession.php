<?php

function checkLogin()
{
    if (session_id() == '' || !isset($_SESSION)) {
        session_start();
    }
    
    //Check whether the session variable email is present or not
    if (!isset($_SESSION['email'])) {
        echo false;
    }else {
        echo true;
    }
}

checkLogin();
?>
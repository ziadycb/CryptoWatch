<?php

function OpenCon () {
    $dbhost="127.0.0.1:3306";
    $dbuser="root";
    $dbpass="Ziad2132000";
    $db="sys";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connection failed: %s\n".$conn->error);

    return $conn;
}

function CloseConn ($conn) {
    $conn->close();
}
?>
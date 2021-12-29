<?php
include_once("../DTO/DTORequests/subDTORequest.php");
include_once("../DAL/userRepisotory.php");

if (session_id() == '' || !isset($_SESSION)) {
    session_start();
}

//Check whether the session variable email is present or not
if (!isset($_SESSION['email'])) {
    echo false;
}

$sub = new subDTORequest();

$sub -> setcoin($_POST["coin"]);
$sub -> setemail($_SESSION['email']);



if($_POST["add"] == 1)
{
    InsertSub($sub);
}

else
    delSub($sub);

echo true;

?>
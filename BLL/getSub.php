<?php
include_once("../DTO/DTORequests/subDTORequest.php");
include_once("../DTO/DTOResponses/subDTOResponse.php");
include_once("../DAL/userRepisotory.php");

if (session_id() == '' || !isset($_SESSION)) {
    session_start();
}

//Check whether the session variable email is present or not
if (!isset($_SESSION['email'])) {
    echo false;
    exit();
}

$sub = new subDTORequest();


$sub -> setemail($_SESSION['email']);
$sub -> setcoin(NULL);

$subResponse = new subDTOResponse();

$subResponse = getSub($sub);

echo json_encode($subResponse->getcoin());

?>
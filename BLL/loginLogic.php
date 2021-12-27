<?php
    include_once('../DTO/DTORequests/userDTORequest.php');
    include_once('../DAL/userRepisotory.php');


    function Validateform($password, $username)
    {
        if ($username == null || $username == '' || $password == null || $password == '') {
            return false;
        } else return true;
    }


    if (Validateform($_POST['email'], $_POST['pass'])) {

        $user = new userDTORequest();

        $user -> setemail($_POST['email']);
        $user -> setpass($_POST['pass']);
        $user -> setusername(NULL);

        if (CheckUserExist($user)) 
        {
            if(LoginUser($user)){
                session_start();
                $_SESSION['email'] = $user ->getemail();
                echo true;
            }
            echo false;

        } else {
            echo false;
        }
    } else {
        echo false;
    }

?>
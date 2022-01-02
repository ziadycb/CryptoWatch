<?php
    include_once('../DTO/DTORequests/userDTORequest.php');
    include_once('../DAL/userRepisotory.php');

    function ValidateUsername($firstname) {
        
        if($firstname == null) 
        {
            return false;
        }
        return true;
    }

    function ValidateEmail($mail) {
        
        $pattern = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i';
        if(preg_match($pattern, $mail))
        {
            return true;
        }
        return false;
    }

    function ValidatePassword($password) {
           
        $pattern = '/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/i';
        if(preg_match($pattern, $password) == 1)
        {
            return true;
        }
        return false;
    }

    function ValidateSignUp($firstname,$password,$mail) {
        
        if (
        ValidateUsername($firstname)                            && 
        ValidatePassword($password)                             &&   
        ValidateEmail($mail)
        )

        {
            return true;
        }
        return false;
    }

    $user = new userDTORequest();

    $user -> setusername($_POST['name']);
    $user -> setemail($_POST['email']);
    $user -> setpass($_POST['pass']);


    if(!ValidateSignUp($_POST['name'],$_POST['pass'],$_POST['email']))
    {
        echo false;
        exit();
    }

    if(!CheckUserExist($user))
    {
        if(!InsertUser($user))
        {
            echo false;
        }
        //SendEmail(getFirstName($email), $email, 1, null);
        echo true;
    }
    else{
        echo false;
    }

    
?>
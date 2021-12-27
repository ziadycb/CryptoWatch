<?php

    include_once('connection.php');
    include_once('../DTO/DTORequests/userDTORequest.php');



    function CheckUserExist($userDTOR)
    {
        $conn = OpenCon();
        $email = $userDTOR -> getemail();
        $sql = "SELECT * FROM user WHERE email=LOWER('$email');";
        $result = mysqli_query($conn, $sql);
        CloseConn($conn);
        if (mysqli_num_rows($result) > 0) {
            return true;
        }
        return false;
    }

    function InsertUser($userDTOR)
    {
        $conn = OpenCon();

        

        $name = $userDTOR->getusername();
        $email = $userDTOR->getemail();
        $pass = $userDTOR->getpass();

        $sql = "INSERT INTO password_reset (email)
        VALUES (LOWER('$email'))";

        mysqli_query($conn, $sql);

        $sql = "INSERT INTO user (username, email, password)
            VALUES ('$name', LOWER('$email'), SHA('$pass'))";


        if (mysqli_query($conn, $sql)) {
            //SendEmail($name, $email, 1, null);
            CloseConn($conn);
            http_response_code(201);
        } else {
            CloseConn($conn);
            http_response_code(405);
            return false;
        }
    }


?>
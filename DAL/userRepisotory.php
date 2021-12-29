<?php

    include_once('connection.php');
    include_once('../DTO/DTORequests/userDTORequest.php');
    include_once("../DTO/DTORequests/subDTORequest.php");
    include_once("../DTO/DTOResponses/subDTOResponse.php");



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

    function LoginUser($userDTOR)
    {
        $conn = OpenCon();

        $email = $userDTOR->getemail();
        $password = $userDTOR->getpass();

        $query = "SELECT * FROM user WHERE email= LOWER('$email') AND password = (select SHA('$password')) Limit 1";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) { // user found
            CloseConn($conn);
            return true;
        } else {
            CloseConn($conn);
            return false;
        }
    }

    function getUserID($email,$conn)
    {
        $select = "SELECT iduser FROM user WHERE email= LOWER('$email')";
        $result = mysqli_query($conn, $select);
        $userid = "";

        if ($result->num_rows > 0) {
            // output data of each row
            $row = $result->fetch_assoc();
            return $row["iduser"];
          }
    }

    function getCoinID($coin,$conn)
    {
        $select = "SELECT coin_id FROM coin WHERE symbol= '$coin'";
        $result = mysqli_query($conn, $select);
        $coinid = "";
        
        if ($result->num_rows > 0) {
            // output data of each row
            $row = $result->fetch_assoc();
            return $row["coin_id"];
          }
    }


    function InsertSub($subDTOR)
    {
        $conn = OpenCon();

        $email = $subDTOR->getemail();
        $coin = $subDTOR->getcoin();

        $userid = getUserID($email,$conn);
        $coinid = getCoinID($coin,$conn);

        $sql = "INSERT INTO watchlist (iduser, coin_id)
        VALUES ('$userid', '$coinid')";
        $result = mysqli_query($conn, $sql);

        CloseConn($conn);
    }

    function delSub($subDTOR)
    {
        $conn = OpenCon();

        $email = $subDTOR->getemail();
        $coin = $subDTOR->getcoin();

        $userid = getUserID($email,$conn);
        $coinid = getCoinID($coin,$conn);

        $sql = "DELETE FROM watchlist WHERE iduser = '$userid' AND coin_id = '$coinid'";
        $result = mysqli_query($conn, $sql);
        CloseConn($conn);
    }

    function getSub($subDTOR)
    {
        $conn = OpenCon();

        $email = $subDTOR->getemail();

        $select = "SELECT iduser FROM user WHERE email= LOWER('$email')";
        $result = mysqli_query($conn, $select);
        $userid = "";

        if ($result->num_rows > 0) {
            // output data of each row
            $row = $result->fetch_assoc();
            $userid = $row["iduser"];
          }

        $select = "SELECT coin_id FROM watchlist WHERE iduser= '$userid'";
        $result = mysqli_query($conn, $select);
        $coin = array();
        $coinid = 0;
        $counter = 0;
        $sub = new subDTOResponse();

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {

                $coinid = $row["coin_id"];
                $select = "SELECT symbol FROM coin WHERE coin_id= '$coinid'";
                $result2 = mysqli_query($conn, $select);
                
                
                if ($result2->num_rows > 0) {
                    // output data of each row
                    $row2 = $result2->fetch_assoc();
                    $coin[$counter] = $row2["symbol"];
                    $counter = $counter + 1;
                }
               
        
            }
            
            $sub-> setemail($email);
            $sub-> setcoin($coin);
          }

          return $sub;
        
    }


?>
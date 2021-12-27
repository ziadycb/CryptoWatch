<?php
    class userDTORequest{

        private $username;
        private $pass;
        private $email;

        public function getusername() {
            return $this->username;
        }

        public function setusername($username) {
            return $this->username = $username;
        }

        public function getpass() {
            return $this->pass;
        }

        public function setpass($pass) {
            return $this->pass = $pass;
        }

        public function getemail() {
            return $this->email;
        }

        public function setemail($email) {
            return $this->email = $email;
        }

    }
?>
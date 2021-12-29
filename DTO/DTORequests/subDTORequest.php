<?php
    class subDTORequest{

        
        private $email;
        private $coin;

        public function getcoin() {
            return $this->coin;
        }

        public function setcoin($coin) {
            return $this->coin = $coin;
        }

        public function getemail() {
            return $this->email;
        }

        public function setemail($email) {
            return $this->email = $email;
        }

    }
?>
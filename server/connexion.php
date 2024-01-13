<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST"); // Définissez ici les méthodes autorisées
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("HTTP/1.1 200 OK");
    exit;
}

class DbConnect
{
    private $server = "localhost";
    private $dbname = "etando";
    private $user = "root";
    private $pass = "";

    public function connect()
    {
        try {
            $conn = new PDO("mysql:host=" . $this->server . ";dbname=" . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $err) {
            echo "Database Error ! :" . $err->getMessage();
        }
    }
}
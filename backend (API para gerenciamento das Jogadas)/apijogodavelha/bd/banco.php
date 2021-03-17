<?php

class Conexao {
    public $pdo;
    public function __construct(){
        $host = "localhost";
        $port = "3306";
        $user = "root";
        $pass = "";
        $dbname ="jogodavelha";

        $dsn = "mysql:host={$host};dbname={$dbname};port={$port}";

        $this->pdo = new \PDO($dsn, $user, $pass);
    }
    public function insert($inputJSON){
        $inputJSON = file_get_contents('php://input');
        if($inputJSON != ""){
            $input = json_decode($inputJSON, TRUE); //convert JSON into array
            
            $sql = "INSERT INTO `partidas` (jogadas)
                    VALUES (:jogadas)";

            $stmt = $this->pdo->prepare($sql);

            $result = $stmt->execute(array(':jogadas'=> $inputJSON));

            if($result) {
               return "Jogadas recebidas!";
                }// end if
            else {
                return "Deu ruim!";
                }// end else
            } else {
                return "Nenhum dado recebido!";
            }
        }
    
    public function show($id){
        $jogadas = $this->pdo->query("select jogadas from partidas where id = $id")->fetch();
        return $jogadas["jogadas"];
    }
}
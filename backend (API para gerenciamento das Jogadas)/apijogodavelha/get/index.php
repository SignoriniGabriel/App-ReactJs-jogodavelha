<?php

require_once '../bd/banco.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

$id = $_GET["id"];
$banco = new Conexao;
$jogadas = $banco -> show($id);
echo $jogadas;

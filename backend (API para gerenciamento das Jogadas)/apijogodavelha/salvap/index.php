<?php

require_once '../bd/banco.php'; 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

//echo json_encode($_POST);
$inputJSON = file_get_contents('php://input');
$response = array(
    "resultado" => "",
);
$banco = new Conexao;
$resposta = $banco -> insert($inputJSON);
$response['resultado'] = $resposta;

echo json_encode($response);


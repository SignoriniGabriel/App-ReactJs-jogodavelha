<?php

namespace App\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

final class PartidasController{
    public function getPartidas(Request $request, Response $response, array $args): Response{
        $response = $response->withJson([
            "message" => "helo"
        ]);
        return $response;
    }
}
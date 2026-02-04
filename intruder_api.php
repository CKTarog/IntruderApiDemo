<?php
//WEB API FOR PEMBEDS INTRUDER SCANNER
//TEST FOR CONNECTING TO VITE REACT, THE FRONT END DOES NOT HAVE ACTUAL FUNCTIONALITY FOR THE SENSOR
//but logging works if you input a row into the database.

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {http_response_code(200); exit();}

    require 'connection.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $id = $_GET['id'] ?? null;

    switch ($method){
        case 'GET':
            $stmt = $pdo->query("SELECT id, sensor_type, distance, time_detected FROM detections");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;
    }
?>
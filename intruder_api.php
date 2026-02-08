<?php
//WEB API FOR PEMBEDS INTRUDER SCANNER
//TEST FOR CONNECTING TO VITE REACT, THE FRONT END DOES NOT HAVE ACTUAL FUNCTIONALITY FOR THE SENSOR
//but logging works if you input a row into the database.

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    require 'connection.php';

    $action = $_GET['action'] ?? '';

    if ($action === 'getLogs') {
        $stmt = $pdo->prepare("SELECT * FROM detections");
        $stmt->execute();

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }
?>
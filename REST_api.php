<?php
//FULL REST API
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {http_response_code(200); exit();}

    require 'connection.php';

    $method = $_SERVER['REQUEST_METHOD'];
    $id = $_GET['id'] ?? null;

    switch ($method) {
        case 'GET':
            $stmt = $pdo->query("SELECT id, sensor_type, distance, time_detected FROM detections");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            break;

        case 'POST':
            $input = json_decode(file_get_contents("php://input"), true);
            if (!isset($input['distance'])) {
                http_response_code(400);
                echo json_encode(["message" => "No Input"]);
                exit();
            }
            $stmt = $pdo->prepare("INSERT INTO detections (sensor_type, distance) VALUES (?,?)");
            $stmt->execute(["ultrasonic", $input['distance']]);
            http_response_code(201);
            echo json_encode([
                "message" => "Detection added",
                "id" => $pdo->lastInsertId()
            ]);
            break;

        case 'DELETE':
            if (!$id) {
                http_response_code(400);
                echo json_encode(["message" => "ID required"]);
                exit();
            }
            $stmt = $pdo->prepare("DELETE FROM detections WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() === 0) {
                http_response_code(404);
                echo json_encode(["message" => "Detection not found"]);
                exit();
            }
            echo json_encode(["message" => "Detection deleted"]);
            break;
        default:
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
    }
?>
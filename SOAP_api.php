<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: text/xml; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

    if($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {http_response_code(200); exit();}

require 'connection.php';

class IntruderSystem {
    private $db;

    public function __construct($pdo) {
        $this->db = $pdo;
    }

    //GET
    public function GetLogs(){
        $stmt = $this->db->prepare("SELECT * FROM detections");
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $logs = [];

        foreach ($rows as $row) {
            $log = new stdClass();
            $log->id = $row['id'];
            $log->sensor_type = $row['sensor_type'];
            $log->distance = $row['distance'];
            $log->time_detected = $row['time_detected'];
            $logs[] = $log;
        }

        return count($logs) ? $logs : [];
    }

    public function CreateLog($distance){
        $stmt = $this->db->prepare("INSERT INTO detections (sensor_type, distance) VALUES (?,?)");

        try{
            if($stmt->execute(['ultrasonic', $distance])){
                return 'Log created';
            }
        } catch (PDOException $e){
            return 'Error. Could not create log.';
        }
        return 'Unknown Issue';
    }
}

$options = ['uri' => 'http://localhost/ArduinoStuff/IntruderScanner/SOAP_api.php'];
$server = new SoapServer(null, $options);

$server->setObject(new IntruderSystem($pdo));
$server->handle();
?>
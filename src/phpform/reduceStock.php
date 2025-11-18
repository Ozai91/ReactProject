<?php
// Allow CORS from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle CORS preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Accept POST only
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);

// input: { id, category, quantity }
if (!isset($data['id'], $data['category'], $data['quantity'])) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}

$conn = new mysqli('localhost', 'root', '', 'phonestore');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed']);
    exit;
}

$table = $conn->real_escape_string($data['category']);
$id = (int) $data['id'];
$qty = (int) $data['quantity'];

// Subtract stock, but only if enough exists
$sql = "UPDATE $table SET qty = qty - $qty WHERE id = $id AND qty >= $qty";
$result = $conn->query($sql);

if ($result && $conn->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Not enough stock or invalid id']);
}
$conn->close();
?>
<?php
// Allow CORS from any origin
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Handle CORS preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['customer'], $data['products'], $data['grandTotal'], $data['datetime'])) {
    echo json_encode(['error' => 'Missing parameters']);
    exit;
}
$conn = new mysqli('localhost', 'root', '', 'phonestore');
if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed']);
    exit;
}

$customer = $data['customer'];
$products = $data['products'];
$grandTotal = (float)$data['grandTotal'];
$datetime = $conn->real_escape_string($data['datetime']);

// Insert purchase record
$sql_cust = "INSERT INTO purchase_history (full_name, phone, email, products, grand_total, purchase_time) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql_cust);
$stmt->bind_param(
    "ssssds",
    $customer['fullName'],
    $customer['phone'],
    $customer['email'],
    $jsonProducts,
    $grandTotal,
    $datetime
);
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => $stmt->error]);
}
$stmt->close();
$conn->close();
?>
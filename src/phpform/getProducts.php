<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'phonestore');

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}

// Get all products from the mac table
$sql = "SELECT * FROM mac ORDER BY id DESC";
$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'price' => $row['price'],
            'description' => $row['descript'],
            'image' => $row['img'],
            'category' => $row['category'],
            'qty' => $row['qty']
        );
    }
}

echo json_encode($products);

$conn->close();
?>
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'phonestore');

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}

// Get category from query parameter (default to 'mac' for backward compatibility)
$category = isset($_GET['category']) ? strtolower(trim($_GET['category'])) : 'mac';

// Validate category and determine table name
$tableName = '';
if ($category === 'mac') {
    $tableName = 'mac';
} elseif ($category === 'iphone') {
    $tableName = 'iphone';
} elseif ($category === 'ipad') {
    $tableName = 'ipad';
} else {
    die(json_encode(['error' => "Invalid category. Please use 'mac', 'iphone', or 'ipad'."]));
}

// Get all products from the specified table
$sql = "SELECT * FROM $tableName ORDER BY id DESC";
$result = $conn->query($sql);

$products = array();

// Check if query was successful
if ($result === FALSE) {
    // Query failed - table might not exist or SQL error
    echo json_encode(['error' => "Database query failed: " . $conn->error]);
    $conn->close();
    exit;
}

// Check if there are any rows
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $products[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'price' => $row['price'],
            'description' => isset($row['descript']) ? $row['descript'] : '',
            'image' => isset($row['img']) ? $row['img'] : '',
            'category' => isset($row['category']) ? $row['category'] : '',
            'qty' => isset($row['qty']) ? $row['qty'] : 0
        );
    }
}

// Return empty array if no products, not an error
echo json_encode($products);

$conn->close();
?>
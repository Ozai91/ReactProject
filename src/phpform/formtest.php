<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$conn = new mysqli('localhost', 'root', '', 'phonestore');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize response array
$response = array('success' => false, 'message' => '');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
    $price = isset($_POST['price']) ? $conn->real_escape_string($_POST['price']) : '';
    $description = isset($_POST['description']) ? $conn->real_escape_string($_POST['description']) : '';
    $category = isset($_POST['category']) ? $conn->real_escape_string($_POST['category']) : '';
    $qty = isset($_POST['qty']) ? $conn->real_escape_string($_POST['qty']) : '0';
    
    // File upload handling
    $image_url = '';
    if(isset($_FILES['image'])) {
        $target_dir = "../../public/uploads/";
        // Create directory if it doesn't exist
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $file = $_FILES['image'];
        $fileName = time() . '_' . basename($file["name"]);
        $targetFilePath = $target_dir . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        // Validate file type
        $allowTypes = array('jpg', 'jpeg', 'png', 'gif');
        if(in_array($fileType, $allowTypes)) {
            if(move_uploaded_file($file["tmp_name"], $targetFilePath)) {
                $image_url = '/Clones/ReactProject/public/uploads/' . $fileName;
            } else {
                $response['message'] = "Sorry, there was an error uploading your file.";
                echo json_encode($response);
                exit;
            }
        } else {
            $response['message'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            echo json_encode($response);
            exit;
        }
    }

    // Insert data into database
    $sql = "INSERT INTO mac (name, price, descript, img, category, qty) 
            VALUES ('$name', '$price', '$description', '$image_url', '$category', '$qty')";

    if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Product added successfully";
    } else {
        $response['message'] = "Error: " . $sql . "<br>" . $conn->error;
    }

    // Return JSON response for API calls
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
        echo json_encode($response);
        exit;
    }
}

// Close database connection
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Mac Product</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold mb-6 text-center">Add New Mac Product</h2>
            
            <?php if(isset($response['message'])): ?>
                <div class="mb-4 p-4 rounded <?php echo $response['success'] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'; ?>">
                    <?php echo $response['message']; ?>
                </div>
            <?php endif; ?>

            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" enctype="multipart/form-data">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                        Product Name
                    </label>
                    <input type="text" id="name" name="name" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
                        Price
                    </label>
                    <input type="number" id="price" name="price" step="0.01" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                        Description
                    </label>
                    <textarea id="description" name="description" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"></textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="category">
                        Category
                    </label>
                    <input type="text" id="category" name="category" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="qty">
                        Quantity
                    </label>
                    <input type="number" id="qty" name="qty" required min="0"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
                        Product Image
                    </label>
                    <input type="file" id="image" name="image" accept="image/*" required
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>

                <div class="flex items-center justify-center">
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

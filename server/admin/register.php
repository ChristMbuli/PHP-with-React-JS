<?php
require("../connexion.php");

$obj = new DbConnect;
$conn = $obj->connect();

try {
    // Retrieving JSON data from the request body
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    // Validate the JSON data
    if (
        !$data ||
        !isset($data->fname) ||
        !isset($data->lname) ||
        !isset($data->email) ||
        !isset($data->mdp)
    ) {
        throw new Exception("Invalid or incomplete data received");
    }

    // Prepare and execute the SQL statement
    $sql = "INSERT INTO owners (fname, lname, email, mdp, created_at) VALUES (:fname, :lname, :email, :mdp, NOW())";
    $stmt = $conn->prepare($sql);
    $hashedPassword = password_hash($data->mdp, PASSWORD_DEFAULT);

    $stmt->bindParam(":fname", $data->fname);
    $stmt->bindParam(":lname", $data->lname);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":mdp", $hashedPassword);

    if ($stmt->execute()) {
        // Success response
        http_response_code(201); // Created
        echo json_encode(['status' => 201, 'message' => 'Record created successfully']);
    } else {
        // Failure response
        http_response_code(500); // Server error
        echo json_encode(['status' => 500, 'message' => 'Failed to create record']);
    }
} catch (Exception $e) {
    // Exception handling
    http_response_code(400); // Bad request
    echo json_encode(['status' => 400, 'message' => $e->getMessage()]);
}
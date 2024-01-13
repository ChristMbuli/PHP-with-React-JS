<?php
session_start();
require("../connexion.php");

$obj = new DbConnect;
$conn = $obj->connect();

try {
    $json = file_get_contents("php://input");
    $data = json_decode($json);

    //Déconnexion User // button handleClick dans react
    if (isset($data->userId)) {
        // Mettre à jour la colonne "online" à 0 pour indiquer que l'utilisateur est hors ligne
        $updateOnlineStatus = $conn->prepare('UPDATE owners SET online_status = 0 WHERE id_owner = :ownerId');
        $updateOnlineStatus->execute(array('ownerId' => $data->userId));

        // Détruire la session
        session_destroy();
        // Réponse JSON en cas de succès
        http_response_code(200);
        echo json_encode(['status' => 200, 'message' => 'Déconnexion réussie']);
    }
} catch (Exception $e) {
    // Réponse JSON en cas d'exception ou d'erreur
    http_response_code(500);
    echo json_encode(['status' => 500, 'message' => $e->getMessage()]);
}
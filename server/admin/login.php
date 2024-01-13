<?php
session_start();
require("../connexion.php");

$obj = new DbConnect;
$conn = $obj->connect();

// la durée de vie de la session ( 1 heure)
ini_set('session.gc_maxlifetime', 3600);

try {
    $json = file_get_contents("php://input");
    $data = json_decode($json);


    $ifExist = "SELECT * FROM owners WHERE email = ?";
    $stmt = $conn->prepare($ifExist);
    $stmt->execute([$data->email]);

    if ($stmt->rowCount() > 0) {
        $Infos = $stmt->fetch();

        if (password_verify($data->mdp, $Infos['mdp'])) {
            if (!isset($_SESSION['admin'])) {
                $updateOnlineStatus = $conn->prepare('UPDATE owners SET online_status = 1 WHERE id_owner = :ownerId');
                $updateOnlineStatus->execute(array('ownerId' => $Infos['id_owner']));
            }

            // Réponse JSON en cas de succès
            http_response_code(200);
            echo json_encode([
                'status' => 200,
                'message' => 'Connexion réussie',
                'user' => [
                    'id_owner' => $Infos['id_owner'],
                    'fname' => $Infos['fname'],
                    'lname' => $Infos['lname'],
                    'email' => $Infos['email'],
                    'profil' => $Infos['profil']
                ]
            ]);
        } else {
            // Réponse JSON si le mot de passe est incorrect
            http_response_code(401); // Unauthorized
            echo json_encode(['status' => 401, 'message' => 'Mot de passe incorrect']);
        }
    } else {
        // Réponse JSON si l'email n'existe pas
        http_response_code(404); // Not Found
        echo json_encode(['status' => 404, 'message' => 'Email non trouvé']);
    }
} catch (Exception $e) {
    // Réponse JSON en cas d'exception ou d'erreur
    http_response_code(500);
    echo json_encode(['status' => 500, 'message' => $e->getMessage()]);
}
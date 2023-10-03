<?php

$mysqli = require __DIR__ . "/database.php";

$sql = sprintf("SELECT * FROM user
                WHERE email = '%s'",
                $mysqli->real_escape_string($_GET["email"]) 
);

$result = $mysqli->query($sql);

$is_taken = $result->num_rows > 0;  // Changed the variable name to better reflect the state

header("Content-Type: application/json");

echo json_encode(["available" => !$is_taken]); 

?>
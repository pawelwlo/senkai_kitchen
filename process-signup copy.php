<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


if (empty($_POST["name"])) {
    die("Name is required");
}

if( ! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Valid email is required");
}

if (strlen($_POST["password"]) < 6) {
    die("Password must be 6 charachters or longer");
}

if (! preg_match("/[a-z]/i", $_POST["password"])) {
    die("Password must contain at least one letter");}

if (! preg_match("/[0-9]/i", $_POST["password"])) {
    die("Password must contain at least one number");}

if ($_POST["password"] !== $_POST["password_confirmation"] ) {
    die ("Passwords must match");
}



$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

// Database connection
$mysqli = require __DIR__ . "/database.php";

// SQL query
$sql = "INSERT INTO user (name, email, password_hash)
        VALUES (?, ?, ?)";

// Prepared statement
$stmt = $mysqli->stmt_init();

if (!$stmt->prepare($sql)) {
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("sss", $_POST["name"], $_POST["email"], $password_hash);

// Execute the statement


    if ($stmt->execute()) {
        // Redirect on success
        header("Location: signup-success.html");
        exit;
    } else {
        // Handle errors
        if ($mysqli->errno === 1062) {
            die("Email already taken");
        } else {
            die($mysqli->error . " " . $mysqli->errno);
        }
    }






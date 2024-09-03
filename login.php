<?php
$servername = "localhost:3308";
$username = "root";
$password = "";
$dbname = "test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve data from the login form
$phno = $_POST['phno'];
$pswd = $_POST['pswd'];

// SQL query to check if the provided phone number and password match a record in the "register" table
$sql = "SELECT * FROM register1 WHERE phone = '$phno' AND password = '$pswd'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Login successful
    header("Location: home.html"); // Redirect to the home page or any other page after successful login
} else {
    // Login failed
    header("Location: login.html?error=invalid"); // Redirect back to the login page
}

$conn->close();
?>

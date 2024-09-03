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

// Retrieve data from the form
$fname = $_POST['fname'];
$password = $_POST['password'];
$email = $_POST['email'];
$number = $_POST['number'];

// SQL query to insert data into the "register" table
$sql = "INSERT INTO register1 (phone, email, name, password ) VALUES ( '$number', '$email','$fname', '$password')";
$sql1= "INSERT INTO address1 (phone,name,address) VALUES ('$number','$fname','')";
if ($conn->query($sql) === TRUE) {
    $conn->query($sql1);
    header("Location: home.html");
    #echo "Registration successful!";
} else {
    header("Location: register.html");
}

$conn->close();
?>

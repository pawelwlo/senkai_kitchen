<?php
session_start();

$user = null;  // Initialize $user variable

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/database.php";

    
    $sql = "SELECT * FROM user WHERE id = {$_SESSION["user_id"]}";


    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc();
}
?>





<?php include('header.php');  ?>

<?php include('nav.php');  ?>

<body>



<main class="main">

<div class="offer">

    <p>
        Selamat datang di Senkai Kitchen - Camilan Bahagia Anda Menanti!
    </p>

    

    <div class="list">

    </div>
   
    
</div>
<div class="card">
        <h1>Your order:</h1>
        <ul class="listCard">
            
        </ul>
        <div class="checkOut">
            <div class="total">Total Price: 0 IDR</div>
            
            <div class="closeShopping">Close</div>
        </div>
    </div>

</main>

</body>

<?php include('footer.php');  ?>
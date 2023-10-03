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

<?php

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $mysqli = require __DIR__ . "/database.php";

    $sql = sprintf("SELECT * FROM user
    WHERE email = '%s'",
    $mysqli->real_escape_string($_POST["email"]));  // Added closing single quote and parenthesis here

    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc();

    if ($user) {

      if  (password_verify($_POST["password"], $user["password_hash"])) {

        session_start();

        session_regenerate_id();

        $_SESSION["user_id"] = $user["id"];

        header("Location: index.php");
        exit;
      }

    }

    $is_invalid = true;
}


?>
<?php include('header.php');  ?>

<?php include('nav.php');  ?>

<body>
<main>
    <?php if ($is_invalid): ?>
    <em>Invalid login</em>
    <?php endif; ?>
  <div class="login_form">
    
  <form method="post" >
        <label for="email" id="label">Email</label>
        <input type="email" name="email" id="email"
                    value="<?= htmlspecialchars($_POST["email"] ?? " ") ?>"><br>
                
        <label for="password" id="label">Password</label>
        <input type="password" name="password" id="password">

        <button>Log in</button>
    </form>
    <p>Don't have an account yet?<a href="signup.php"> Signup</a></p>
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

   
    

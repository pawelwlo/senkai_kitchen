<header>
  

<div class="logo">
            <img src="logo.png" id="logo" >
            <h1>Senkai Kitchen</h1>
        </div>
        
<?php if (isset($user)): ?>

    

        <div class="header">
            
                <p class="home"><a href="index.php">Home</a></p>
            
            
        
            <p><a href="logout.php">Log out</a></p>

            <p class="shopping">
                <img src="shopping.svg"></a>
                    <span class="quantity">0</span>
            </p>
        </div>
        <p class="welcome" >Hello <?= $user["name"] ?>, you are now logged in</p>
<?php else: ?>
        <div class="header">
            <p class="home"><a href="index.php">Home</a></p>
            
            
        <p><a href="login.php">Log in</a> </p>
        <p class="shopping">
            <img src="shopping.svg"></a>
                <span class="quantity">0</span>
        </p>
        </div>
    

<?php endif; ?>
            
        
        
    
</header>

<?php include('header.php');  ?>

<?php include('nav.php');  ?>

<body>
<main>
    
    <div class="signup_form">
        <form action="process-signup.php" method="post" id="signup" novalidate>
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" name="name">
            </div>
    
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
            </div>
    
            <div>
                <label for="password">Password</label>
                <input type="password" id="password" name="password">
            </div>
            
            <div>
                <label for="password_confirmation">Repeat Password</label>
                <input type="password" id="password_confirmation" name="password_confirmation">
            </div>
            <button>Sign up</button>
        </form>
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
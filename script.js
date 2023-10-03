const users = [];

document.getElementById("createAccount").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    if (password !== passwordConfirm) {
        alert("Password doesn't match, try again");
        document.getElementById("createAccount").reset();
    }

    users.push({username, email, password});

    alert("Sign up successful! You can now log in.");
    document.getElementById("createAccount").reset();
} );




document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();
    const loginUsername = document.getElementById("usernameLogin").value;
    const loginPassword = document.getElementById("passwordLogin").value;

    const user = users.find(user => user.username === loginUsername && user.password === loginPassword);

    if (user) {
        alert("Login successful!");
    } else {
        alert("Login failed. Please check your username and password.");
    }

    document.getElementById("login").reset();
});

console.log(users);

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });

// Define User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', UserSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to the database
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  res.send('User registered successfully.');
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    res.send('Login successful.');
  } else {
    res.status(401).send('Login failed.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



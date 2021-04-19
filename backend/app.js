const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const { JsonWebTokenError, decode } = require('jsonwebtoken');
const { db } = require('./models/User');

const app = express();
const databaseURI =
  'mongodb+srv://cs160group:cs160grouppassword@cluster0.unnm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(databaseURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB is connected...');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json()); // Use JSON as the Parser
app.use(cors());

app.get('/', (request, response) => {
  // Test Middleware by reading request body
  console.log(request.body);
  response.json({ sampleText: 'Hello from Default Route' }); // Send "Default Route" response
});

app.post('/login', async (request, response) => {
  const { username, password } = request.body;
  await User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    if (user) {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const jwt = user.generateJWT();
          response.json({ status: 200, token: jwt });
        } else {
          response.json({ status: 401, message: 'Invalid authentication' });
        }
      });
    } else {
      response.json({ status: 401, message: 'User was not found' });
    }
  });
});

app.post('/register', async (request, response) => {
  const { firstName, lastName, username, password } = request.body;
  // Check if user exist in MongoDB
  // If not, hash password, create entry
  const testUser = User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
  });
  await User.findOne({ username: username }, (err, user) => {
    if (err) throw err;
    // User does not exist
    if (user === null) {
      testUser.save(function (err) {
        if (err) throw err;
        console.log('Creating user...');
        console.log(testUser);
      });
    } else {
      console.log(user);
    }
  });

  response.json();
});

//Get the profile information
app.post('/profile', async (request, response) => {
  let token = request.body.token;
  jwt.verify(token, 'CS160_JWT_SECRET_KEY', (err, decoded) => {
    if (err) response.json({ status: 401, message: 'token expired' });
    response.json(decoded);
  });
});

app.post('/auth', async (req, res) => {
  let token = req.body.token;
  jwt.verify(token, 'CS160_JWT_SECRET_KEY', (err, decoded) => {
    if (err) res.json({ status: 401, message: 'token expired' });
    res.json(decoded);
  });
});

/*
app.get('/profile', async(request, response) => {
  var auth = request.headers.authorization.split(' ')[1], decoded;
  decoded = jwt.verify(auth, secret.secretToken);
  var userId = decoded.id;
  User.findOne({_id: userId})
   
  response.json();

})  
*/
const port = process.env.PORT || 5000; // We are reserving port 3000 for the frontend.

app.listen(port);

console.log(`Server is running on port ${port}`);

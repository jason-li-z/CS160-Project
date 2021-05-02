const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const { JsonWebTokenError, decode } = require('jsonwebtoken');
const { db } = require('./models/User');
const Questions = require('./models/Questions');
// const Data = require('./models/Data');
const Qa = require('./models/Qa');

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

app.post('/userquestion', async (request, response) => {
  const { userName, questionArray } = request.body;
  const testUser = Questions({
    userName: userName,
    questionArray: questionArray,
  });

  await Questions.findOne({ userName: userName }, async (err, user) => {
    if (err) response.json({ status: 404 });
    if (user) {
      await Questions.updateOne({ userName: userName }, { $push: { questionArray: questionArray } });
      response.json({ status: 200 });
      return;
    } else {
      await testUser.save(function (err) {
        if (err) console.log(err);
        response.json({ status: 200 });
        return;
      });
    }
  });
  // Try to find user, if user exists add onto array
  // If user does not exist, create new entry
});

app.post('/data', async (request, response) => {
  //need to get the username
  const { token } = request.body;
  let obj = {};
  jwt.verify(token, 'CS160_JWT_SECRET_KEY', async (err, decoded) => {
    if (err) {
      response.json({ status: 401, message: 'token expired' });
      return;
    }
    obj = decoded;
    if (obj) {
      await Questions.findOne({ userName: obj.username }, async (err, user) => {
        if (err) throw err;
        if (user) {
          response.json({ status: 200, data: user });
        } else {
          response.json({ status: 404 });
        }
      });
    }
  });
});

//Get the profile information
app.post('/profile', async (request, response) => {
  let token = request.body.token;
  //let name = request.body.username;
  //let username = request.body.firstName;
  //console.log(name);
  jwt.verify(token, 'CS160_JWT_SECRET_KEY', (err, decoded) => {
    if (err) {
      response.json({ status: 401, message: 'token expired' });
      return;
    }
    response.json({ status: 200, data: decoded });
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

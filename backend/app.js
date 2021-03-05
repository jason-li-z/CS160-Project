const express = require('express');
const mongoose = require('mongoose');

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

app.get('/', (request, response) => {
  // Test Middleware by reading request body
  console.log(request.body);
  response.json({ sampleText: 'Hello from Default Route' }); // Send "Default Route" response
});

const port = process.env.PORT || 5000; // We are reserving port 3000 for the frontend.

app.listen(port);

console.log(`Server is running on port ${port}`);
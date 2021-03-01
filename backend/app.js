const express = require("express")

const app = express();

app.use(express.json()); // Use JSON as the Parser

app.get("/", (request, response) => {
    // Test Middleware by reading request body
    console.log(request.body);
    response.json({ sampleText: "Hello from Default Route" }); // Send "Default Route" response
});

const port = process.env.PORT || 5000; // We are reserving port 3000 for the frontend.

app.listen(port);

console.log(`Server is running on port ${port}`);



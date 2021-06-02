// Require Express to run server and routes
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create an empty JavaScript object
projectData = {};

// Select the project folder
app.use(express.static("website"));

// GET Route
app.get("/all", (req, res) => {
    res.send(projectData);
});

// POST Route
app.post("/add", (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
});

// Assign port number to a variable
const port = 3000;

// Start  the server
app.listen(port, () => {
    console.log(`Server running at port number ${port}`);
});

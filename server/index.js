import express from "express";
// importing the mongoose Connection to connect to MongoDB.
import Connection from "./database/db.js";
import dotenv from "dotenv"; // importing dotenv to use the environment variables
import cors from "cors"; // importing cors to allow cross-origin requests

import bcrpyt from "bcrypt"; // importing bcrypt to hash the password
import jwt from "jsonwebtoken"; // importing jsonwebtoken to create tokens
import bodyParser from "body-parser";

import routes from "./routes/routes.js"; // importing the routes

// Initializing the Express app

const app = express();

// Configuring dotenv to use the environment variables

dotenv.config();

app.use(bodyParser.json({ extended: true })); // using body-parser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: true })); // using body-parser to parse URL-encoded bodies into JS objects

app.use(cors()); // using cors to allow cross-origin requests
app.use("/", routes); // using the routes"

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Defining the PORT

const PORT = 5000;

// calling the connection function
Connection(username, password);

// Listening on the port 5000

app.listen(PORT, () => {
  console.log(`Listening on the PORT : ${PORT}`);
});

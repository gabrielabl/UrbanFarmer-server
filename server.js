const express = require("express");
const cors = require("cors");
const app = express();


//Middleware

require("dotenv").config();
const { PORT, CORS_ORIGIN } = process.env;
app.use(cors()); // Enable CORS
app.use(express.json({ origin : CORS_ORIGIN})); // Parse incoming JSON data
app.use(express.static('public')); // Serve static files from the 'public' directory

//Route test
app.get("/", (req, res) => {
    res.send("Hello");
  });


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
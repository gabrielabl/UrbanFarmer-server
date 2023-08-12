const express = require("express");
const cors = require("cors");
const app = express();
const profileRoutes = require('./routes/profileRoutes');
const collectionRoutes = require('./routes/collectionRoutes');


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

Routes
app.use('/profile', profileRoutes);
app.use('/collection',collectionRoutes);



app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
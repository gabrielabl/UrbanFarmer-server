const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const profileRoutes = require("./routes/profileRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const authRoutes = require("./routes/authRoutes");
const knex = require("knex")(require("./knexfile"));

//Middleware
require("dotenv").config();
const { PORT, CORS_ORIGIN, SECRET_KEY } = process.env;
app.use(cors({ origin: CORS_ORIGIN })); // Enable CORS
app.use(express.json()); // Parse incoming JSON data
app.use(express.static("public/images")); // Serve static files from the 'public' directory

// Auth Middleware
app.use((req, res, next) => {
  //Applying auth middleware to all routes except to start page,about page and sign up
  if (
    req.url === "/signup" ||
    req.url === "/login" ||
    req.url === "/emailcheck" ||
    req === "/"
  ) {
    next();
  } else if (req.headers.authorization === undefined) {
    return res.status(403).json({ error: "Access not allowed" });
  } else {
    //Editing the form of token
    const token = req.headers.authorization.split(" ")[1];
    //Verifying token
    if (req.headers.authorization.split(" ")[1]) {
      if (jwt.verify(token, SECRET_KEY)) {
        //Access do data
        req.decode = jwt.decode(token);
        next();
      } else {
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

//Route test
app.get("/", (_req, res) => {
  res.send("Hello");
});

// Routes
app.use("/profile", profileRoutes);
app.use("/collection", collectionRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

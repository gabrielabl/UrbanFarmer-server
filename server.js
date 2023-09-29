const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const profileRoutes = require("./routes/profileRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const authRoutes = require("./routes/authRoutes");
const messageRoute = require('./routes/messageRoute')

//MIDDLEWARE
require("dotenv").config();
const { PORT, CORS_ORIGIN, SECRET_KEY } = process.env;
app.use(cors({ origin: CORS_ORIGIN })); // ENABLE CORS AND PREVENTS OTHER FRONT END FROM ACCESSING BACK END
app.use(express.json()); // PARSE INCOMING JSON DATA
app.use(express.static("public/images")); // MAKE STATIC FILES FROM PUBLIC AVALIABLE

//AUTH MIDDLEWARE
app.use((req, res, next) => {
  //APPLYING AUTH MIDDLEWARE TO ALL ROUTES EXCEPT TO START PAGE,ABOUT PAGE AND SIGN UP
  if (
    req.url === "/signup" ||
    req.url === "/login" ||
    req.url === "/emailcheck" ||
    req === "/public/images"
  ) {
    next();
    //IF TOKEN IS NOT PRESENT IN HEADER REQUEST BAN USER FROM ACCESSING IT
  } else if (req.headers.authorization === undefined) {
    return res.status(403).json({ error: "Access not allowed" });
  } else {
    //EDITING THE FORM OF TOKEN
    const token = req.headers.authorization.split(" ")[1];

    //VERIFYING IF TOKEN IS VALID
    if (req.headers.authorization.split(" ")[1]) {
      if (jwt.verify(token, SECRET_KEY)) {
        //ACCESS TO TOKEN DATA
        req.decode = jwt.decode(token);
        next();
      } else {
        //TOKEN NOT VALID
        res.status(403).json({ error: "Not Authorized." });
      }
    } else {
      res.status(403).json({ error: "No token. Unauthorized." });
    }
  }
});

//ROUTE TEST
app.get("/", (_req, res) => {
  res.send("Hello");
});

//ROUTES
app.use("/profile", profileRoutes);
app.use("/collection", collectionRoutes);
app.use("/", authRoutes);
app.use("/messages", messageRoute)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

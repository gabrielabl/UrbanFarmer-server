const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { SECRET_KEY } = process.env;

exports.signUp = (req, res) => {
  //HASHING PASSWORD TO STORE IN DATABASE
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  //VARIABLES
  //DURING SIGN UP ONLY USER_NAME, EMAIL AND PASSWORD WILL BE ADDED
  const newProfile = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: hashedPassword,
    avatar_photo: " ",
    city: " ",
    province: " ",
    likes: 0,
    views: 0,
    trades: 0,
    about: " ",
  };

  // DESCONTRUCTING NEW PROFILE DATA
  const { user_name, email, password } = newProfile;

  //VALIDATION

  //VALIDATION MISSING PROPERTIES IN THE REQUEST BODY
  if (!user_name || !email || !password) {
    return res.status(400).json({
      error: `Empty field. Please make sure to provide email ,user_name and password information`,
    });
  }

  //VALIDATING EMAIL ADDRESS
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  //ADDING PROFILE TO DATABASE
  knex("users")
    .insert({ ...newProfile, id: uuidv4() })
    .then((data) => {
      // RESPONSE RETURNS 201 IF SUCCESSFUL
      return res.status(201).json({ success: `Profile Added` });
    })
    //SERVER ERROR
    .catch((err) => {
      return res.status(500).json({ error: `Failed to add profile, ${err}` });
    });
};

exports.login = (req, res) => {
  // DESCONTRUCTING REQ BODY
  const { emailLogin, passwordLogin } = req.body;

  //FINDING USER IN THE DATABASE
  knex("users")
    .where({ email: emailLogin })
    .then((data) => {
      const user = data[0];
      //IF USER NOT FOUND IN DATABASE
      if (!user) {
        res.status(403).json({ error: "User not found in database" });
        //CHECKING IF PASSWORD IS THE SAME AS HASHED VERSION IN THE DATABASE
      } else if (bcrypt.compareSync(passwordLogin, user.password)) {
        //GENERATING TOKEN ONCE USER IS FOUND
        const token = jwt.sign(
          { email: user.email, userId: user.id },
          SECRET_KEY
        );
        res.status(200).json({
          token: token,
          message: `Successful login`,
        });
      } else {
        //IF PASSWORD IS INCORRECT
        res.status(403).json({ error: "Incorrect password" });
      }
    });
};

exports.profileUser = (req, res) => {
  //VARIABLES
  const userId = req.decode.userId;

  //GETTING USER PROFILE BY ID
  knex("users")
    .where({ id: userId })
    .select(
      "id",
      "user_name",
      "avatar_photo",
      "city",
      "province",
      "likes",
      "views",
      "trades",
      "about"
    )
    .then((data) => {
      if (!data.length) {
        //IF USER NOT FOUND
        return res.status(404).send(`Record with id: ${userId} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).json({ error: `Error retrieving Profile, ${err}` })
    );
};

//THIS VERIFY IF EMAIL IS ALREADY IN DATABASE, IT PREVENTS MULTIPLES USERS WITH THE SAME EMAIL
exports.emailDbCheck = (req, res) => {
  //VARIABLES
  const email = req.body.email;

  //CHECKS IF EMAIL IS ALREADY IN DATABASE
  knex("users")
    .where({ email: email })
    .then((data) => {
      //IF DATA LENGTH IS BIGGER THAN ZERO, THE EMAIL WAS FOUND
      if (data.length > 0) {
        return res.status(302).json({ message: "Email already in database" });
      } else {
        return res.status(200).json({ message: "Email not in database" });
      }
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving collection items: ${err}`)
    );
};

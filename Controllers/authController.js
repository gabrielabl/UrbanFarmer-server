const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { SECRET_KEY } = process.env;

exports.signUp = (req, res) => {
  //Note avatar photo uploading will be set-up in conjunction with front-end

  //Hashing password to store in database
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  //Variables
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

  const { user_name, email, password } = newProfile;

  //Validation

  //Validation missing properties in the request body
  if (!user_name || !email || !password) {
    return res.status(400).json({
      error: `Empty field. Please make sure to provide email,user_name and password information`,
    });
  }

  //Validating email address
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  //Adding profile to Database

  knex("users")
    .insert({ ...newProfile, id: uuidv4() })
    .then((data) => {
      // Response returns 201 if successful
      return res.status(201).json({ success: `Profile Added` });
    })
    //Server error
    .catch((err) => {
      return res.status(500).json({ error: `Failed to add profile, ${err}` });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  knex("users")
    .where({ email: email })
    .then((data) => {
      const user = data[0];
      if (!user) {
        res.status(403).json({ error: "User not found in database" });
      } else if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email, userId: user.id}, SECRET_KEY);
        res.status(200).json({
          token: token,
          message: `Successful login`,
        });
      } else {
        res.status(403).json({ error: "Incorrect password" });
      }
    });
};

exports.profileUser = (req, res) => {
  const userId = req.decode.userId;

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
        return res
          .status(404)
          .send(`Record with id: ${userId} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).json({ error: `Error retrieving Profile, ${err}` })
    );
};

//This verify if email is already in database, it prevents multiples users with the same email
exports.emailDbCheck = (req,res)=>{
const email = req.body.email;
knex('users')
.where({email: email})
.then((data) => {
  console.log(data)
  if(data.length > 0){
   return  res.status(200).json({message:"Email already in database"});
  } else {
    return  res.status(200).json({message:"Email not in database"});
  }
})
.catch((err) =>
  res.status(400).send(`Error retrieving collection items: ${err}`)
);
};

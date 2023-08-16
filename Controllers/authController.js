const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");


exports.signUp = (req, res) => {
    //Note avatar photo uploading will be set-up in conjunction with front-end
  
//Hashing password to store in database
const hashedPassword = bcrypt.hashSync(req.body.password,saltRounds);

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
  
    const { user_name, email, password } =
      newProfile;
  
    //Validation

    //Validation missing properties in the request body
if(!user_name || !email || !password){
    return res.status(400).json({
        error: `Empty field. Please make sure to provide email,user_name and password information`,
      }); 
};
  
    //Validating email address
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid Email" });
    }
  


    //Adding profile to Database
  
    knex("users")
      .insert({ ...newProfile, id: uuidv4()})
      .then((data) => {
        // Response returns 201 if successful
        return res.status(201).json({ success: `Profile Added` });
      })
      //Server error
      .catch((err) => {
        res.status(500).json({ error: `Failed to add profile, ${err}` });
      });
  };

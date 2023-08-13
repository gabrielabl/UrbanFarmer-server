const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.singleProfile = (req, res) => {
  // Variables
  const idReq = req.params.id;

  //Retrieving single profile user from Database

  knex("users")
    .where({ id: idReq })
    .then((data) => {
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send({ error: `Error retrieving Profile, ${err}` })
    );
};

exports.newProfile = (req, res) => {
  //Note avatar photo uploading will be set-up in conjunction with front-end

  //Variables

  const newProfile = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    avatar_photo: req.body.avatar_photo,
    city: req.body.city,
    province: req.body.province,
    likes: 0,
    views: 0,
    trades: 0,
    about: req.body.about,
  };

  const { user_name, email, password, avatar_photo, city, province, about } =
    newProfile;

  //Validation
  //Validation missing properties in the request body
  for (let key in newProfile) {
    if (newProfile[key] == undefined) {
      return res.status(400).json({
        error: `Empty field on: ${key}. Please make sure to provide information`,
      });
    }
  }

  //Validating email address
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  //Adding profile to Database

  knex("users")
    .insert({
      id: uuidv4(),
      user_name: user_name,
      email: email,
      password: password,
      avatar_photo: avatar_photo,
      city: city,
      province: province,
      likes: 0,
      views: 0,
      trades: 0,
      about: about,
    })
    .then((data) => {
      // Response returns 201 if successful
      return res.status(201).json({ success: `Profile Added` });
    })
    //Server error
    .catch((err) => {
      res.status(500).json({ error: `Failed to add profile, ${err}` });
    });
};

exports.updateProfile = (req, res) => {
  //Note avatar photo uploading will be set-up in conjunction with front-end

  //Variables
  const updateProfile = req.body;
  const { email } =updateProfile;
  const userId = req.params.id;

  //Validation
  //Validation missing properties in the request body
  for (let key in updateProfile) {
    if (updateProfile[key] == undefined) {
      return res.status(400).json({
        error: `Empty field on: ${key}. Please make sure to provide information`,
      });
    }
  }

  //Validating email address
  if (!email.includes("@")) {
    return res.status(400).json({ error: "Invalid Email" });
  }

  //Updating profile to Database

  knex("users")
    .where({ id: userId })
    .update(updateProfile)
    .then((data) => {
      //Validating warehouse ID
      if (data === 0) {
        // return 404 with id not found
        return res
          .status(404)
          .json({ error: `Warehouse id: ${userId} not found` });
      }
      return res.status(200).json(req.body);
    })
    // server error
    .catch((err) => {
      return res.status(500).json({ error: `Server error, ${err}` });
    });
};

const knex = require("knex")(require("../knexfile"));
const multer = require("multer");

exports.singleProfile = (req, res) => {
  // Variables
  const idReq = req.params.id;

  //Retrieving single profile user from Database

  knex("users")
    .where({ id: idReq })
    .select(
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
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send({ error: `Error retrieving Profile, ${err}` })
    );
};

exports.updateProfile = (req, res) => {
  //Variables
  const userId = req.params.id;

  //Storage variable
  const filePath = process.cwd() + "/public/images";

  // Middleware
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, filePath);
    },
    filename: function (req, file, callback) {
      callback(null, new Date().valueOf() + userId + file.originalname);
    },
  });

  //Middleware to process the file upload
  const upload = multer({ storage: storage }).single("avatar_photo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ error: "Unknown error: " + err.message });
    }

    //Variable to upload new data
    let updateProfile = req.body;

    //Validation
    //Validation missing properties in the request body
    for (let key in updateProfile) {
      if (!updateProfile[key]) {
        return res.status(400).json({
          error: `Empty field on: ${key}. Please make sure to provide information`,
        });
      }
    }

    //When not data is provided to be uploaded
    if (req.file !== undefined) {
      const fileName = req.file.filename;
      updateProfile = { ...updateProfile, avatar_photo: fileName };
    }

    if (Object.keys(req.body).length === 0 && req.file === undefined) {
      return res.status(400).json({ error: "Not profile data do be uploaded" });
    }

    // //Updating profile to Database
    knex("users")
      .where({ id: userId })
      .update(updateProfile)
      .then((data) => {
        //Validating warehouse ID
        if (data === 0) {
          // return 404 with id not found
          return res
            .status(404)
            .json({ error: `user id: ${userId} not found` });
        }
        return res.status(200).json(req.body);
      })
      // server error
      .catch((err) => {
        return res.status(500).json({ error: `Server error, ${err}` });
      });
  });
};

exports.profileCollection = (req, res) => {
  //Variables
  const userID = req.params.id;
  knex("items")
    .where({ users_id: userID })
    .join('users','items.users_id','users.id')
    .select('user_name','items.id','users_id','item_name','description','item_photo','users.email')  
    .then((data) => {
      //Validating if user exist in the Database
      if (data.length === 0) {
        res.status(200).json({
          message: `User id:${userID} not found or empty collection`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      // Server error
      console.error("Error when fetching inventory items:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

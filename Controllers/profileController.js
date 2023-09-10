const knex = require("knex")(require("../knexfile"));
const multer = require("multer");

exports.singleProfile = (req, res) => {
  //VARIABLES
  const idReq = req.params.id;

  //RETRIEVING A SINGLE PROFILE FROM THE DATABASE
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
      //IF DATA LENGTH RETURNS FALSE, IT MEANS THERE IS NOT PROFILE IF THAT ID
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      res.status(200).json(data[0]);
    })
    //SERVER ERROR
    .catch((err) =>
      res.status(400).send({ error: `Error retrieving Profile, ${err}` })
    );
};

exports.updateProfile = (req, res) => {
  //VARIABLE
  const userId = req.params.id;

  //STORAGE PATH
  const filePath = process.cwd() + "/public/images";

  //MULTER MIDDLEWARE TO STORE FILE DATA
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, filePath);
    },
    filename: function (req, file, callback) {
      callback(null, new Date().valueOf() + userId + file.originalname);
    },
  });

  //MIDDLEWARE TO PROCESS THE FILE UPLOADED
  const upload = multer({ storage: storage }).single("avatar_photo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A MULTER ERROR OCCURRED WHEN UPLOADING
      return res.status(500).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // AN UNKNOWN ERROR OCCURRED WHEN UPLOADING
      return res.status(500).json({ error: "Unknown error: " + err.message });
    }

    //VARIABLE TO UPLOAD NEW DATA
    let updateProfile = req.body;

    //VALIDATION
    //VALIDATION MISSING PROPERTIES IN THE REQUEST BODY
    for (let key in updateProfile) {
      if (!updateProfile[key]) {
        return res.status(400).json({
          error: `Empty field on: ${key}. Please make sure to provide information`,
        });
      }
    }

    //ADDING FILE TO OBJECT IF PRESENT
    if (req.file !== undefined) {
      const fileName = req.file.filename;
      updateProfile = { ...updateProfile, avatar_photo: fileName };
    }

    //WHEN NOT DATA IS PROVIDED TO BE UPLOADED
    if (Object.keys(req.body).length === 0 && req.file === undefined) {
      return res.status(400).json({ error: "Not profile data do be uploaded" });
    }

    //UPDATING PROFILE TO DATABASE
    knex("users")
      .where({ id: userId })
      .update(updateProfile)
      .then((data) => {
        //VALIDATING USER ID
        if (data === 0) {
          // return 404 with id not found
          return res
            .status(404)
            .json({ error: `User id: ${userId} not found` });
        }
        return res.status(200).json(req.body);
      })
      // SERVER ERROR
      .catch((err) => {
        return res.status(500).json({ error: `Server error, ${err}` });
      });
  });
};

exports.profileCollection = (req, res) => {
  //VARIABLES
  const userID = req.params.id;

  //RETRIEVING COLLECTION ITEMS BASED ON PROFILE ID
  knex("items")
    .where({ users_id: userID })
    //JOINING TABLES WITH ITEMS AND SOME USER PROFILE INFORMATION
    .join("users", "items.users_id", "users.id")
    .select(
      "user_name",
      "items.id",
      "users_id",
      "item_name",
      "description",
      "item_photo",
      "users.email"
    )
    .then((data) => {
      //VALIDATING IF USER EXIST IN THE DATABASE OR EMPTY COLLECTION
      if (data.length === 0) {
        res.status(200).json({
          message: `User id:${userID} not found or empty collection`,
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      // SERVER ERROR
      res.status(500).json({ error: "Internal server error" });
    });
};

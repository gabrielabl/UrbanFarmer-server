const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

exports.searchItem = (req, res) => {
  //VARIABLES
  const search = req.body.search;

  //COLLECTION ITEMS OF ALL USERS BASED ON SEARCH REQUEST
  knex("items")
    .where("items.item_name", "like", `%${search}%`)
    //JOINING TABLE THEN RETRIEVING ITEM DATA AND SOME USER PROFILE INFORMATION
    .join("users", "items.users_id", "users.id")
    .select(
      "user_name",
      "avatar_photo",
      "users_id",
      "item_name",
      "description",
      "item_photo",
      "items.id"
    )

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving collection items: ${err}`)
    );
};

exports.newCollectionItem = (req, res) => {
  //STORAGE VARIABLE
  const filePath = process.cwd() + "/public/images";

  // MIDDLEWARE TO STORE FILE
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, filePath);
    },
    filename: function (req, file, callback) {
      callback(
        null,
        new Date().valueOf() + "collectionItem" + file.originalname
      );
    },
  });

  //MIDDLEWARE TO PROCESS THE FILE UPLOADED
  const upload = multer({ storage: storage }).single("item_photo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A MULTER ERROR OCCURRED WHEN UPLOADING
      return res.status(500).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // AN UNKNOWN ERROR OCCURRED WHEN UPLOADING
      return res.status(500).json({ error: "Unknown error: " + err.message });
    }

    //VARIABLE TO UPLOAD NEW DATA
    let addNewCollectionItem = req.body;

    //VALIDATION
    //VALIDATION MISSING PROPERTIES IN THE REQUEST BODY
    for (let key in addNewCollectionItem) {
      if (!addNewCollectionItem[key]) {
        return res.status(400).json({
          error: `Empty field on: ${key}. Please make sure to provide information`,
        });
      }
    }

    //WHEN NOT DATA IS PROVIDED TO BE UPLOADED
    if (req.file !== undefined) {
      const fileName = req.file.filename;
      addNewCollectionItem = { ...addNewCollectionItem, item_photo: fileName };
    }

    //ADDING ITEM TO DATABASE
    knex("items")
      .insert({ ...addNewCollectionItem, id: uuidv4() })
      .then((data) => {
        // RESPONSE RETURNS 201 IF SUCCESSFUL
        return res.status(201).json({ success: `Item added to collection` });
      })
      //SERVER ERROR
      .catch((err) => {
        res.status(500).json({ error: `Failed to add item, ${err}` });
      });
  });
};

exports.deleteCollectionItem = (req, res) => {
  //DELETING ITEM BY ID VARIABLE
  const itemId = req.params.id;

  //DELETING ITEM IN THE DATABASE
  knex("items")
    .delete()
    .where({ id: itemId })
    .then((data) => {
      // ID VALIDATION
      if (data === 0) {
        // RESPONSE RETURNS 404 IF ITEM ID IS NOT FOUND
        return res.status(404).json({
          error: `Item with id: ${itemId} not found to be deleted`,
        });
      }

      //   RESPONSE RETURNS 204 IF SUCCESSFULLY DELETED
      return res
        .status(204)
        .json({ success: `Item with id: ${itemId} deleted` });

      //  SERVER ERROR
    })
    .catch((err) => {
      return res.status(500).json({
        error: `Error deleting item due to server error, ${err}`,
      });
    });
};

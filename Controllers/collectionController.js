const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

exports.searchItem = (req, res) => {
    //variables
    const search=req.body.search;
 
  //Collection items of all users
  knex("items")
  .where('items.item_name','like',`%${search}%`)
  .join('users','items.users_id','users.id')
  .select('user_name','avatar_photo','users.id','item_name','description','item_photo')
 
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving collection items: ${err}`)
    );
};

exports.newCollectionItem = (req, res) => {
  //Storage variable
  const filePath = process.cwd() + "/public/images";

  // Middleware
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

  //Middleware to process the file upload
  const upload = multer({ storage: storage }).single("item_photo");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(500).json({ error: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return res.status(500).json({ error: "Unknown error: " + err.message });
    }

    //Variable to upload new data
    let addNewCollectionItem = req.body;

    //Validation
    //Validation missing properties in the request body
    for (let key in addNewCollectionItem) {
      if (!addNewCollectionItem[key]) {
        return res.status(400).json({
          error: `Empty field on: ${key}. Please make sure to provide information`,
        });
      }
    }

    //When not data is provided to be uploaded
    if (req.file !== undefined) {
      const fileName = req.file.filename;
      addNewCollectionItem = { ...addNewCollectionItem, item_photo: fileName };
    }

    // if (Object.keys(req.body).length === 0 && req.file === undefined) {
    //   return res.status(400).json({ error: "Not profile data do be uploaded" });
    // }

    //Adding item to database
    knex("items")
      .insert({ ...addNewCollectionItem, id: uuidv4() })
      .then((data) => {
        // Response returns 201 if successful
        return res.status(201).json({ success: `Item added to collection` });
      })
      //Server error
      .catch((err) => {
        res.status(500).json({ error: `Failed to add item, ${err}` });
      });
  });
};

exports.deleteCollectionItem = (req, res) => {
  //Deleting item by id
  const itemId = req.params.id;
  knex("items")
    .delete()
    .where({ id: itemId })
    .then((data) => {
      // Id validation
      if (data === 0) {
        // Response returns 404 if warehouse ID is not found
        return res.status(404).json({
          error: `Item with id: ${itemId} not found to be deleted`,
        });
      }

      //   Response returns 204 if successfully deleted
      return res
        .status(204)
        .json({ success: `Item with id: ${itemId} deleted` });

      //  Server error
    })
    .catch((err) => {
      return res.status(500).json({
        error: `Error deleting item due to server error, ${err}`,
      });
    });
};

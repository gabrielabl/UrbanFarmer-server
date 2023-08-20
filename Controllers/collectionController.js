const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");

exports.index = (_req, res) => {
  //Collection items of all users
  knex("items")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving collection items: ${err}`)
    );
};

exports.newCollectionItem = (req, res) => {
  //Note avatar photo uploading will be set-up in conjunction with front-end

  //Variables

  const newItem = {
    users_id: req.body.users_id,
    item_name: req.body.item_name,
    description: req.body.description,
    item_photo: req.body.item_photo,
  };

  const { users_id, item_name, description, item_photo } = newItem;

  //Validation
  //Validation missing properties in the request body
  for (let key in newItem) {
    if (newItem[key] == undefined) {
      return res.status(400).json({
        error: `Empty field on: ${key}. Please make sure to provide information`,
      });
    }
  }

  //Adding item to database
  knex("items")
    .insert({ ...newItem, id: uuidv4() })
    .then((data) => {
      // Response returns 201 if successful
      return res.status(201).json({ success: `Item added to collection` });
    })
    //Server error
    .catch((err) => {
      res.status(500).json({ error: `Failed to add item, ${err}` });
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

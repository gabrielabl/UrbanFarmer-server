const router = require("express").Router();
const collectionController = require("../Controllers/collectionController");

//ADD ITEM
router.route("/").post(collectionController.newCollectionItem);

//SEARCH ITEMS
router.route("/search").post(collectionController.searchItem);

//DELETE ITEM
router.route("/:id").delete(collectionController.deleteCollectionItem);

module.exports = router;

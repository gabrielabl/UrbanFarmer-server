const router = require('express').Router();
const collectionController = require('../Controllers/collectionController');

router.route('/')
.get(collectionController.index)
.post(collectionController.newCollectionItem)

router.route('/:id')
.delete(collectionController.deleteCollectionItem)

module.exports = router;
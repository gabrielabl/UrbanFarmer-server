const router = require('express').Router();
const collectionController = require('../Controllers/collectionController');

router.route('/')
.post(collectionController.newCollectionItem)

router.route('/search')
.post(collectionController.searchItem)

router.route('/:id')
.delete(collectionController.deleteCollectionItem)

module.exports = router;
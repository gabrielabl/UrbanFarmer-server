const router = require('express').Router();
const collectionController = require('../Controllers/collectionController');

router.route('/').get(collectionController.index);

module.exports = router;
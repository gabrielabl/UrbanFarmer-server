const router = require('express').Router();
const profileController = require('../Controllers/profileController');

router.route('/').get(profileController.index);

module.exports = router;
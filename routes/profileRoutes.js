const router = require('express').Router();
const profileController = require('../Controllers/profileController');

router.route('/:id')
.get(profileController.singleProfile)
.patch(profileController.updateProfile);

router.route('/:id/collection')
.get(profileController.profileCollection)


module.exports = router;
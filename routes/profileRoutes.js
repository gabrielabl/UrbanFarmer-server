const router = require('express').Router();
const profileController = require('../Controllers/profileController');

router.route('/')
.post(profileController.newProfile);

router.route('/:id')
.get(profileController.singleProfile)
.put(profileController.updateProfile);


module.exports = router;
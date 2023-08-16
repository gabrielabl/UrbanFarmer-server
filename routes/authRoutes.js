const router = require('express').Router();
const authController = require('../Controllers/authController');

router.route('/signup')
.post(authController.signUp);

module.exports = router;
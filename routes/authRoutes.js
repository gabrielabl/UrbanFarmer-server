const router = require('express').Router();
const authController = require('../Controllers/authController');

router.route('/signup')
.post(authController.signUp);

router.route('/login')
.post(authController.login);

router.route('/profile')
.get(authController.profileUser);

module.exports = router;
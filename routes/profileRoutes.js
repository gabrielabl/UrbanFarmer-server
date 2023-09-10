const router = require("express").Router();
const profileController = require("../Controllers/profileController");

//GET AND UPDATE PROFILE
router
  .route("/:id")
  .get(profileController.singleProfile)
  .patch(profileController.updateProfile);

//GET USER COLLECTION BY ID
router.route("/:id/collection").get(profileController.profileCollection);

module.exports = router;

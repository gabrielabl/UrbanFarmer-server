const router = require("express").Router();
const messageController = require('../Controllers/messageControler')

//GET USER CONVERSATIONS BY ID
router
  .route("/:id")
  .get(messageController.getUserConversationsIds)

module.exports = router;
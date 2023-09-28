const router = require("express").Router();
const messageController = require('../Controllers/messageControler')

//GET USER CONVERSATIONS BY ID
router
  .route("/:id")
  .get(messageController.getUserConversationsIds)

//CREATE CONVERSATION + INITIAL MESSAGE
router.route("/").post(messageController.createConversation)

module.exports = router;
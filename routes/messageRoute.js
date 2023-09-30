const router = require("express").Router();
const messageController = require("../Controllers/messageControler");

//GET USER CONVERSATIONS BY ID
router.route("/:id").get(messageController.getUserConversationsIds);

//CREATE CONVERSATION + INITIAL MESSAGE
router.route("/conversation").post(messageController.createConversation);

//NEW MESSAGE
router.route("/").post(messageController.newMessage);

module.exports = router;

const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");
const casual = require("casual");

//GET CONVERSATIONS BY USER ID
exports.getUserConversationsIds = async (req, res) => {
  const userId = req.params.id;

  //GETTING SENDER MESSAGES FROM DB
  try {
    const senderMessages = await knex("messages")
      .where("sender_id", userId)
      .join("conversations", "messages.conversations_id", "conversations.id")
      .select(
        "conversations.id",
        "sender_id",
        "receiver_id",
        "message_text",
        "messages.created_at"
      );

    //GETTING RECEIVER MESSAGES FROM DB
    const receiverMessages = await knex("messages")
      .where("receiver_id", userId)
      .join("conversations", "messages.conversations_id", "conversations.id")
      .select(
        "conversations.id",
        "sender_id",
        "receiver_id",
        "message_text",
        "messages.created_at"
      );

    //COMBINING RECEIVER + SENDER MESSAGES
    const allMessages = [...senderMessages, ...receiverMessages];

    //VARIABLE TO ADD DATA
    const groupedMessages = [];

    allMessages.map((message) => {
      //FILTERING SAME CONVERSATION MESSAGES
      const filteredMessages = groupedMessages.filter(
        (gMessage) => message.id === gMessage.id
      );
      //FIND INDEX OF CONVERSATION ID
      const gMessagesIndex = groupedMessages.findIndex(
        (element) => element.id === message.id
      );

      //IF CONVERSATIONS DOES NOT EXIST
      if (filteredMessages.length === 0) {
        // NEW OBJECT
        groupedMessages.push({
          id: message.id,
          messages: [
            {
              sender_id: message.sender_id,
              receiver_id: message.receiver_id,
              message: message.message_text,
              timestamp: message.created_at,
            },
          ],
        });
        //IF CONVERSATION ALREADY EXISTS
      } else if (filteredMessages.length > 0) {
        // PUSH EXISTING OBJECT MESSAGE
        groupedMessages[gMessagesIndex].messages.push({
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          message: message.message_text,
          timestamp: message.created_at,
        });
      }
    });

    //IF USER DOES NOT HAVE ANY CONVERSATION
    if (groupedMessages.length === 0) {
      res.status(200).json({
        message: `User id:${userId} has no messages.`,
      });
    } else {
      res.status(200).json(groupedMessages);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//CREATE NEW CONVERSATION PLUS FIRST MESSAGE
exports.createConversation = (req, res) => {
  //CONVERSATION ID
  const newConversationId = uuidv4();
  //DECONSTRUCTING REQ BODY
  const { sender_id, receiver_id, message_text } = req.body;

  //VALIDATION MISSING PROPERTIES IN THE REQUEST BODY
  if (!sender_id || !receiver_id || !message_text) {
    return res.status(400).json({
      error: `Empty field. Please make sure to provide sender_id ,receiver_id and message_text information`,
    });
  }

  //ADDING CONVERSATION TO DATABASE
  knex("conversations")
    .insert({ id: newConversationId, conversation_name: casual.first_name })
    .then((data) => {
      //ADDING INITIAL MESSAGE TO THE DATA BASE
      knex("messages")
        .insert({
          id: uuidv4(),
          conversations_id: newConversationId,
          sender_id: sender_id,
          receiver_id: receiver_id,
          message_text: message_text,
        })
        .then((data) => {
          console.log(data);
        })
        //CATCH IF ADDING MESSAGE FAILS
        .catch((err) => {
          return res
            .status(500)
            .json({ error: `Failed to add message, ${err}` });
        });
      // RESPONSE RETURNS 201 IF SUCCESSFUL
      return res
        .status(201)
        .json({ success: `Conversation and message added` });
    })
    //SERVER ERROR
    .catch((err) => {
      return res.status(500).json({ error: `Failed to add profile, ${err}` });
    });
};

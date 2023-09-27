const { v4: uuidv4 } = require("uuid");

//MESSAGES
const messagesSeedData = [
  {
    id: uuidv4(),
    sender_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    receiver_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    conversations_id: "60c0e5df-2312-440e-9e12-e56ffc302191",
    message_text: "Hey, I have some extra basil from my garden. Would you be interested in trading for some of your mushrooms?",
  },
  {
    id: uuidv4(),
    sender_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    receiver_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    conversations_id: "60c0e5df-2312-440e-9e12-e56ffc302191",
    message_text: "Sure, that sounds like a great trade! I love fresh basil. How many mushrooms are you looking for?",
  },
  {
    id: uuidv4(),
    sender_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    receiver_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    conversations_id: "60c0e5df-2312-440e-9e12-e56ffc302191",
    message_text: "I have about a pound of basil, so how about half a pound of mushrooms?",
  },
  {
    id: uuidv4(),
    sender_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    receiver_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    conversations_id: "60c0e5df-2312-440e-9e12-e56ffc302191",
    message_text: "Sounds good to me! Let's make the trade. When and where would you like to meet?",
  },
  {
    id: uuidv4(),
    sender_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    receiver_id: "79ccf5a2-2e83-413e-9261-974ef4af27b8",
    conversations_id: "7d4ed0da-5682-4588-8586-16eb5bd50dd4",
    message_text: "Hi there! I have some fresh radishes from my garden. Anyone interested in trading?",
  },
  {
    id: uuidv4(),
    sender_id: "79ccf5a2-2e83-413e-9261-974ef4af27b8",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "7d4ed0da-5682-4588-8586-16eb5bd50dd4",
    message_text: "I'd love to trade for radishes! What do you need in exchange?",
  },
  {
    id: uuidv4(),
    sender_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    receiver_id: "79ccf5a2-2e83-413e-9261-974ef4af27b8",
    conversations_id: "7d4ed0da-5682-4588-8586-16eb5bd50dd4",
    message_text: "Do you have any spinach or squash? I could use some of those.",
  },
  {
    id: uuidv4(),
    sender_id: "79ccf5a2-2e83-413e-9261-974ef4af27b8",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "7d4ed0da-5682-4588-8586-16eb5bd50dd4",
    message_text: "Yes, I have both spinach and squash. Let's set up a trade!"
  },
  {
    id: uuidv4(),
    sender_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "b927d484-9762-4234-ad19-0adce8d25b0b",
    message_text: "Hi, I'm looking to trade some of my beetroot for fresh parsley. Anyone interested?",
  },
  {
    id: uuidv4(),
    sender_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    receiver_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    conversations_id: "b927d484-9762-4234-ad19-0adce8d25b0b",
    message_text: "I have plenty of parsley and would love some beetroot. How much are you willing to trade?",
  },
  {
    id: uuidv4(),
    sender_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "b927d484-9762-4234-ad19-0adce8d25b0b",
    message_text: "I have about a dozen beetroot. How about half a pound of parsley?",
  },
  {
    id: uuidv4(),
    sender_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    receiver_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    conversations_id: "b927d484-9762-4234-ad19-0adce8d25b0b",
    message_text: "Sounds like a fair trade to me! Let's arrange a time to meet.",
  },
  {
    id: uuidv4(),
    sender_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "f397dd7b-cdd6-4f30-9d9c-044efe59e432",
    message_text: "I have some extra bread. Would anyone like to trade for something fresh?",
  },
  {
    id: uuidv4(),
    sender_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    receiver_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    conversations_id: "f397dd7b-cdd6-4f30-9d9c-044efe59e432",
    message_text: "I'd love some fresh bread! What would you like in return?",
  },
  {
    id: uuidv4(),
    sender_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    receiver_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    conversations_id: "f397dd7b-cdd6-4f30-9d9c-044efe59e432",
    message_text: "Do you have any green onions? I think they would go well with the bread.",
  },
];

module.exports = messagesSeedData;

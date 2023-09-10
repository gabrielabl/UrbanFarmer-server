const { v4: uuidv4 } = require("uuid");
const casual = require("casual");
//ITEMS
module.exports = [
  {
    id: uuidv4(),
    users_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    item_name: "Basil",
    description: casual.sentences(2),
    item_photo: "items_basil.jpg",
  },
  {
    id: uuidv4(),
    users_id: "4aefea6d-7ecf-4739-9c47-84f437d78844",
    item_name: "Beetroot",
    description: casual.sentences(2),
    item_photo: "items_beetroot.jpg",
  },
  {
    id: uuidv4(),
    users_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    item_name: "Bread",
    description: casual.sentences(2),
    item_photo: "items_bread.jpg",
  },
  {
    id: uuidv4(),
    users_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    item_name: "Green Onions",
    description: casual.sentences(2),
    item_photo: "items_green-onions.jpg",
  },
  {
    id: uuidv4(),
    users_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    item_name: "Jam",
    description: casual.sentences(2),
    item_photo: "items_jam.jpg",
  },
  {
    id: uuidv4(),
    users_id: "76e3db8b-037d-4f69-9fa8-4b0885b0723a",
    item_name: "Mushrooms",
    description: casual.sentences(2),
    item_photo: "items_mushroom.jpg",
  },
  {
    id: uuidv4(),
    users_id: "79ccf5a2-2e83-413e-9261-974ef4af27b8",
    item_name: "Parsley",
    description: casual.sentences(2),
    item_photo: "items_parsley.jpg",
  },
  {
    id: uuidv4(),
    users_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    item_name: "Radish",
    description: casual.sentences(2),
    item_photo: "items_radish.jpg",
  },
  {
    id: uuidv4(),
    users_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    item_name: "Spinach",
    description: casual.sentences(2),
    item_photo: "items_spinach.jpg",
  },
  {
    id: uuidv4(),
    users_id: "ca09943a-3cec-48c3-9052-264b1dc149ab",
    item_name: "Squash",
    description: casual.sentences(2),
    item_photo: "items_squash.jpg",
  },
];

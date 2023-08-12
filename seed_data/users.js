const { v4: uuidv4 } = require("uuid");
const casual = require('casual').en_CA;
require("dotenv").config();
const { PORT } = process.env;

module.exports=[
    {
      id: uuidv4(),
      user_name: "Gabriela",
      password: "password",
      avatar_photo: `http://localhost:${PORT}/images/gabriela_user.jpg`,
      city: "Toronto",
      province: "Ontario",
      likes: 0,
      views: 0,
      trades: 0,
      about: casual.sentences(10)
    },
    {
      id: uuidv4(),
      user_name: casual.name,
      password: "password",
      avatar_photo: `http://localhost:${PORT}/images/avatar-user.jpg`,
      city: casual.city,
      province: casual.province,
      likes: 0,
      views: 0,
      trades: 0,
      about: casual.sentences(10)
    },
    {
      id: uuidv4(),
      user_name: casual.name,
      password: "password",
      avatar_photo: `http://localhost:${PORT}/images/avatar-user2.jpg`,
      city: casual.city,
      province: casual.province,
      likes: 0,
      views: 0,
      trades: 0,
      about: casual.sentences(10)
    },
    {
      id: uuidv4(),
      user_name: casual.name,
      password: "password",
      avatar_photo: `http://localhost:${PORT}/images/avatar-user3.jpg`,
      city: casual.city,
      province: casual.province,
      likes: 0,
      views: 0,
      trades: 0,
      about: casual.sentences(10)
    }
  ];
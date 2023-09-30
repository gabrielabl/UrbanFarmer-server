const userData = require("../seed_data/messages");

//ITEMS SEED DATA
exports.seed = function (knex) {
  return knex("messages")
    .del()
    .then(() => {
      return knex("messages").insert(userData);
    });
};

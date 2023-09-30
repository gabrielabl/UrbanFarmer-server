const userData = require("../seed_data/conversations");

//ITEMS SEED DATA
exports.seed = function (knex) {
  return knex("conversations")
    .del()
    .then(() => {
      return knex("conversations").insert(userData);
    });
};

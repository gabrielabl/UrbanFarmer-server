const userData = require("../seed_data/items");

//ITEMS SEED DATA
exports.seed = function (knex) {
  return knex("items")
    .del()
    .then(() => {
      return knex("items").insert(userData);
    });
};

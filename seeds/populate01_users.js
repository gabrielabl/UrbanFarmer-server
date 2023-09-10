const userData = require("../seed_data/users");

//USER SEED DATA
exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert(userData);
    });
};

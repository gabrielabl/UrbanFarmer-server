const userData = require('../seed_data/items')

exports.seed = function (knex) {
return knex('items')
.del()
.then(()=>{
  return knex('items').insert(userData)
})
};

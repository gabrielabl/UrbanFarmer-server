exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('user_name').notNullable();
    table.string('password').notNullable();
      table.string('avatar_photo').notNullable();
      table.string('city').notNullable();
      table.string('province').notNullable();
      table.integer('likes').notNullable();
      table.integer('views').notNullable();
      table.integer('trades').notNullable();
      table.string('about').notNullable();
      table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};

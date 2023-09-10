exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.uuid("id").primary();
    table
      .uuid("users_id")
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("item_name").notNullable();
    table.string("description").notNullable();
    table.string("item_photo").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

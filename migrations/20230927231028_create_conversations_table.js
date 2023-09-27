exports.up = function (knex) {
    return knex.schema.createTable("conversations", (table) => {
      table.uuid("id").primary();
      table.string("conversation_name").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("conversations");
  };
  
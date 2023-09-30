exports.up = function (knex) {
    return knex.schema.createTable("messages", (table) => {
      table.uuid("id").primary();
      table
        .uuid("sender_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .uuid("receiver_id")
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        table
        .uuid("conversations_id")
        .references("conversations.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.text("message_text").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("messages");
  };
  
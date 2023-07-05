/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chat", (table) => {
    table.increments("chat_id").primary().notNullable();
    // table.bigint("send_date").notNullable();
    table.timestamp("send_date").notNullable().defaultTo(knex.fn.now());
    table.integer("buyer_id").notNullable();
    table.integer("seller_id").notNullable();
    table.boolean("buyer_read_flag").notNullable();
    table.boolean("seller_read_flag").notNullable();
    table.integer("item_id").notNullable();
    table.integer("user_id").notNullable();
    table.foreign("item_id").references("items.id");
    table.foreign("user_id").references("user.id");
    table.foreign("buyer_id").references("user.id");
    table.foreign("seller_id").references("user.id");
    table.text("message").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("chat");
};

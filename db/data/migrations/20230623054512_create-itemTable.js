/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("items", (table) => {
    table.increments("id").primary().notNullable();
    table.string("item_name", 100).notNullable();
    table.string("item_category", 100).notNullable();
    table.text("item_explanation"); //備考欄
    table.string("item_status", 100).notNullable();
    table.integer("item_num").notNullable();
    table.date("item_deadline").notNullable();
    table.text("item_img").notNullable();
    table.integer("item_seller").notNullable();
    table.foreign("item_seller").references("user.id");
    table.boolean("item_transaction_flag").notNullable();
    table.boolean("item_approval_flag").notNullable();
    table.integer("buyer_id");
    table.boolean("payment");
    table.string("pay_id");

  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("items");
};

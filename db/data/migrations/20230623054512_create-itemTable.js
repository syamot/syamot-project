/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("items", (table) => {
        table.increments("id").primary().notNullable();
        table.string("item_name", 100).notNullable();
        table.string("item_category", 100).notNullable();
        table.string("item_status", 100).notNullable();
        table.integer("item_num").notNullable();
        table.date("item_deadline").notNullable();
        table.text("item_img").notNullable();
        table.integer("item_seller").notNullable();
        table.foreign("item_seller").references("user.id");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("items");

};

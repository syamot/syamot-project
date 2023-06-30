/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("chat", (table) => {
        table.increments("id").primary().notNullable();
        table.date("send_date").notNullable();
        table.integer("partner_id").notNullable();
        table.boolean("read_flag").notNullable();
        table.integer("item_id").notNullable();
        table.integer("user_id").notNullable();
        table.foreign("item_id").references("items.id");
        table.foreign("user_id").references("user.id");
        table.text("message").notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("chat");

};

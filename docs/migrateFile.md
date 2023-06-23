/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posted", (table) => {
    table.increments("id").primary();
    table.string("title", 128).notNullable();
    table.string("posted_date").notNullable();
    table.string("tag", 64).notNullable();
    table.string("keyword", 64).notNullable();
    table.text("url").notNullable();
    table.text("pict_url");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posted");
};

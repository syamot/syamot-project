/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary().notNullable();
    table.string("password").notNullable();
    table.string("user_name").notNullable();
    table.integer("employee_code", 7).notNullable();
    table.string("area").notNullable();
    table.string("residence").notNullable();
    table.string("tmc_e_mail", 100).notNullable();
    table.string("private_e_mail", 100).notNullable();
    table.date("registration_date", 50).notNullable();
    table.text("favorite");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user");
};

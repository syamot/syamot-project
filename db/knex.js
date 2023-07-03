const knex = require("knex");
const knexConfig = require("./knexfile");
const environment = process.env.DATABASE_URL ? "production" : "development";
//renderのNODE_ENVへproductionを設定しておく必要あり

module.exports = knex(knexConfig[environment]);

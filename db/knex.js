const knex = require("knex");
const knexConfig = require("./knexfile");
console.log(knexConfig);
const environment = process.env.DATABASE_URL ? "production" : "development";
//renderのNODE_ENVへproductionを設定しておく必要あり

module.exports = knex(knexConfig[environment]);

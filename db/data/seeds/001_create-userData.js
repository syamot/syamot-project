/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { sha512 } = require("js-sha512");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("user").del();
  await knex("user").insert([
    {
      user_name: "admin",
      password: sha512("admin"),
      employee_code: "1234567",
      area: "第3大林和風寮",
      residence: "愛知県豊田市",
      tmc_e_mail: "admin@mail.toyota.co.jp",
      private_e_mail: "admin@gmail.com",
      registration_date: "2023-06-23",
      favorite: JSON.stringify([]),
    },
    {
      user_name: "admin2",
      password: sha512("admin2"),
      employee_code: "2345678",
      area: "第2大林和風寮",
      residence: "愛知県碧南市",
      tmc_e_mail: "admin2@mail.toyota.co.jp",
      private_e_mail: "admin2@gmail.com",
      registration_date: "2023-06-23",
      favorite: JSON.stringify([]),
    },
    {
      user_name: "admin3",
      password: sha512("admin3"),
      employee_code: "3456789",
      area: "大林和風寮",
      residence: "愛知県岡崎市",
      tmc_e_mail: "admin3@mail.toyota.co.jp",
      private_e_mail: "admin3@gmail.com",
      registration_date: "2023-06-23",
      favorite: JSON.stringify([]),
    },
    {
      user_name: "itakura_kotaro",
      password: sha512("admin"),
      employee_code: "1122345",
      area: "第3大林和風寮",
      residence: "愛知県豊田市",
      tmc_e_mail: "kotaro_itakura@mail.toyota.co.jp",
      private_e_mail: "kotaro_itakura@gmail.com",
      registration_date: "2023-07-11",
      favorite: JSON.stringify([]),
    },
    {
      user_name: "saito_yuzuru",
      password: sha512("admin"),
      employee_code: "1332245",
      area: "第3大林和風寮",
      residence: "愛知県豊田市",
      tmc_e_mail: "yuzuru_saito@mail.toyota.co.jp",
      private_e_mail: "yuzuru_saito@gmail.com",
      registration_date: "2023-07-11",
      favorite: JSON.stringify([]),
    },
    {
      user_name: "itakura_shouho",
      password: sha512("admin"),
      employee_code: "1616857",
      area: "第3大林和風寮",
      residence: "愛知県豊田市",
      tmc_e_mail: "shouho_itakura@mail.toyota.co.jp",
      private_e_mail: "shouho_itakura@gmail.com",
      registration_date: "2023-07-11",
      favorite: JSON.stringify([]),
    },
  ]);
};

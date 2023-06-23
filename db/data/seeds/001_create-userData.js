/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('user').del()
  await knex('user').insert([
    {
      password: 'admin',
      user_name: 'admin',
      employee_code: '1234567',
      area: '第3大林和風寮',
      residence: '愛知県豊田市',
      tmc_e_mail: 'admin@mail.toyota.co.jp',
      private_e_mail: 'admin@gmail.com',
      registration_date: '2023-06-23'
    },
    {
      password: 'admin2',
      user_name: 'admin2',
      employee_code: '2345678',
      area: '第2大林和風寮',
      residence: '愛知県碧南市',
      tmc_e_mail: 'admin2@mail.toyota.co.jp',
      private_e_mail: 'admin2@gmail.com',
      registration_date: '2023-06-23'
    },
    {
      password: 'admin3',
      user_name: 'admin3',
      employee_code: '3456789',
      area: '大林和風寮',
      residence: '愛知県岡崎市',
      tmc_e_mail: 'admin3@mail.toyota.co.jp',
      private_e_mail: 'admin3@gmail.com',
      registration_date: '2023-06-23'
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();
  await knex("items").insert([
    {
      item_name: "冷蔵庫",
      item_category: "家電",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2022-01-01",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1585338667391-5b279a0c5eb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1562919479-b0c98b0d7f8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=706&q=80",
      ]),
      item_seller: 1,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
    {
      item_name: "テレビ",
      item_category: "家電",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2020-05-23",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80",
        "https://images.unsplash.com/photo-1558888401-3cc1de77652d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
        "https://images.unsplash.com/photo-1579353174740-9e4e39428d6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
      ]),
      item_seller: 2,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
    {
      item_name: "タンス",
      item_category: "家具",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2000-10-30",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1558997519-83ea9252edf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
        "https://images.unsplash.com/photo-1453486030486-0a5ffcd82cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=663&q=80",
      ]),
      item_seller: 3,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
    {
      item_name: "電子レンジ",
      item_category: "家電",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2022-01-01",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1626143508000-4b5904e5e84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      ]),
      item_seller: 1,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
    {
      item_name: "ドライバーセット",
      item_category: "工具",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2020-05-23",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1663638964085-13ee056c0a2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80",
      ]),
      item_seller: 2,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
    {
      item_name: "洗濯機",
      item_category: "家電",
      item_explanation:
        "この商品は2022年に当たったもので、使う場面がなかったので一度も使っていません。どなたか必要な方がいましたらお譲りします。",
      item_status: "在庫あり",
      item_num: 1,
      item_deadline: "2000-10-30",
      item_img: JSON.stringify([
        "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      ]),
      item_seller: 3,
      item_approval_flag: false,
      item_transaction_flag: false,
      payment: false,
      pay_id: "",
    },
  ]);
};

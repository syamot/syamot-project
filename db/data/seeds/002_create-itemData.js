/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      item_name: "冷蔵庫",
      item_category: "家電",
      item_status: "新品",
      item_num: 1,
      item_deadline: "2022-01-01",
      item_img: JSON.stringify([
        'https://kadenfan.hitachi.co.jp/rei/assets/img/common/R-WXC74T.png',
        'https://asset.watch.impress.co.jp/img/kdw/docs/1473/520/1_l.jpg',
        'https://www.lg.com/jp/images/refrigerators/GR-Q23FGNGL/gallery/GalleryImages_1100x730_02.jpg'
      ]),
      item_seller: 1
    },
    {
      item_name: "テレビ",
      item_category: "家電",
      item_status: "傷あり",
      item_num: 1,
      item_deadline: "2020-05-23",
      item_img: JSON.stringify([
        'https://static.mercdn.net/item/detail/orig/photos/m36706401804_1.jpg',
        'https://static.mercdn.net/item/detail/orig/photos/m83279631488_1.jpg',
        'https://shop.kodomonokagaku.com/upload/save_image/06301826_62bd6c3e99c71.jpg'
      ]),
      item_seller: 2
    },
    {
      item_name: "タンス",
      item_category: "家具",
      item_status: "かなり傷がある",
      item_num: 1,
      item_deadline: "2000-10-30",
      item_img: JSON.stringify([
        'https://www.cecile.co.jp/cmdty/img/31209/512/31209XG-1431_D1.jpg',
        'https://www.rafuju.jp/upload/save_image/r-049774/IMG_0009.jpg',
        'https://img.dinos.co.jp/kp/defaultMall/images/goods/C11/0232/etc/763419c1.jpg?Mode=main2'
      ]),
      item_seller: 3
    },
  ]);
};

const express = require("express");
const knex = require("./db/knex");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/userAllData", async (req, res) => {
  const allUsers = await knex.select("*").from("user");
  res.send(allUsers);
});

app.get("/itemAllData", async (req, res) => {
  const allItems = await knex.select("*").from("items");
  res.set("content-type", "application/json").status(200).send(allItems);
});

app.get("/test", (req, res) => {
  res.send("接続完了しました。");
});
// 新規ユーザー登録
// 想定req
// {
//   "password": "admin",
//   "user_name":"adminyo"
//   "employee_code": 1111111,
//   "area": "第3大林和風寮",
//   "residence": "岐阜県土岐市",
//   "tmc_e_mail": "admin@mail.toyota.co.jp",
//   "private_e_mail": "admin@gmail.com",
//   "registration_date": "2023-06-23"
// }
app.post("/addUsers", async (req, res) => {
  const {
    password,
    user_name,
    employee_code,
    area,
    residence,
    tmc_e_mail,
    private_e_mail,
    registration_date,
  } = req.body;

  console.log(req.body);
  const addItemObj = {
    password: password,
    user_name: user_name,
    employee_code: employee_code,
    area: area,
    residence: residence,
    tmc_e_mail: tmc_e_mail,
    private_e_mail: private_e_mail,
    registration_date: registration_date,
  };
  await knex("user").insert(addItemObj);
  res.send("ユーザー登録完了");
});
// 新規アイテム登録
// {
//   "item_name": "エアコン",
//   "item_category": "家電",
//   "item_status": "中古",
//   "item_num": 1,
//   "item_deadline": "2010-01-01",
//   "item_img": "['https://kadenfan.hitachi.co.jp/rei/assets/img/common/R-WXC74T.png','https://asset.watch.impress.co.jp/img/kdw/docs/1473/520/1_l.jpg','https://www.lg.com/jp/images/refrigerators/GR-Q23FGNGL/gallery/GalleryImages_1100x730_02.jpg']",
//   "item_seller": 1
// }
app.post("/addItems", async (req, res) => {
  console.log("/addItems", req.body);
  const {
    item_name,
    item_category,
    item_explanation,
    item_status,
    item_num,
    item_weight,
    item_size_vertical,
    item_size_width,
    item_size_height,
    item_deadline,
    item_img,
    item_seller,
  } = req.body;

  const itemInfo = {
    item_name: item_name,
    item_category: item_category,
    item_explanation: item_explanation,
    item_status: item_status,
    item_num: item_num,
    item_weight: item_weight,
    item_size_vertical: item_size_vertical,
    item_size_width: item_size_width,
    item_size_height: item_size_height,
    item_deadline: item_deadline,
    item_img: item_img,
    item_seller: item_seller,
  };
  await knex("items").insert(itemInfo);
  res.status(200).send("アイテム登録完了");
});

// ステータス更新
app.put("/putItemStatus", async (req, res) => {
  console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_status: "売却済",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

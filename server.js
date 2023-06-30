const express = require("express");
const knex = require("./db/knex");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config({
  // path: "./.env",
});
app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//坂本テスト
app.put("/users", async (req, res) => {
  console.log(req.body);
  const obj = req.body;
  try {
    await knex("user").update(obj).where("id", obj.id);
    const result = await knex.select("*").from("user");
    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

app.put("/buyer", async (req, res) => {
  console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        buyer_id: obj.buyer_id,
      })
      .where("id", obj.item_id);
    res.status(200).json();
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
app.put("/favoriteItems", async (req, res) => {
  console.log("sfsdfafewnajkfbwaeijfw", req.body);
  const obj = req.body;
  try {
    await knex("user")
      .update({
        favorite: JSON.stringify(obj.favorite),
      })
      .where("id", obj.id);
    res.status(200).json();
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

//ここまで

app.get("/userAllData", async (req, res) => {
  const allUsers = await knex.select("*").from("user");
  res.send(allUsers);
});
app.get("/user/:name", async (req, res) => {
  const name = req.params.name;
  const allUsers = await knex.select("*").from("user").where("user_name", name);
  res.send(allUsers);
});
app.get("/itemAllData", async (req, res) => {
  const allItems = await knex.select("*").from("items");
  res.set("content-type", "application/json").status(200).send(allItems);
});
app.get("/chatAllData", async (req, res) => {
  const allChat = await knex.select("*").from("chat");
  res.send(allChat);
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
  // console.log("/addItems", req.body);
  const {
    item_name,
    item_category,
    item_explanation,
    item_status,
    item_condition,
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
    item_condition: item_condition,
    item_num: item_num,
    item_weight: item_weight,
    item_size_vertical: item_size_vertical,
    item_size_width: item_size_width,
    item_size_height: item_size_height,
    item_deadline: item_deadline,
    item_img: item_img,
    item_seller: item_seller,
    item_transaction_flag: false,
    item_approval_flag: false,
  };
  await knex("items").insert(itemInfo);
  res.status(200).send("アイテム登録完了");
});

app.post("/addChat", async (req, res) => {
  const { transaction_date, transaction_flag, item_id, user_id, message } =
    req.body;

  // console.log(req.body);
  const addItemObj = {
    transaction_date: transaction_date,
    transaction_flag: transaction_flag,
    item_id: item_id,
    user_id: user_id,
    message: message,
  };
  await knex("chat").insert(addItemObj);
  res.send("チャット送信完了");
});

// ステータス更新
app.put("/putItemStatus", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_status: "取引中",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// ステータスキャンセル更新
app.put("/putItemStatusCancel", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_status: "在庫あり",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 完了ステータス更新
app.put("/putCompleteStatus", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_status: "取引終了",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 承認フラグ更新
app.put("/putApprovalFlag", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_approval_flag: true,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 承認フラグ更新キャンセル
app.put("/putApprovalFlagCancel", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_approval_flag: false,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 取引フラグ更新
app.put("/putTransactionFlag", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_transaction_flag: true,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// S3 を操作するためのインスタンスを生成
const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

// multerの設定;
const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + ".jpg");
    },
    contentType: multerS3.AUTO_CONTENT_TYPE, // ファイルのContent-Typeを自動設定
  }),
});

/**
 * POST /upload
 */
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = req.file.location;
  res.send({ fileUrl });
});

/**
 * GET /download?filename=***
 */
app.get("/download", (req, res) => {
  const { filename } = req.query;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  // ブラウザにダウンロードダイアログを表示させるための
  // レスポンスヘッダーを付与
  res.attachment(filename);

  // S3からダウンロードしたファイルの内容を
  // ストリームオブジェクトに変換し、レスポンスに書き込む
  s3Client
    .getObject(params)
    .createReadStream()
    .on("error", (err) => {
      res.status(500).send({ error: err });
    })
    .pipe(res);
});

/**
 * GET /list
 */
app.get("/list", (req, res) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
  };

  s3Client.listObjects(params, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    const files = data.Contents.map((file) => file.Key);
    res.send({ files });
  });
});

/**
 * GET /display?filename=***
 */
app.get("/display", (req, res) => {
  const { filename } = req.query;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  s3Client.getObject(params, (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }

    res.setHeader("Content-Type", data.ContentType);
    res.send(data.Body);
  });
});

console.log(`バケット：${process.env.AWS_S3_BUCKET}`);
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

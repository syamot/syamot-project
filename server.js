const express = require("express");
require("dotenv").config({
  // path: "./.env",
});

const knex = require("./db/knex");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// paypay=========================================================

const settings = require("./settings");

const paypay = require("./paypay/paypay");
app.use("/paypay", paypay);

app.use(express.Router());
app.use(express.static(__dirname + "/public"));
app.get("/paypay", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "paypay.html"));
});

const PAYPAY = require("@paypayopa/paypayopa-sdk-node");
PAYPAY.Configure({
  clientId: settings.apikey,
  clientSecret: settings.apisecret,
  merchantId: settings.merchantid,
  productionMode: settings.productionMode,
});
app.get("/payInfo/:payId/:itemId", async (req, res) => {
  const response = await PAYPAY.GetCodePaymentDetails([req.params.payId]);
  const body = response.BODY;
  console.log("商品ID", req.params.itemId);
  console.log("pay_id", req.params.payId);
  console.log(body);
  try {
    await knex("items")
      .update({
        pay_id: req.params.payId,
      })
      .where("id", req.params.itemId);
    // console.log(body.resultInfo.code);
    // console.log(body.data.status);
    // res.status(200).json();
    res.json(body.data.status);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
app.put("/putPayment", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        payment: true,
      })
      .where("id", obj.id);
    res.status(200).json();
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
app.put("/putPaymentDel", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        pay_id: "",
      })
      .where("id", obj.id);
    res.status(200).json();
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// ====================================================================
// //日付取得
// const formatToTimeZone = require("date-fns-timezone");
// const FORMAT = "YYYY-MM-DD_HH:mm:ss";
// const TIME_ZONE_TOKYO = "Asia/Tokyo";

//チャット
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const cors = require("cors");
// app.use(cors());
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   },
// });

// //クライアントと通信
// io.on("connection", (socket) => {
//   console.log("接続された");

//   //クライアントから受信
//   socket.on("chatMessage", (data) => {
//     console.log(data);
//     //クライアントへ返信
//     io.emit("received_message", data);
//   });
// });

//User内容編集画面
app.put("/users", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("user").update(obj).where("id", obj.id);
    const result = await knex.select("*").from("user");
    // console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

app.put("/buyer", async (req, res) => {
  // console.log(req.body);
  const obj = req.body;
  try {
    await knex("items")
      .update({
        soldBuyer_id: obj.soldBuyer_id,
      })
      .where("id", obj.item_id);
    res.status(200).json();
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
app.put("/favoriteItems", async (req, res) => {
  // console.log("sfsdfafewnajkfbwaeijfw", req.body);
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
// チャットに対して、userとitemsを結合
app.get("/chatAllData", async (req, res) => {
  const allChat = await knex
    .select("*")
    .from("chat")
    .leftJoin("user", "user.id", "chat.user_id")
    .leftJoin("items", "items.id", "chat.item_id");

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
  const {
    item_name,
    item_category,
    item_explanation,
    item_status,
    // item_condition,
    item_num,
    // item_weight,
    // item_size_vertical,
    // item_size_width,
    // item_size_height,
    item_deadline,
    item_img,
    item_seller,
  } = req.body;

  const itemInfo = {
    item_name: item_name,
    item_category: item_category,
    item_explanation: item_explanation,
    item_status: item_status,
    // item_condition: item_condition,
    item_num: item_num,
    // item_weight: item_weight,
    // item_size_vertical: item_size_vertical,
    // item_size_width: item_size_width,
    // item_size_height: item_size_height,
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
  const {
    item_id,
    user_id,
    message,
    seller_id,
    buyer_id,
    send_date,
    seller_read_flag,
    buyer_read_flag,
  } = req.body;
  const addItemObj = {
    // 日本時刻は格納できない
    send_date: send_date,
    buyer_id: buyer_id,
    seller_id: seller_id,
    item_id: item_id,
    user_id: user_id,
    message: message,
    seller_read_flag: seller_read_flag,
    buyer_read_flag: buyer_read_flag,
  };
  await knex("chat").insert(addItemObj);
  res.send("チャット送信完了");
});

// ステータス更新
app.put("/putItemStatus", async (req, res) => {
  const obj = req.body;
  console.log("ステータス更新");
  console.log(obj);
  console.log(obj.id);

  try {
    await knex("items")
      .update({
        item_status: "取引中",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

// 既読ステータス更新########################
app.put("/putChatStatus", async (req, res) => {
  // console.log("read_arr");
  const { read_arr, flagText } = req.body;
  // console.log(read_arr);
  try {
    await knex("chat")
      .update({
        [flagText]: true,
      })
      .whereIn("chat_id", read_arr); //[1, 11, 15]
    const result = await knex.select("*").from("chat");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});

// item編集時の更新
app.put("/editItems", async (req, res) => {
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_name: obj.item_name,
        item_category: obj.item_category,
        item_explanation: obj.item_explanation,
        item_status: obj.item_status,
        item_num: obj.item_num,
        item_deadline: obj.item_deadline,
        item_img: JSON.stringify(obj.item_img),
        item_seller: obj.item_seller,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// ステータスキャンセル更新
app.put("/putItemStatusCancel", async (req, res) => {
  const obj = req.body;

  console.log("ステータスキャンセル更新");
  console.log(obj);
  console.log(obj.id);
  try {
    await knex("items")
      .update({
        item_status: "在庫あり",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 完了ステータス更新
app.put("/putCompleteStatus", async (req, res) => {
  const obj = req.body;
  // console.log("🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶🥶");
  // console.log(obj.id);
  try {
    await knex("items")
      .update({
        item_status: "取引終了",
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 承認フラグ更新
app.put("/putApprovalFlag", async (req, res) => {
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_approval_flag: true,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 承認フラグ更新キャンセル
app.put("/putApprovalFlagCancel", async (req, res) => {
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_approval_flag: false,
      })
      .where("id", obj.id);
    const result = await knex.select("*").from("items");
    res.status(200).json(result);
  } catch (e) {
    console.error("Error", e);
    res.status(500);
  }
});
// 取引フラグ更新
app.put("/putTransactionFlag", async (req, res) => {
  const obj = req.body;
  try {
    await knex("items")
      .update({
        item_transaction_flag: true,
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
  // console.log("Amazon-path=====", req.file.location);
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

// DELETE /items/:id
app.delete("/items/:id", async (req, res) => {
  const itemId = req.params.id;
  try {
    // deleteItem関数
    await knex("items").where("id", itemId).del();
    // const data = await knex.select("*").from("items")
    res.status(200).send("delete完了"); // 成功のステータスコード
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // 内部サーバーエラーのステータスコード
  }
});

// console.log(`バケット：${process.env.AWS_S3_BUCKET}`);
// server.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

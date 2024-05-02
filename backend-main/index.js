// index.js

import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import db from "./utils/db.js";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import index from "./routes.js";
import bodyParser from "body-parser";
import sellerRouter from "./routes/sellerRouter.js";
import productsRouter from "./routes/productsRouter.js";
import authRouter from "./routes/authRouter.js";
import orderRouter from "./routes/orderRouter.js"
 import productPageRouter from "./routes/productPageRouter.js"
import shopRouter from "./routes/shop-products.js";
import marketRouter from "./routes/market.js";
import marketMapRouter from "./routes/market-map.js";
import signUpRouter from "./routes/sign-up.js";
import indexInfoRouter from "./routes/indexinfo.js";
import QRrouter from "./routes/qrcode.js"
import orderDataRouter from "./routes/orderData.js"
import commentRouter from './routes/comment.js'
import adRouter from "./routes/adRouter.js"
import categoriesRouter from './routes/categoriesRouter.js'
import cartRouter from './routes/cartRouter.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, "public/images"); // tung - 用於前端渲染圖片

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(
  cors({
    origin: "http://localhost:3000", // 允许的前端源
    methods: ["GET", "POST", "PUT", "DELETE"], // 允许的HTTP方法
    credentials: true, // 允许跨域带认证信息（cookies）
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==== 如

// 自訂的頂層middleware
app.use((req, res, next) => {
  // res.locals.title = "NightMarket Hunter"; //設定網站名稱

  // 處理 JWT token
  const auth = req.get("Authorization");
  if (auth && auth.indexOf("Bearer ") === 0) {
    const token = auth.slice(7); // 去掉 "Bearer "
    try {
      // res.locals.my_jwt(放在此比較安全但現在res.req不同)
      //要確認my_jwt沒用過,像req.body已經被使用了
      req.my_jwt = jwt.verify(token, process.env.JWT_SECRET);
    } catch (ex) {}
  }

  next(); //呼叫他才能往下 不然網頁會一直停留在讀取旋轉
});

// Google會員登入
app.post("/google-login", async (req, res) => {
  // console.log(req.body);
  //   res.json({ data: {} });
  // });

  // 檢查從react來的資料
  if (!req.body.providerId || !req.body.uid) {
    return res.json({ status: 'error', message: '缺少google登入資料' })
  }

  const { displayName, email, uid, photoURL } = req.body || {};
  const google_uid = uid;

   // 以下流程:
  // 1. 先查詢資料庫是否有同google_uid的資料
  // 2-1. 有存在 -> 執行登入工作
  // 2-2. 不存在 -> 建立一個新會員資料(無帳號與密碼)，只有google來的資料 -> 執行登入工作

  const output = {
    success: false,
    error: "",
    code: 0,
    //當success變為true要的資料
    data: {
      custom_id: 0,
      account: "",
      google_uid: "",
      token: "",
    },
  };

  const sql = "SELECT * FROM custom WHERE google_uid=?";
  const [rows] = await db.query(sql, [google_uid]);
  const row = rows[0];
  if (rows.length) {
  // 如果有搜尋到資料 = 進行登入

  output.success = true;
    // 打包  JWT
    const token = jwt.sign(
      {
        custom_id: row.custom_id,
        account: row.custom_account,
        google_uid: row.google_uid,
      },
      // process.env.JWT_SECRET >> 去看 dev.env 檔
      process.env.JWT_SECRET
    );
    output.data = {
      custom_id: row.custom_id,
      account: row.custom_account,
      google_uid: row.google_uid,
      token,
    };
  } else {
    // 如果沒有搜尋到資料=進行註冊
    let result = {};
    const sql =
      "INSERT INTO custom (custom_name, custom_account, google_uid, photo_url) VALUES (?, ?, ?, ?)";
    try {
      [result] = await db.query(sql, [
        displayName,
        email,
        google_uid,
        photoURL,
      ]);
      if (result && result.insertId) {
        const custom_id = result.insertId;
      output.success = !!result.affectedRows;
      // 打包  JWT
      const token = jwt.sign(
        {
          custom_id: custom_id,
          account: email,
          google_uid: google_uid,
        },
        // process.env.JWT_SECRET >> 去看 dev.env 檔
        process.env.JWT_SECRET
      );
      output.data = {
        custom_id: custom_id,
        account: email,
        google_uid: google_uid,
        token,
      };
    }else {
      output.error = "註冊失敗";
    }
  } catch (ex) {
  }
  }
  res.json(output);
});


// 一般會員登入
app.post("/login-jwt", async (req, res) => {
  let { account, password } = req.body || {};
  const output = {
    success: false,
    error: "",
    code: 0,
    //當success變為true要的資料
    data: {
      custom_id: 0,
      account: "",
      google_uid: "",
      token: "",
    },
  };
  if (!account || !password) {
    output.error = "欄位資料不足";
    output.code = 400;
    return res.json(output);
  }
  account = account.trim();
  password = password.trim();
  const sql = "SELECT * FROM custom WHERE custom_account=?";
  const [rows] = await db.query(sql, [account]);
  if (!rows.length) {
    // 帳號是錯的
    output.error = "帳號或密碼錯誤";
    output.code = 420;
    return res.json(output);
  }
  const row = rows[0];
  const result = await bcrypt.compare(password, row.custom_password);
  if (result) {
    // 帳號是對的, 密碼也是對的
    output.success = true;
    // 打包  JWT
    const token = jwt.sign(
      {
        custom_id: row.custom_id,
        account: row.custom_account,
        google_uid: row.google_uid,
      },
      // process.env.JWT_SECRET >> 去看 dev.env 檔
      process.env.JWT_SECRET
    );
    output.data = {
      custom_id: row.custom_id,
      account: row.custom_account,
      nickname: row.custom_nickname,
      token,
    };
  } else {
    // 密碼是錯的
    output.error = "帳號或密碼錯誤";
    output.code = 450;
  }
  res.json(output);
});

app.get("/jwt-data", async (req, res) => {
  res.json(req.my_jwt);
});

app.use("/sign-up", signUpRouter);
app.use("/index-info", indexInfoRouter);

// ====恆
app.use("/orderRouter",orderRouter); 
// app.use("/product2Router",productPageRouter); 
app.use("/productPage",productPageRouter)




// ==== 弘
// 賣家登入驗證帳戶
app.use("/auth", authRouter);

//產品
productsRouter.use((req, res, next) => {
  req.body = Object.keys(req.body).reduce((newBody, key) => {
    newBody[key.trim()] = req.body[key]; // 刪除鍵名稱中的尾隨空格
    return newBody;
  }, {});
  next();
});
app.use("/products", productsRouter);

// 產品種類 
app.use('/api/categories', categoriesRouter);


// 賣家資料
sellerRouter.use((req, res, next) => {
  // 清理键名的尾随空格
  req.body = Object.keys(req.body).reduce((newBody, key) => {
    const trimmedKey = key.trim(); // 去除键名的空格
    const value = req.body[key];
    newBody[trimmedKey] = typeof value === 'string' ? value.trim() : value; // 去除字符串值的空格，非字符串保持原樣
    return newBody;
  }, {});

  // multer
  if (req.files) {
    req.files = Object.keys(req.files).reduce((newFiles, key) => {
      const trimmedKey = key.trim(); // 去除空格
      newFiles[trimmedKey] = req.files[key];
      return newFiles;
    }, {});
  }

  next(); // 下一步
});

app.use("/sellers", sellerRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

//QRcode 資輛查詢與變更
app.use("/QRcode", QRrouter);

// order路由
app.use("/order", orderDataRouter);

//賣家評論路由
app.use("/comment", commentRouter);

//賣家廣告路由
app.use("/ad", adRouter);

// 購物車結帳路由
app.use('/cartItem', cartRouter);  


// ==== 咚
// 店家產品路由
app.use("/shop-products", shopRouter);

// 夜市路由
app.use("/market", marketRouter);

// 夜市地圖路由
app.use("/market-map", marketMapRouter);

// ==== 蓁
// 會員路由
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/backRoute", index);

/*---其他路由放在這之前---*/

//處理路由
app.use((req, res) => {
  res.status(404).send(`<h2>404 走錯路了</h2>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`伺服器啟動 使用通訊埠${PORT}`);
});
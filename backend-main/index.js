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
import shopRouter from "./routes/shop-products.js";
import marketRouter from "./routes/market.js";
import signUpRouter from "./routes/sign-up.js";
import indexInfoRouter from "./routes/indexinfo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(cors());
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
      nickname: "",
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
        custom_id: row.custom_id ,
        account: row.custom_account ,
      },
      // process.env.JWT_SECRET >> 去看 dev.env 檔
      process.env.JWT_SECRET
    );
    output.data = {
      custom_id: row.custom_id ,
      account: row.custom_account ,
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


// ==== 弘
// 賣家登入驗證帳戶
app.use("/auth", authRouter);

//產品
app.use("/products", productsRouter);

// 賣家資料
app.use("/sellers", sellerRouter);
app.use("/public", express.static(path.join(__dirname, "public")));


// ==== 咚
//店家地圖路由
app.get("/market-data", async (req, res) => {
  const sql = "SELECT * FROM market_data";
  const [rows] = await db.query(sql);

  res.json(rows);
});

// 店家產品路由
app.use("/shop-products", shopRouter);

// 夜市路由
app.use("/market", marketRouter);


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

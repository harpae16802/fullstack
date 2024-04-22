// index.js

import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import db from "./utils/db.js";

import index from "./routes.js";
import bodyParser from "body-parser";
import sellerRouter from "./routes/sellerRouter.js";
import productsRouter from "./routes/productsRouter.js";
import authRouter from "./routes/authRouter.js";
import shopRouter from "./routes/shop-products.js";
import marketRouter from "./routes/market.js";
import marketMapRouter from "./routes/market-map.js";
import customAuthRouter from "./routes/customAuthRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, "public/images"); // tung - 用於前端渲染圖片

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==== 如

// 自訂的頂層middleware
app.use((req, res, next) => {
  res.locals.title = "NightMarket Hunter"; //設定網站名稱

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
app.use("/custom-auth", customAuthRouter);

// ==== 弘
// 賣家登入驗證帳戶
app.use("/auth", authRouter);

//產品
app.use("/products", productsRouter);

// 賣家資料
app.use("/sellers", sellerRouter);
app.use("/public", express.static(path.join(__dirname, "public")));

// ==== 咚
// 店家產品路由
app.use("/shop-products", shopRouter);

// 夜市路由
app.use("/market", marketRouter);

// 夜市地圖路由
app.use("/market-map", marketMapRouter);

// 用於前端渲染圖片
app.get("/images/:imageName", (req, res) => {
  const { imageName } = req.params;
  const imagePath = path.join(IMAGES_DIR, imageName);
  res.sendFile(imagePath);
});

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

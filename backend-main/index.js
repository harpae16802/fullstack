// index.js

import express from 'express';
import bodyParser from 'body-parser';
import sellerRouter from './routes/sellerRouter.js';
import productsRouter from './routes/productsRouter.js';
import authRouter from './routes/authRouter.js';
import shopRouter from "./routes/shop-products.js";
import path from 'path';
import cors from 'cors';
import db from "./utils/db.js"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 賣家登入驗證帳戶
app.use('/auth', authRouter);

//產品
app.use('/products', productsRouter);

// 賣家資料
app.use('/sellers', sellerRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));

//店家地圖路由
app.get("/market-data", async (req, res) => {
  const sql = "SELECT * FROM market_data";
  const [rows] = await db.query(sql);

  res.json(rows);
});

//店家商品路由
app.get("/seller-data", async (req, res) => {
  const sql = "SELECT * FROM seller";
  const [rows] = await db.query(sql);

  res.json(rows);
});

//店家產品路由
app.use("/shop-products", shopRouter);


//處理路由
app.use((req, res) => {
  res.status(404).send(`<h2>404 走錯路了</h2>`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`伺服器啟動 使用通訊埠${PORT}`);
});

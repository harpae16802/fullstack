import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// search
router.get("/search/:market_name", async (req, res) => {
  try {
    const market_name = req.params.market_name;
    const sql = "SELECT * FROM market_data WHERE market_name LIKE ?";
    const [row] = await db.query(sql, [`%${market_name}%`]);
    if (row.length > 0) {
      // 如果找到相應的夜市，則返回數據
      res.json(row[0]);
    } else {
      // 如果沒有找到，返回空結果
      console.log(`沒有找到夜市資料`);
    }
  } catch (error) {
    console.log(`後端 /search/:market_name 錯誤 : ${error}`);
  }
});

router.get("/seller/:market_id", async (req, res) => {
  try {
    const market_id = req.params.market_id;
    const sql = `SELECT * FROM seller WHERE market_id = ?`;
    const [row] = await db.query(sql, [market_id]);
    res.json(row);
  } catch (error) {
    console.log(`後端 /seller/:market_id 錯誤 : ${error}`);
  }
});

router.get("/:market_id", async (req, res) => {
  try {
    const market_id = req.params.market_id;
    const sql = `SELECT * FROM market_data WHERE market_id = ?`;
    const [row] = await db.query(sql, [market_id]);
    res.json(row);
  } catch (error) {
    console.log(`獲取夜市資料錯誤: ${error}`);
  }
});

// 分類搜尋
router.get("/category", async (req, res) => {
  try {
    const categoryId = req.query.category;
    const sql = `
    SELECT DISTINCT seller.* FROM products
    JOIN seller ON products.seller_id = seller.seller_id
    WHERE category_id = ?
  `;
    const [row] = await db.query(sql, [categoryId]);
    res.json(row);
  } catch (error) {
    console.log(`分類搜尋 錯誤 : ${error}`);
  }
});

export default router;

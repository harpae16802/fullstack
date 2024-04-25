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

// 找出對應夜市的店家
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

// 找出對應夜市的資訊
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
router.get("/category/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const sql = `
      SELECT DISTINCT s.* FROM seller AS s
      JOIN products AS p ON s.seller_id = p.seller_id
      WHERE p.category_id = ?
    `;
    const [row] = await db.query(sql, [category_id]);
    if (row.length > 0) {
      res.json(row);
    } else {
      // 如果沒有找到相應的店家，返回空結果
      res.status(404).json({ message: "沒有找到相應的店家資料" });
    }
  } catch (error) {
    console.error(`後端 /category/:category_id 錯誤: ${error}`);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 獲取每個商店的平均評分和評論總數
router.get("/store-ratings/:market_id", async (req, res) => {
  try {
    const market_id = req.params.market_id;
    const sql = `
      SELECT s.seller_id, s.store_name, 
             AVG(c.night_rating) AS average_night_rating, 
             COUNT(c.comment) AS total_comments
      FROM seller s
      LEFT JOIN comment c ON s.seller_id = c.seller_id
      WHERE s.market_id = ?
      GROUP BY s.seller_id;
    `;
    const [row] = await db.query(sql, [market_id]);
    res.json(row);
  } catch (error) {
    console.error(`後端 /store-ratings/:market_id 錯誤: ${error}`);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

export default router;

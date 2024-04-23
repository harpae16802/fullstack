import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// 取得夜市資料
router.get("/market-data", async (req, res) => {
  const sql = "SELECT * FROM market_data";
  const [rows] = await db.query(sql);

  res.json(rows);
});

// 地圖搜尋
router.get("/search", async (req, res) => {
  try {
    // 从请求中获取搜索词
    const searchTerm = req.query.term;

    // 准备SQL查询，用于根据搜索词查找位置
    const sql =
      "SELECT latitude_and_longitude, market_name, market_img FROM market_data WHERE market_name LIKE ? LIMIT 1";
    const [row] = await db.query(sql, [`%${searchTerm}%`]);

    // 检查是否有结果
    if (row.length > 0) {
      // 分割字符串获取纬度和经度
      const [latitude, longitude] = row[0].latitude_and_longitude
        .split(",")
        .map(Number);
      res.json({
        lat: latitude,
        lng: longitude,
        market_name: row[0].market_name,
        market_img: row[0].market_img,
      });
    } else {
      console.log({ message: "Location not found" });
    }
  } catch (error) {
    console.log({ message: "Map Location error" });
  }
});

export default router;

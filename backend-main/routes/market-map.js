import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// 获取夜市资料及其夜市评分平均值
router.get("/market-data", async (req, res) => {
  try {
    // 查询市场数据
    const sqlMarket = "SELECT * FROM market_data";
    const [marketRows] = await db.query(sqlMarket);

    // 查询夜市评分平均值
    const sqlRating = `
          SELECT market_id, AVG(night_rating) as average_night_rating
          FROM comment
          WHERE night_rating IS NOT NULL
          GROUP BY market_id;
      `;
    const [ratingRows] = await db.query(sqlRating);

    // 将评分平均值合并到市场数据中
    const enrichedData = marketRows.map((market) => {
      const rating = ratingRows.find((r) => r.market_id === market.market_id);
      return {
        ...market,
        average_night_rating: rating ? rating.average_night_rating : null, // 如果没有评分则返回null
      };
    });

    // 返回合并后的数据
    res.json(enrichedData);
  } catch (error) {
    console.error("查询失败:", error);
    res.status(500).json({ error: "服务器内部错误" });
  }
});

// 地圖搜尋
router.get("/search", async (req, res) => {
  try {
    // 从请求中获取搜索词
    const searchTerm = req.query.term;

    // 准备SQL查询，用于根据搜索词查找位置
    const sql = `
    SELECT 
      m.latitude_and_longitude, 
      m.market_name, 
      m.market_img, 
      m.market_id, 
      AVG(c.night_rating) AS average_night_rating
    FROM market_data m
    LEFT JOIN comment c ON m.market_id = c.market_id
    WHERE m.market_name LIKE ?
    GROUP BY m.market_id
    LIMIT 1;
  `;
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
        market_id: row[0].market_id,
        average_night_rating: row[0].average_night_rating,
      });
    } else {
      console.log({ message: "Location not found" });
    }
  } catch (error) {
    console.log({ message: "Map Location error" });
  }
});

export default router;

import express from "express";
import db from "../utils/db.js";

const router = express.Router();

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

export default router;

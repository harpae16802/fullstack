import express from "express";
import db from "../utils/db.js";

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.get("/toggle-like/:seller_id", async (req, res) => {
  const custom_id = 1; // 模擬用戶ID

  const output = {
    success: false,
    action: "", // add, remove
    error: "",
  };

  try {
    const sql =
      "SELECT * FROM favorite_store WHERE `seller_id`=? AND `custom_id`=?";
    const [rows] = await db.query(sql, [req.params.seller_id, custom_id]);

    if (rows.length) {
      // 如果已經有, 就移除
      const sql2 = "DELETE FROM favorite_store WHERE favorite_id = ?";
      const [result] = await db.query(sql2, [rows[0].favorite_id]);
      if (result.affectedRows) {
        output.success = true;
        output.action = "remove";
      } else {
        output.error = "無法移除";
      }
    } else {
      // 如果沒有, 就加入
      const sql3 =
        "INSERT INTO favorite_store (`seller_id`, `custom_id`) VALUES (?, ?)";
      const [result] = await db.query(sql3, [req.params.seller_id, custom_id]);
      if (result.affectedRows) {
        output.success = true;
        output.action = "add";
      } else {
        output.error = "無法加入";
      }
    }
  } catch (error) {
    console.error(error);
    output.error = "資料庫操作出錯";
  }

  res.json(output);
});

export default router;

// routes/qrcode.js
import express from "express";
import db from "../utils/db.js";

const QRrouter = express.Router();

// 获取订单详细信息的路由
QRrouter.get("/details/:order_id", async (req, res) => {
  const { order_id } = req.params;
  try {
    const sql = `
            SELECT
                custom_account,
                product_name,
                purchase_quantity,
                total_sum,
                status
            FROM
                qrcodeview
            WHERE
                order_id = ?
        `;
    const [rows] = await db.query(sql, [order_id]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "No details found for this order ID." });
    }
  } catch (error) {
    console.error("Failed to retrieve order details:", error);
    res
      .status(500)
      .json({
        message: "Server error while retrieving order details.",
        error: error.message,
      });
  }
})

// 更新訂單狀態的路由
.put("/update-status/:order_id", async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body; // 從請求體中獲取新的狀態

  try {
    const sql = `
            UPDATE qrcode_detail_record
            SET status = ?
            WHERE order_id = ?
        `;
    const [result] = await db.query(sql, [status, order_id]);

    if (result.affectedRows > 0) {
      res.json({ message: "訂單狀態更新成功" });
    } else {
      res.status(404).json({ message: "未找到對應訂單，更新失敗" });
    }
  } catch (error) {
    console.error("更新訂單狀態失敗:", error);
    res
      .status(500)
      .json({ message: "伺服器錯誤，更新失敗", error: error.message });
  }
});
export default QRrouter;

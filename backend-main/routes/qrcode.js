import express from "express";
import db from "../utils/db.js";

const QRrouter = express.Router();

// 获取qrcode详情
QRrouter.get("/details/:qrcode_id", async (req, res) => {
  const { qrcode_id } = req.params;
  try {
    const sql = `
            SELECT
                custom_account,
                product_name,
                purchase_quantity,
                total_sum,
                status,
                seller_id
            FROM
                qrcodeview
            WHERE
                qrcode_id = ?
        `;
    const [rows] = await db.query(sql, [qrcode_id]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: "No details found for this qrcode ID." });
    }
  } catch (error) {
    console.error("Failed to retrieve order details:", error);
    res.status(500).json({
        message: "Server error while retrieving order details.",
        error: error.message,
      });
  }
});

// 更新订单状态
QRrouter.put("/update-status/:qrcode_id", async (req, res) => {
  const { qrcode_id } = req.params;
  const { status } = req.body; // 从请求体中获取新的状态

  try {
    const sql = `
            UPDATE qrcode_detail_record
            SET status = ?
            WHERE qrcode_id = ?
        `;
    const [result] = await db.query(sql, [status, qrcode_id]);

    if (result.affectedRows > 0) {
      res.json({ message: "订单状态更新成功" });
    } else {
      res.status(404).json({ message: "未找到对应订单，更新失败" });
    }
  } catch (error) {
    console.error("更新订单状态失败:", error);
    res.status(500).json({ message: "服务器错误，更新失败", error: error.message });
  }
});

export default QRrouter;

import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// 獲取店家資料
router.get("/seller/:seller_id", async (req, res) => {
  try {
    const sql = "SELECT * FROM seller WHERE seller_id = ?";
    const [row] = await db.query(sql, [req.params.seller_id]);
    res.json(row);
  } catch (error) {
    console.error("資料庫查詢店家出錯:", error);
  }
});

// 獲取店家商品資料
router.get("/products/:seller_id", async (req, res) => {
  try {
    const sql = "SELECT * FROM products WHERE seller_id = ?";
    const [row] = await db.query(sql, [req.params.seller_id]);
    res.json(row);
  } catch (error) {
    console.error("資料庫查詢產品出錯:", error);
  }
});

// 加入移除收藏 - 店家
router.get("/toggle-like-shop/:seller_id", async (req, res) => {
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
    output.error = "店家加入收藏錯誤";
  }

  res.json(output);
});
// 检查收藏状态
router.get("/check-like-shop/:seller_id", async (req, res) => {
  const custom_id = 1;

  try {
    const sql =
      "SELECT * FROM favorite_store WHERE `seller_id`=? AND `custom_id`=?";
    const [rows] = await db.query(sql, [req.params.seller_id, custom_id]);

    if (rows.length) {
      // 如果找到记录，说明已收藏
      res.json({ isFavorite: true });
    } else {
      // 没有记录，说明未收藏
      res.json({ isFavorite: false });
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
});

// 加入移除收藏 - 商品
router.get("/toggle-like-products/:product_id", async (req, res) => {
  const custom_id = 1; // 模擬用戶ID

  const output = {
    success: false,
    action: "", // add, remove
    error: "",
  };

  try {
    const sql =
      "SELECT * FROM favorite_product WHERE `product_id`=? AND `custom_id`=?";
    const [rows] = await db.query(sql, [req.params.product_id, custom_id]);

    if (rows.length) {
      // 如果已經有, 就移除
      const sql2 = "DELETE FROM favorite_product WHERE favorite_id = ?";
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
        "INSERT INTO favorite_product (`product_id`, `custom_id`) VALUES (?, ?)";
      const [result] = await db.query(sql3, [req.params.product_id, custom_id]);
      if (result.affectedRows) {
        output.success = true;
        output.action = "add";
      } else {
        output.error = "無法加入";
      }
    }
  } catch (error) {
    console.error(error);
    output.error = "商品加入收藏錯誤";
  }

  res.json(output);
});
// 检查收藏状态
router.get("/check-like-products/:product_id", async (req, res) => {
  const custom_id = 1;

  try {
    const sql =
      "SELECT * FROM favorite_product WHERE `product_id`=? AND `custom_id`=?";
    const [rows] = await db.query(sql, [req.params.product_id, custom_id]);

    if (rows.length) {
      // 如果找到记录，说明已收藏
      res.json({ isFavorite: true });
    } else {
      // 没有记录，说明未收藏
      res.json({ isFavorite: false });
    }
  } catch (error) {
    console.error("Error checking favorite status:", error);
  }
});

// 檢視評論
router.get("/comment/:seller_id", async (req, res) => {
  const seller_id = req.params.seller_id;
  const order_id = seller_id === "4" ? 1 : 2;

  try {
    const sql = `SELECT * FROM comment WHERE order_id = ?`;
    const [row] = await db.query(sql, [order_id]);
    res.json(row);
  } catch (error) {
    console.error("評論查詢產品出錯:", error);
  }
});

export default router;

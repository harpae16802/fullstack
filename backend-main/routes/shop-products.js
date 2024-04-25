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

// 加入購物車
router.post("/cart-add", async (req, res) => {
  const { product_id, quantity } = req.body;
  const custom_id = 1; // 假设用户ID

  try {
    // 检查购物车中是否已存在该商品
    const existsSql = `
      SELECT * FROM cart WHERE custom_id = ? AND product_id = ?
    `;
    const [existing] = await db.query(existsSql, [custom_id, product_id]);

    if (existing.length > 0) {
      // 如果已存在，更新数量和总价
      const updateSql = `
        UPDATE cart SET quantity = quantity + ?, total_price = total_price + ? * (SELECT price FROM products WHERE product_id = ?)
        WHERE custom_id = ? AND product_id = ?
      `;
      const [updateResult] = await db.query(updateSql, [
        quantity,
        quantity,
        product_id,
        custom_id,
        product_id,
      ]);
    } else {
      // 如果不存在，插入新记录
      const productSql = "SELECT price FROM products WHERE product_id = ?";
      const [product] = await db.query(productSql, [product_id]);
      const productPrice = product[0].price;

      const insertSql = `
        INSERT INTO cart (custom_id, product_id, quantity, total_price) 
        VALUES (?, ?, ?, ?)
      `;
      const [insertResult] = await db.query(insertSql, [
        custom_id,
        product_id,
        quantity,
        productPrice * quantity,
      ]);
    }

    // 获取更新后的购物车信息
    const cartInfoSql = `
      SELECT p.product_name, c.quantity, c.total_price 
      FROM cart c 
      JOIN products p ON c.product_id = p.product_id 
      WHERE c.custom_id = ?
    `;
    const [cartInfo] = await db.query(cartInfoSql, [custom_id]);

    // 计算总金额
    const totalAmount = cartInfo.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    // 返回成功响应
    res.json({
      success: true,
      cartInfo,
      totalAmount,
    });
  } catch (error) {
    console.error("处理购物车时发生错误:", error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

// 改數量或刪除
router.post("/cart-edit", async (req, res) => {
  const { product_id, quantity } = req.body; // 这里的quantity表示要减少的数量
  const custom_id = 1; // 假设用户ID

  try {
    // 查询当前商品在购物车中的数量
    const getQuantitySql = `
      SELECT quantity FROM cart WHERE custom_id = ? AND product_id = ?
    `;
    const [current] = await db.query(getQuantitySql, [custom_id, product_id]);

    if (current.length === 0) {
      return res.status(404).json({ error: "购物车中无此商品" });
    }

    const currentQuantity = current[0].quantity;
    if (currentQuantity < quantity) {
      return res
        .status(400)
        .json({ error: "减少的数量大于购物车中的商品数量" });
    }

    if (currentQuantity === quantity) {
      // 如果减少后数量为0，则删除该条目
      const deleteSql = `
        DELETE FROM cart WHERE custom_id = ? AND product_id = ?
      `;
      await db.query(deleteSql, [custom_id, product_id]);
    } else {
      // 否则，减少购物车中的商品数量
      const reduceSql = `
        UPDATE cart SET 
        quantity = quantity - ?, 
        total_price = total_price - (? * (SELECT price FROM products WHERE product_id = ?))
        WHERE custom_id = ? AND product_id = ?
      `;
      await db.query(reduceSql, [
        quantity,
        quantity,
        product_id,
        custom_id,
        product_id,
      ]);
    }

    // 获取更新后的购物车信息
    const cartInfoSql = `
      SELECT p.product_name, c.quantity, c.total_price 
      FROM cart c 
      JOIN products p ON c.product_id = p.product_id 
      WHERE c.custom_id = ?
    `;
    const [cartInfo] = await db.query(cartInfoSql, [custom_id]);

    // 计算总金额
    const totalAmount = cartInfo.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    // 返回成功响应
    res.json({
      success: true,
      cartInfo,
      totalAmount,
    });
  } catch (error) {
    console.error("处理减少购物车商品数量时发生错误:", error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

// 獲取購物車數據
router.get("/cart", async (req, res) => {
  const custom_id = 1; // 假定一個固定的用戶ID
  try {
    const cartSql = `
      SELECT p.product_name, p.product_id, c.quantity, c.total_price 
      FROM cart c
      JOIN products p ON c.product_id = p.product_id 
      WHERE c.custom_id = ?
    `;
    const [cartItems] = await db.query(cartSql, [custom_id]);

    // 計算總金額
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.total_price,
      0
    );

    // 返回購物車項目和總金額
    res.json({
      success: true,
      items: cartItems,
      totalAmount,
    });
  } catch (error) {
    console.error("獲取購物車數據錯誤: ", error);
    res.status(500).json({ error: "內部服務器錯誤" });
  }
});

export default router;

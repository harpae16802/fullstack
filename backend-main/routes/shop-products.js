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
router.get("/theProduct/:product_id", async (req, res) => {
  try {
    const sql = `
    SELECT p.*, s.store_name
    FROM products p
    JOIN seller s ON p.seller_id = s.seller_id
    WHERE p.product_id = ?
  `;
    const [row] = await db.query(sql, [req.params.product_id]);
    res.json(row);
  } catch (error) {
    console.error("資料庫查詢產品出錯:", error);
  }
});

// 加入移除收藏 - 店家
router.get("/toggle-like-shop/:seller_id", async (req, res) => {
  const output = {
    success: false,
    action: "", // add, remove
    error: "",
  };
  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }
  const custom_id = req.my_jwt.custom_id;

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
  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }
  const custom_id = req.my_jwt.custom_id;
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
  const output = {
    success: false,
    action: "", // add, remove
    error: "",
  };
  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }
  const custom_id = req.my_jwt.custom_id;

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
  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }
  const custom_id = req.my_jwt.custom_id;

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

// 加入移除收藏 - 評論
router.get("/toggle-like-comment/:comment_id", async (req, res) => {
  const output = {
    success: false,
    action: "", // 'add' or 'remove'
    error: "",
  };

  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }

  const custom_id = req.my_jwt.custom_id;
  const comment_id = req.params.comment_id;

  try {
    const selectSql =
      "SELECT * FROM favorite_comment WHERE `comment_id` = ? AND `custom_id` = ?";
    const [favoriteRows] = await db.query(selectSql, [comment_id, custom_id]);

    if (favoriteRows.length) {
      // 如果已經有, 就移除
      const deleteSql =
        "DELETE FROM favorite_comment WHERE `comment_id` = ? AND `custom_id` = ?";
      const [deleteResult] = await db.query(deleteSql, [comment_id, custom_id]);

      if (deleteResult.affectedRows) {
        const updateSql = "UPDATE comment SET likes = likes - 1 WHERE id = ?";
        await db.query(updateSql, [comment_id]);
        output.success = true;
        output.action = "remove";
      } else {
        output.error = "無法移除";
      }
    } else {
      // 如果沒有, 就加入
      const insertSql =
        "INSERT INTO favorite_comment (`comment_id`, `custom_id`) VALUES (?, ?)";
      const [insertResult] = await db.query(insertSql, [comment_id, custom_id]);

      if (insertResult.affectedRows) {
        const updateSql = "UPDATE comment SET likes = likes + 1 WHERE id = ?";
        await db.query(updateSql, [comment_id]);
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
router.get("/check-like-comment/:comment_id", async (req, res) => {
  const output = {
    success: false,
    action: "", // 'add' or 'remove'
    error: "",
  };
  if (!req.my_jwt?.custom_id) {
    output.error = "沒有授權";
    return res.json(output);
  }
  const custom_id = req.my_jwt.custom_id;

  try {
    const sql =
      "SELECT * FROM favorite_comment WHERE `comment_id`=? AND `custom_id`=?";
    const [rows] = await db.query(sql, [req.params.comment_id, custom_id]);

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

  try {
    const sql = `
    SELECT c.*, cu.custom_name
    FROM comment c
    INNER JOIN custom cu ON c.custom_id = cu.custom_id
    WHERE c.seller_id = ?
  `;
    const [row] = await db.query(sql, [seller_id]);
    res.json(row);
  } catch (error) {
    console.error("評論查詢產品出錯:", error);
  }
});

// 增加商品數量
router.post("/cart-increase", async (req, res) => {
  const { product_id, quantity = 1 } = req.body; // 接收前端传过来的 quantity
  const custom_id = req.my_jwt.custom_id;

  if (!custom_id) {
    return res.status(401).json({ error: "未授权的访问" });
  }

  try {
    // 检查商品是否在购物车中
    const getQuantitySql = `
      SELECT quantity FROM cart WHERE custom_id = ? AND product_id = ?
    `;
    const [current] = await db.query(getQuantitySql, [custom_id, product_id]);

    if (current.length === 0) {
      // 如果商品不在购物车中，则添加进去
      const getPriceSql = `
        SELECT price FROM products WHERE product_id = ?
      `;
      const [product] = await db.query(getPriceSql, [product_id]);

      if (product.length === 0) {
        return res.status(404).json({ error: "无此商品" });
      }

      const productPrice = product[0].price;
      const insertSql = `
        INSERT INTO cart (custom_id, product_id, quantity, total_price)
        VALUES (?, ?, ?, ?)
      `;
      await db.query(insertSql, [
        custom_id,
        product_id,
        quantity,
        quantity * productPrice,
      ]);
    } else {
      // 如果商品已在购物车中，则增加其数量
      const currentQuantity = current[0].quantity;
      const newQuantity = currentQuantity + quantity; // 增加传入的数量

      const getPriceSql = `
        SELECT price FROM products WHERE product_id = ?
      `;
      const [product] = await db.query(getPriceSql, [product_id]);

      if (product.length === 0) {
        return res.status(404).json({ error: "无此商品" });
      }

      const productPrice = product[0].price;
      const newTotalPrice = newQuantity * productPrice; // 计算新的总价

      const updateSql = `
        UPDATE cart
        SET quantity = ?, total_price = ?
        WHERE custom_id = ? AND product_id = ?
      `;
      await db.query(updateSql, [
        newQuantity,
        newTotalPrice,
        custom_id,
        product_id,
      ]);
    }

    // 更新购物车总金额和详情
    const totalAmountSql = `
      SELECT SUM(total_price) AS totalAmount FROM cart WHERE custom_id = ?
    `;
    const [totalResult] = await db.query(totalAmountSql, [custom_id]);
    const totalAmount = totalResult[0].totalAmount || 0;

    const cartInfoSql = `
      SELECT 
        p.product_id AS product_id, 
        p.product_name AS product_name, 
        c.quantity, 
        c.total_price,
        p.image_url
      FROM 
        cart c
      JOIN 
        products p ON c.product_id = p.product_id
      WHERE 
        c.custom_id = ?
    `;
    const cartInfo = await db.query(cartInfoSql, [custom_id]);

    res.json({
      success: true,
      cartInfo: cartInfo,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("处理购物车商品数量增加时发生错误:", error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

// 減少商品數量
router.post("/cart-decrease", async (req, res) => {
  const { product_id } = req.body;
  const custom_id = req.my_jwt.custom_id;

  try {
    if (!custom_id) {
      return res.status(401).json({ error: "未授权的访问" });
    }

    // 检查商品是否在购物车中
    const getQuantitySql = `
      SELECT quantity FROM cart WHERE custom_id = ? AND product_id = ?
    `;
    const [current] = await db.query(getQuantitySql, [custom_id, product_id]);

    if (current.length === 0) {
      // 购物车中没有该商品
      return res.status(404).json({ error: "购物车中无此商品" });
    }

    const currentQuantity = current[0].quantity;
    if (currentQuantity <= 1) {
      // 如果商品数量小于等于1，删除该商品
      const deleteSql = `
        DELETE FROM cart WHERE custom_id = ? AND product_id = ?
      `;
      await db.query(deleteSql, [custom_id, product_id]);
    } else {
      // 减少商品数量
      const newQuantity = currentQuantity - 1;

      // 获取商品当前价格
      const getPriceSql = `
        SELECT price FROM products WHERE product_id = ?
      `;
      const [product] = await db.query(getPriceSql, [product_id]);
      const productPrice = product[0].price;

      // 计算新的总价
      const newTotalPrice = newQuantity * productPrice;

      const updateSql = `
        UPDATE cart
        SET quantity = ?, total_price = ?
        WHERE custom_id = ? AND product_id = ?
      `;
      await db.query(updateSql, [
        newQuantity,
        newTotalPrice,
        custom_id,
        product_id,
      ]);
    }

    // 重新计算购物车总金额
    const totalAmountSql = `
      SELECT SUM(total_price) AS totalAmount FROM cart WHERE custom_id = ?
    `;
    const [totalResult] = await db.query(totalAmountSql, [custom_id]);
    const totalAmount = totalResult[0].totalAmount || 0;

    // 获取更新后的购物车信息
    const cartInfoSql = `
    SELECT 
      p.product_id AS product_id, 
      p.product_name AS product_name, 
      c.quantity, 
      c.total_price,
      p.image_url
    FROM 
      cart c
    JOIN 
      products p ON c.product_id = p.product_id
    WHERE 
      c.custom_id = ?
  `;
    const cartInfo = await db.query(cartInfoSql, [custom_id]);

    // 返回成功响应
    res.json({
      success: true,
      cartInfo,
      totalAmount,
    });
  } catch (error) {
    console.error("处理购物车商品数量减少时发生错误:", error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

// 删除商品
router.post("/cart-remove", async (req, res) => {
  const { product_id } = req.body;
  const custom_id = req.my_jwt.custom_id;

  try {
    if (!custom_id) {
      return res.status(401).json({ error: "未授权的访问" });
    }

    // 删除商品的SQL命令
    const deleteSql = `
      DELETE FROM cart WHERE custom_id = ? AND product_id = ?
    `;
    await db.query(deleteSql, [custom_id, product_id]);

    // 重新计算总金额
    const totalAmountSql = `
      SELECT SUM(total_price) AS totalAmount FROM cart WHERE custom_id = ?
    `;
    const [totalResult] = await db.query(totalAmountSql, [custom_id]);
    const totalAmount = totalResult[0].totalAmount || 0; // 如果没有商品，则总金额为0

    const cartInfoSql = `
    SELECT 
      p.product_id AS product_id, 
      p.product_name AS product_name, 
      c.quantity, 
      c.total_price,
      p.image_url
    FROM 
      cart c
    JOIN 
      products p ON c.product_id = p.product_id
    WHERE 
      c.custom_id = ?
  `;
    const cartInfo = await db.query(cartInfoSql, [custom_id]);

    res.json({
      success: true,
      cartInfo: cartInfo,
      totalAmount: totalAmount,
    });
  } catch (error) {
    console.error("删除购物车商品时发生错误:", error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

// 獲取購物車數據
router.get("/cart", async (req, res) => {
  const custom_id = req.my_jwt.custom_id;

  try {
    if (!custom_id) {
      return res.status(401).json({ error: "未授权的访问" });
    }

    const cartSql = `
  SELECT 
    p.product_name, 
    p.product_id, 
    c.quantity, 
    c.total_price,
    p.image_url
  FROM 
    cart c
  JOIN 
    products p ON c.product_id = p.product_id 
  WHERE 
    c.custom_id = ?
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

// 獲取商店的平均評分和評論總數
router.get("/store-ratings/:seller_id", async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const sql = `
      SELECT s.seller_id, s.store_name, 
             AVG(c.night_rating) AS average_night_rating, 
             COUNT(c.comment) AS total_comments
      FROM seller s
      LEFT JOIN comment c ON s.seller_id = c.seller_id
      WHERE s.seller_id = ?
      GROUP BY s.seller_id;
    `;
    const [row] = await db.query(sql, [seller_id]);
    res.json(row);
  } catch (error) {
    console.error(`後端 /store-ratings/:seller_id 錯誤: ${error}`);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});

// 獲取特定賣家的商品的平均評分和評論總數
router.get("/product-ratings/:seller_id", async (req, res) => {
  try {
    const seller_id = req.params.seller_id;
    const sql = `
    SELECT p.product_id, p.product_name, 
      AVG(c.night_rating) AS average_night_rating, 
      COUNT(c.comment) AS total_comments
    FROM products p
    JOIN comment c ON p.product_id = c.product_id
    WHERE p.seller_id = ?
    GROUP BY p.product_id, p.product_name;
    `;
    const [rows] = await db.query(sql, [seller_id]);
    res.json(rows);
  } catch (error) {
    console.error(`後端 /seller-ratings/:seller_id 錯誤: ${error}`);
    res.status(500).json({ message: "伺服器錯誤", error: error.message });
  }
});

export default router;

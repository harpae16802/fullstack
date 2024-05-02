import express from "express";
import db from "../utils/db.js";

const cartRouter = express.Router();

// 前端將發送custom_id來查詢 目前購物車中的所有需要的資訊
cartRouter.get("/:custom_id", async (req, res) => {
  const customId = req.params.custom_id;
  const query = `
    SELECT 
      c.quantity, 
      c.total_price, 
      p.product_name, 
      p.product_id,
      p.price,
      p.image_url,
      s.store_name,
      s.seller_id,
      cu.custom_account
    FROM cart c
    JOIN products p ON c.product_id = p.product_id
    JOIN custom cu ON c.custom_id = cu.custom_id
    JOIN seller s ON p.seller_id = s.seller_id
    WHERE c.custom_id = ?
  `;

  try {
    const [results] = await db.query(query, [customId]);
    res.send({ cartItems: results });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Database error occurred." });
  }
});


// 更新商品總價
cartRouter.put("/:custom_id", async (req, res) => {
  const customId = req.params.custom_id;
  const { product_id, quantity } = req.body;

  if (!product_id || quantity === undefined) {
    return res
      .status(400)
      .send({ error: "Product ID and quantity are required." });
  }

  try {
    // 獲取當前價格
    const productQuery = "SELECT price FROM products WHERE product_id = ?";
    const [products] = await db.query(productQuery, [product_id]);
    if (products.length === 0) {
      return res.status(404).send({ error: "Product not found." });
    }
    const unitPrice = products[0].price;
    const totalPrice = unitPrice * quantity;

    // 更新購物車
    const updateQuery = `
        UPDATE cart
        SET quantity = ?, total_price = ?
        WHERE custom_id = ? AND product_id = ?
      `;
    const [updateResult] = await db.execute(updateQuery, [
      quantity,
      totalPrice,
      customId,
      product_id,
    ]);

    if (updateResult.affectedRows > 0) {
      res.send({ message: "Cart updated successfully." });
    } else {
      res
        .status(404)
        .send({ error: "Cart item not found or no change in quantity." });
    }
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .send({ error: "Database error occurred while updating cart." });
  }
});


// 刪除商品
cartRouter.delete('/:custom_id/:product_id', async (req, res) => {
    const customId = req.params.custom_id;
    const productId = req.params.product_id;
    const deleteQuery = `
      DELETE FROM cart
      WHERE custom_id = ? AND product_id = ?
    `;
  
    try {
      const [result] = await db.execute(deleteQuery, [customId, productId]);
      if (result.affectedRows > 0) {
        res.send({ message: 'Product removed successfully from cart.' });
      } else {
        res.status(404).send({ error: 'Product not found in cart.' });
      }
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).send({ error: 'Database error occurred while removing product.' });
    }
  });

  //優惠資訊
  cartRouter.get("/discounts/:seller_id", async (req, res) => {
    const sellerId = req.params.seller_id;
    const query = `
      SELECT sd.seller_id, dc.name, dc.min_amount, dc.discount
      FROM seller_discounts sd 
      JOIN discount_category dc ON sd.discount_category_id = dc.id 
      WHERE sd.seller_id = ?
    `;
  
    try {
      const [results] = await db.query(query, [sellerId]);
      if (results.length > 0) {
        res.send({ discounts: results });
      } else {
        res.status(404).send({ error: "No discounts found for this seller." });
      }
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).send({ error: "Database error occurred while fetching discounts." });
    }
  });

  // 使用用者點數
  cartRouter.get('/points/:customId', async (req, res) => {
    const customId = parseInt(req.params.customId, 10);
    try {
        const [results] = await db.execute(`
            SELECT SUM(ac.get_point) AS total_points
            FROM clear_data cd
            JOIN achievement_category ac ON cd.level_id = ac.level_id
            WHERE cd.user_id = ?
        `, [customId]);

        if (results.length > 0) {
            res.json({ points: results[0].total_points || 0 });
        } else {
            res.json({ points: 0 });
        }
    } catch (error) {
        console.error('Error fetching points:', error);
        res.status(500).send('Server error');
    }
});

  
// 成立訂單
cartRouter.post('/create', async (req, res) => {
  const { seller_id, custom_id, discounts, items, usePoints, customPoints, totalAmount } = req.body;

  try {
    const order_number = randomUUID(); // 生成隨機訂單編號
    const consume_gamepoint = usePoints ? customPoints : 0;
    const discount_category_id = discounts.length > 0 ? discounts[0].id : null;

    // 插入 order_data 表
    const [order] = await db.execute(`
      INSERT INTO order_data (seller_id, custom_id, order_number, discount_category_id, consume_gamepoint, total_sum)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [seller_id, custom_id, order_number, discount_category_id, consume_gamepoint, totalAmount]);

    const order_id = order.insertId;

    // 插入 order_detail 表
    items.forEach(async (item) => {
      await db.execute(`
        INSERT INTO order_detail (order_id, product_id, purchase_quantity)
        VALUES (?, ?, ?)
      `, [order_id, item.product_id, item.quantity]);
    });

    res.status(201).send({ success: true, message: 'Order created successfully', order_id });
  } catch (error) {
    console.error('Create order failed:', error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


// 從購物車中刪除已經購買的商品
cartRouter.put('/remove-purchased', async (req, res) => {
  const { custom_id, items } = req.body;

  try {
    items.forEach(async (item) => {
      await db.execute(`
        DELETE FROM cart
        WHERE custom_id = ? AND product_id = ? AND total_price = ?
      `, [custom_id, item.product_id, item.total_price]);
    });

    res.send({ success: true, message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Failed to update cart:', error);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});


export default cartRouter;

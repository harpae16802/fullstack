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


// 更新购物车中的商品数量和总价格
cartRouter.put("/:custom_id", async (req, res) => {
  const customId = req.params.custom_id;
  const { product_id, quantity } = req.body;

  if (!product_id || quantity === undefined) {
    return res
      .status(400)
      .send({ error: "Product ID and quantity are required." });
  }

  try {
    // 获取产品的当前价格
    const productQuery = "SELECT price FROM products WHERE product_id = ?";
    const [products] = await db.query(productQuery, [product_id]);
    if (products.length === 0) {
      return res.status(404).send({ error: "Product not found." });
    }
    const unitPrice = products[0].price;
    const totalPrice = unitPrice * quantity;

    // 更新购物车表
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


// 删除购物车中的一个商品
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

export default cartRouter;

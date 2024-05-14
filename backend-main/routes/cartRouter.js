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
cartRouter.delete("/:custom_id/:product_id", async (req, res) => {
  const customId = req.params.custom_id;
  const productId = req.params.product_id;
  const deleteQuery = `
      DELETE FROM cart
      WHERE custom_id = ? AND product_id = ?
    `;

  try {
    const [result] = await db.execute(deleteQuery, [customId, productId]);
    if (result.affectedRows > 0) {
      res.send({ message: "Product removed successfully from cart." });
    } else {
      res.status(404).send({ error: "Product not found in cart." });
    }
  } catch (error) {
    console.error("Database error:", error);
    res
      .status(500)
      .send({ error: "Database error occurred while removing product." });
  }
});

// 優惠資訊路由
cartRouter.get("/discounts/:seller_id", async (req, res) => {
  const sellerId = req.params.seller_id;
  const query = `
    SELECT 
      sd.seller_id, 
      dc.name, 
      dc.min_amount, 
      dc.discount, 
      dc.id as discount_category_id  
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
    res
      .status(500)
      .send({ error: "Database error occurred while fetching discounts." });
  }
});

// 使用用者點數
cartRouter.get("/points/:customId", async (req, res) => {
  const customId = parseInt(req.params.customId, 10);
  try {
    const [results] = await db.execute(
      `
            SELECT SUM(ac.get_point) AS total_points
            FROM clear_data cd
            JOIN achievement_category ac ON cd.level_id = ac.level_id
            WHERE cd.user_id = ?
        `,
      [customId]
    );

    if (results.length > 0) {
      res.json({ points: results[0].total_points || 0 });
    } else {
      res.json({ points: 0 });
    }
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).send("Server error");
  }
});

// 建立訂單
cartRouter.post("/order_data", async (req, res) => {
  // 解構
  const {
    custom_id,
    seller_id,
    order_number,
    discount_category_id,
    consume_gamepoint,
    total_sum,
    items,
  } = req.body;

  try {
    //把前端的資料 注入order_data
    const [orderResult] = await db.query(
      `INSERT INTO order_data (custom_id, seller_id, order_number, discount_category_id, consume_gamepoint, total_sum)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        custom_id,
        seller_id,
        order_number,
        discount_category_id,
        consume_gamepoint,
        total_sum,
      ]
    );

    const orderId = orderResult.insertId;

    // 生成order_id
    if (!orderId) {
      throw new Error("Failed to create order.");
    }

    // 注入order_data之中的 order_id到 order_detail 之中的 order_id
    const orderDetailsPromises = items.map((item) => {
      return db.query(
        `
          INSERT INTO order_detail (order_id, product_id, purchase_quantity ,remain_count)
          VALUES (?, ?, ?, ?)
      `,
        [orderId, item.product_id, item.purchase_quantity, item.remain_count] 
      );
    });

    await Promise.all(orderDetailsPromises);

    res.status(201).send({ message: "訂單建立成功", order_id: orderId });
  } catch (error) {
    console.error("建立訂單失敗", error);
    res
      .status(500)
      .send({ error: "建立訂單錯誤" });
  }
});


// 清空購物車
cartRouter.put("/cart/clear", async (req, res) => {
  const { custom_id, product_ids } = req.body;

  try {
    const placeholders = product_ids.map(() => "?").join(",");
    await db.query(
      `
          DELETE FROM cart
          WHERE custom_id = ? AND product_id IN (${placeholders})
      `,
      [custom_id, ...product_ids]
    );

    res.send({ message: "購物車已清空" });
  } catch (error) {
    console.error("清空購物車錯誤：", error);
    res
      .status(500)
      .send({ error: "Database error occurred while clearing cart." });
  }
}); 
 
  cartRouter.get("/cart/:id", async (req, res) => {
  const customId = req.params.id;  
  let sum=0;
  const sql = `SELECT a.*, (
      SELECT b.play_date
      FROM clear_data b
      WHERE b.user_id = ${customId} AND a.level_id = b.level_id
      LIMIT 1
  ) AS play_date
  FROM achievement_category a 

  WHERE a.clear_times <= (
      SELECT COUNT(b.user_id)
      FROM clear_data b
      WHERE b.user_id = ${customId} AND a.level_id = b.level_id
  )    order by  play_date
  ;`;

  await db.query(sql)
      .then(async(res2) => {
          if (!res2) {
              return res.json({ success: false, error: "Error in signup query" });
          } else { 
          console.log(res2)
 
          res2[0].map((v,i)=>{
            sum+=(+v.get_point);
            console.log(v.get_point)
          })
          // 扣掉點數
          const sql2 = `SELECT * FROM order_data a JOIN custom b ON a.custom_id=b.custom_Id and b.custom_Id=?   order by  payment_date`;
          await db.query(sql2,customId)
              .then((res2) => {
                  if (!res2) {
                      return res.json({ success: false, error: "Error in signup query" });
                  } else {
                    let sum2=0;
                    res2[0].map((v,i)=>{
                      sum2+=v.consume_gamepoint;
                    }) 
                    return res.send({ success: true, sum:sum-sum2});
                  }

                })
          }
      })
      .catch((err) => {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: "An error occurred while processing the request" });
      });
})
 
export default cartRouter;
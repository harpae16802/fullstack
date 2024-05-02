import express from "express";
import db from "../utils/db.js";

const router = express.Router();

//熱銷產品
router.get("/product", async (req, res) => {
  const sql = 
    "SELECT p.product_name, p.image_url, p.price, p.product_description, p.product_ingredient, p.product_nutrition, s.store_name, m.market_name FROM products p JOIN seller s ON p.seller_id = s.seller_id JOIN market_data m ON s.market_id = m.market_id JOIN order_detail od ON p.product_id = od.product_id  ORDER BY purchase_quantity DESC LIMIT 4";
  // console.log('eddie',req.params);

  try {
    const [results] = await db.query(sql, [req.params.product_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});

//隨機推薦商品
router.get("/recommendProduct", async (req, res) => {
    const sql =
      "SELECT product_name, image_url from products p  ORDER BY RAND() LIMIT 9";
    // console.log('eddie',req.params);
  
    try {
      const [results] = await db.query(sql, [req.params.product_id]);
      return res.send({ success: true, data: results });
    } catch (err) {
      console.error("Error executing SQL query:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  });

  

// 篩選產品
// router.put('/getorderId', async (req, res) => {
//   try {
//     const { seller_id } = req.params;
//     const sql = `
//       SELECT
//         c.store_rating,
//         c.photo,
//         c.comment,
//         c.datetime,
//         cu.custom_account
//       FROM
//         comment c
//       JOIN
//         order_data od ON c.order_id = od.order_id
//       JOIN
//         custom cu ON od.custom_id = cu.custom_id
//       WHERE
//         c.seller_id = ?;
//     `;
//     const [rows] = await db.query(sql, [seller_id]);
//    return res.json(rows);

//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     res.status(500).json({ error: "Error fetching comments" });
//   }
// })

//產品詳細
// router.get("/productDetail", async (req, res) => {
//   const sql =
//     "SELECT product_name,product_description,image_url,product_ingredient,product_nutrition,store_name FROM products p JOIN seller s ON p.seller_id = s.seller_id WHERE product_id=?";
//   // console.log('eddie',req.params);

//   try {
//     const [results] = await db.query(sql, [req.params.product_id]);
//     return res.send({ success: true, data: results });
//   } catch (err) {
//     console.error("Error executing SQL query:", err);
//     return res
//       .status(500)
//       .json({ error: "An error occurred while processing the request" });
//   }
// });

export default router;

import express from "express";
import db from "../utils/db.js";

const router = express.Router();

//產品分類:點心
router.get("/productCategory1", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 1"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
//產品分類:飲料
router.get("/productCategory2", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 2"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
//產品分類:甜品
router.get("/productCategory3", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 3"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
//產品分類:湯品
router.get("/productCategory4", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 4"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
//產品分類:小吃
router.get("/productCategory5", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 5"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});
//產品分類:主食
router.get("/productCategory6", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 6"

  try {
    const [results] = await db.query(sql, [req.params.category_id]);
    return res.send({ success: true, data: results });
  } catch (err) {
    console.error("Error executing SQL query:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
});


//熱銷產品
router.get("/product", async (req, res) => {
  const sql = 
    "SELECT p.product_id, p.product_name, p.image_url, p.price, p.product_description, p.product_ingredient, p.product_nutrition, s.store_name, m.market_name FROM products p JOIN seller s ON p.seller_id = s.seller_id JOIN market_data m ON s.market_id = m.market_id JOIN order_detail od ON p.product_id = od.product_id GROUP BY product_id ORDER BY purchase_quantity DESC LIMIT 4";
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
      "SELECT p.product_id, p.product_name, p.image_url from products p  ORDER BY RAND() LIMIT 9";
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

  //產品評分
  router.get("/productScore", async (req, res) => {
    const sql =
      "SELECT p.product_id, COALESCE(ROUND(AVG(c.product_rating), 1), 4.3) AS avg FROM products p LEFT JOIN comment c ON p.product_id = c.product_id GROUP BY p.product_id  HAVING COUNT(c.product_id) <= (SELECT COUNT(*) FROM products) ORDER BY p.product_id ASC";
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
//小於50
router.get("/filterProductLessThan50", async (req, res) => {
  const sql =
    "SELECT product_id, product_name, price FROM products WHERE price <= 50";
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




export default router;

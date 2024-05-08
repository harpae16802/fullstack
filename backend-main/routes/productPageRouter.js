import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// 新增商品
router.post("/favoriteAddProduct",async(req, res) =>{
  const product_id = req.body.product_id;
  const custom_id=req.body.custom_id;
  // const sql = `SELECT * FROM favorite_product WHERE favorite_id=?`;
  const sql=`INSERT INTO favorite_product (product_id, custom_id)
  VALUES (?, ?)`;
  
  try {
      const [results] = await db.query(sql, [product_id,custom_id]);
  if(results){

    return res.send({ status: "Success" });
  }
  } catch (err) {
      console.error("Error executing SQL query:", err);
      return res.status(500).json({ error: "An error occurred while processing the request" });
  }
})
//產品分類:點心
router.get("/productCategory1", async (req, res) => {
  const sql = 
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 1 LIMIT 9"

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
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 2 LIMIT 9"

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
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 3 LIMIT 9"

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
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 4 LIMIT 9"

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
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 5 LIMIT 9"

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
    "SELECT * FROM products p JOIN product_categories c ON p.category_id = c.category_id WHERE p.category_id = 6 LIMIT 9"

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
      "SELECT p.product_id, p.product_name, p.image_url, COALESCE(ROUND(AVG(c.product_rating), 1), 4.3) AS avg FROM products p LEFT JOIN comment c ON p.product_id = c.product_id GROUP BY p.product_id HAVING COUNT(c.product_id) <= (SELECT COUNT(*) FROM products) ORDER BY RAND() LIMIT 9";
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

  //產品
 

  

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

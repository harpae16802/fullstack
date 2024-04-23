// // orderData.js
// import express from "express";
// import db from "../utils/db.js"; // 引入数据库连接池

// const router = express.Router();

// router
//   .get("/", async (req, res) => {
//     const {
//       seller_id,
//       start_date,
//       end_date,
//       category_id,
//       product_name,
//       page = 1,
//       limit = 10,
//     } = req.query;

//     let query = `
//   SELECT o.*, p.product_name, p.category_id, c.category_name, od.purchase_quantity
//   FROM order_data o
//   JOIN order_detail od ON o.order_id = od.order_id
//   JOIN products p ON od.product_id = p.product_id
//   JOIN product_categories c ON p.category_id = c.category_id
//   WHERE o.seller_id = ?
//   `;
//     const params = [seller_id];

//     if (start_date && end_date) {
//       query += " AND o.payment_date BETWEEN ? AND ?";
//       params.push(start_date, end_date);
//     }

//     if (category_id) {
//       query += " AND p.category_id = ?";
//       params.push(category_id);
//     }

//     if (product_name) {
//       query += " AND p.product_name LIKE ?";
//       params.push(`%${product_name}%`);
//     }

//     // 分页处理
//     const offset = (page - 1) * limit;
//     query += " LIMIT ? OFFSET ?";
//     params.push(parseInt(limit), offset);

//     try {
//       const [results] = await db.query(query, params);
//       res.json(results);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   })
//   .get("/categories", async (req, res) => {
//     try {
//       // 查询数据库获取产品种类信息
//       const query = "SELECT * FROM product_categories";
//       const [results] = await db.query(query);
//       res.json(results);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// export default router;
import express from "express";
import db from "../utils/db.js"; // 引入数据库连接池

const router = express.Router();

router
  .get("/", async (req, res) => {
    const {
      seller_id,
      start_date,
      end_date,
      category_id,
      product_name,
      page = 1,
      limit = 10,
    } = req.query;

    // 用于数据总数计数的查询，现在包含所有可能的筛选条件
    let countQuery = `
      SELECT COUNT(*) as total
      FROM order_data o
      JOIN order_detail od ON o.order_id = od.order_id
      JOIN products p ON od.product_id = p.product_id
      WHERE o.seller_id = ?
    `;
    let countParams = [seller_id]; // 参数数组

    // 添加筛选条件
    if (start_date && end_date) {
      countQuery += " AND o.payment_date BETWEEN ? AND ?";
      countParams.push(start_date, end_date);
    }

    if (category_id) {
      countQuery += " AND p.category_id = ?";
      countParams.push(category_id);
    }

    if (product_name) {
      countQuery += " AND p.product_name LIKE ?";
      countParams.push(`%${product_name}%`);
    }

    // 执行总数查询
    const [totalResults] = await db.query(countQuery, countParams);
    const totalPages = Math.ceil(totalResults[0].total / limit);

    // 数据查询
    let query = `
      SELECT o.*, p.product_name, p.category_id, c.category_name, od.purchase_quantity
      FROM order_data o
      JOIN order_detail od ON o.order_id = od.order_id
      JOIN products p ON od.product_id = p.product_id
      JOIN product_categories c ON p.category_id = c.category_id
      WHERE o.seller_id = ?
    `;
    let params = [seller_id]; // 参数数组

    if (start_date && end_date) {
      query += " AND o.payment_date BETWEEN ? AND ?";
      params.push(start_date, end_date);
    }

    if (category_id) {
      query += " AND p.category_id = ?";
      params.push(category_id);
    }

    if (product_name) {
      query += " AND p.product_name LIKE ?";
      params.push(`%${product_name}%`);
    }

    // 分页处理
    const offset = (page - 1) * limit;
    query += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), offset);

    try {
      const [results] = await db.query(query, params);
      res.json({
        data: results,
        totalPages: totalPages
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .get("/categories", async (req, res) => {
    try {
      const query = "SELECT * FROM product_categories";
      const [results] = await db.query(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;

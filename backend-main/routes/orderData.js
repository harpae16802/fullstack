import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

// 獲取所有訂單
router.get('/sales-total', async (req, res) => {
    const { startDate, endDate } = req.query;
    const sql = `
        SELECT SUM(od.purchase_quantity * p.price) AS total_revenue
        FROM order_detail od
        JOIN order_data o ON od.order_id = o.order_id
        JOIN products p ON od.product_id = p.product_id
        WHERE o.payment_day BETWEEN ? AND ?
    `;
    try {
        const [result] = await db.query(sql, [startDate, endDate]);
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/sales-by-category', async (req, res) => {
    const { startDate, endDate } = req.query;
    const sql = `
        SELECT p.category, SUM(od.purchase_quantity) AS quantity_sold, SUM(od.purchase_quantity * p.price) AS revenue
        FROM products p
        JOIN order_detail od ON p.product_id = od.product_id
        JOIN order_data o ON od.order_id = o.order_id
        WHERE o.payment_day BETWEEN ? AND ?
        GROUP BY p.category
    `;
    try {
        const results = await db.query(sql, [startDate, endDate]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/sales-by-product', async (req, res) => {
    const { productName, startDate, endDate } = req.query;
    const sql = `
        SELECT p.product_name, p.category, SUM(od.purchase_quantity) AS quantity_sold, SUM(od.purchase_quantity * p.price) AS revenue
        FROM products p
        JOIN order_detail od ON p.product_id = od.product_id
        JOIN order_data o ON od.order_id = o.order_id
        WHERE p.product_name LIKE ? AND o.payment_day BETWEEN ? AND ?
        GROUP BY p.product_id
    `;
    try {
        const results = await db.query(sql, [`%${productName}%`, startDate, endDate]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;

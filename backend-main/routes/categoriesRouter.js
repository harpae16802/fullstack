
// routes/categoriesRouter.js
import express from 'express';
import db from '../utils/db.js'; // 确保这里的路径正确

const categoriesRouter = express.Router();

// 获取所有产品种类的API
categoriesRouter.get('/', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT category_id, category_name FROM product_categories ORDER BY category_name');
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve categories', error: error.message });
  }
});

export default categoriesRouter;

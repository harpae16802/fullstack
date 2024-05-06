
// routes/categoriesRouter.js
import express from 'express';
import db from '../utils/db.js'; 

const categoriesRouter = express.Router();

//產品總類
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

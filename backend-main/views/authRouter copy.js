// authRoutes.js

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../utils/db.js';
import  jwtSecret  from '../utils/jwt.js';

const router = express.Router();

// Seller registration route
router.post('/register', async (req, res) => {
  try {
    const { account, password } = req.body;

    // Check if account already exists
    const existingSeller = await db.query('SELECT * FROM account WHERE account = ?', [account]);

    if (existingSeller.length > 0) {
      return res.status(400).json({ error: 'Account already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new seller into database
    const result = await db.query('INSERT INTO account (account, password) VALUES (?, ?)', [account, hashedPassword]);
    const newSellerId = result.insertId;

    // Generate JWT token
    const token = jwt.sign({ id: newSellerId }, jwtSecret);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

.post('/login', async (req, res) => {
  try {
    const { account, password } = req.body;

    // Check if account exists
    const seller = await db.query('SELECT * FROM account WHERE account = ?', [account]);

    if (seller.length === 0) {
      return res.status(401).json({ error: 'Invalid account or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, seller[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid account or password' });
    }

    // Generate JWT token with seller_id included
    const token = jwt.sign({ seller_id: seller[0].id }, jwtSecret);

    res.status(200).json({ token, seller_id: seller[0].id }); // Return seller_id along with the token
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


export default router;

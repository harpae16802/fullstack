// authRouter.js
import express from "express";
import db from "../utils/db.js";
import multer from "multer";

const authRouter = express.Router();
const upload = multer();

// 使用 multer().none() 表示不处理文件上传
authRouter.post("/login", upload.none(), async (req, res) => {
  const { account, password } = req.body;
  try {
    const query = "SELECT * FROM account WHERE account = ? AND password = ?";
    const [rows] = await db.query(query, [account, password]);
    if (rows.length > 0) {
      const sellerId = rows[0].seller_id;
      res.status(200).json({ success: true, message: "登入成功", sellerId });
    } else {
      res.status(401).json({ success: false, message: "帳號或密碼錯誤" });
    }
  } catch (error) {
    console.error("登入失敗", error);
    res.status(500).json({ success: false, message: "登入失敗" });
  }
});

// 賣家註冊
authRouter.post("/register", upload.none(), async (req, res) => {
  const { account, password } = req.body;
  try {
    const query = "INSERT INTO account (account, password) VALUES (?, ?)";
    const result = await db.query(query, [account, password]);
    res.status(200).json({ success: true, message: "註冊成功" });
  } catch (error) {
    console.error("註冊失敗", error);
    res.status(500).json({ success: false, message: "註冊失敗" });
  }
});

export default authRouter;

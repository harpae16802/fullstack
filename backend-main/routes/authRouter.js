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
    // 1. 檢查帳號是否存在
    const checkAccountQuery = "SELECT * FROM account WHERE account = ?";
    const [existingAccounts, fields] = await db.query(checkAccountQuery, [account]);
    console.log(existingAccounts); // 一定要查看返回的結構

    if (existingAccounts.length > 0) {
      return res.status(400).json({ success: false, message: "帳號已存在" });
    }

    // 2. 在seller表中建立新用戶
    const sellerQuery = "INSERT INTO seller (store_name) VALUES ('新店铺')";
    const sellerResult = await db.query(sellerQuery);

    // 3. 拿取seller_id
    const sellerId = sellerResult.insertId;

    // 4. 在account表中建立seller_id
    const accountQuery = "INSERT INTO account (seller_id, account, password) VALUES (?, ?, ?)";
    const accountResult = await db.query(accountQuery, [sellerId, account, password]);

    // 5. 返回成功的資訊
    res.status(200).json({ success: true, message: "註冊成功", sellerId: sellerId });
  } catch (error) {
    console.error("註冊成功", error);
    res.status(500).json({ success: false, message: "註冊失敗" });
  }
});


export default authRouter;


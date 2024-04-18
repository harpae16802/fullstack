// authRouter.js
import express from "express";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import db from "../utils/db.js";
import multer from "multer";

// postman 測試路由 : http://localhost:3002/custom-auth/login-jwt
const customAuthRouter = express.Router();
const upload = multer();

customAuthRouter.post("/login-jwt", async (req, res) => {
  let { account, password } = req.body || {};
  const output = {
    success: false,
    error: "",
    code: 0,
    // postData: req.body,
    //當success變為true要的資料
    data: {
      id: 0,
      account: "",
      nickname: "",
      token: "",
    },
  };
  if (!account || !password) {
    output.error = "欄位資料不足";
    output.code = 400;
    return res.json(output);
  }
  account = account.trim();
  password = password.trim();
  const sql = "SELECT * FROM custom WHERE custom_account=?";
  const [rows] = await db.query(sql, [account]);
  if (!rows.length) {
    // 帳號是錯的
    output.error = "帳號或密碼錯誤";
    output.code = 420;
    return res.json(output);
  }
  const row = rows[0];
  const result = await bcrypt.compare(password, row.custom_password);
  if (result) {
    // 帳號是對的, 密碼也是對的
    output.success = true;
    // 打包  JWT
    const token = jwt.sign(
      {
        id: row.custom_id ,
        account: row.custom_account ,
      },
      // process.env.JWT_SECRET >> 去看 dev.env 檔
      process.env.JWT_SECRET
    );
    output.data = {
      id: row.custom_id ,
      account: row.custom_account ,
      nickname: row.custom_nickname,
      token,
    };
  } else {
    // 密碼是錯的
    output.error = "帳號或密碼錯誤";
    output.code = 450;
  }
  res.json(output);
});

// // 使用 multer().none() 表示不处理文件上传
// customAuthRouter.post("/login", upload.none(), async (req, res) => {
//   const { account, password } = req.body;
//   try {
//     const query = "SELECT * FROM account WHERE account = ? AND password = ?";
//     const [rows] = await db.query(query, [account, password]);
//     if (rows.length > 0) {
//       const sellerId = rows[0].seller_id;
//       res.status(200).json({ success: true, message: "登入成功", sellerId });
//     } else {
//       res.status(401).json({ success: false, message: "帳號或密碼錯誤" });
//     }
//   } catch (error) {
//     console.error("登入失敗", error);
//     res.status(500).json({ success: false, message: "登入失敗" });
//   }
// });

// // 賣家註冊
// customAuthRouter.post("/register", async (req, res) => {
//   const { account, password } = req.body;
//   try {
//     const query = "INSERT INTO account (account, password) VALUES (?, ?)";
//     const result = await db.query(query, [account, password]);
//     res.status(200).json({ success: true, message: "註冊成功" });
//   } catch (error) {
//     console.error("註冊失敗", error);
//     res.status(500).json({ success: false, message: "註冊失敗" });
//   }
// });

export default customAuthRouter;

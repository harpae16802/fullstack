// authRouter.js
import express from "express";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import db from "../utils/db.js";

// postman 測試路由 : http://localhost:3002/custom-auth/login-jwt
const signUpRouter = express.Router();

// POST - 新增會員資料
signUpRouter.post("/custom-sign", async function (req, res) {
  // 使用 bcrypt 加密密碼
  const email = req.body.email;
  const password3 = req.body.password3;
  const hashedPassword = await bcrypt.hash(password3, 10);
  let result = {};
  const sql =
    "INSERT INTO custom (custom_account, custom_password) VALUES (?, ?)";
  [result] = await db.query(sql, [email, hashedPassword]);
  res.json(result);
});

export default signUpRouter;

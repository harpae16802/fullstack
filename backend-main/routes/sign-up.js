// authRouter.js
import express from "express";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import db from "../utils/db.js";
import { z } from "zod";

// postman 測試路由 : http://localhost:3002/custom-auth/login-jwt
const signUpRouter = express.Router();

// POST - 新增會員資料
signUpRouter.post("/custom-sign", async function (req, res) {
  // 驗證
  const output = {
    success: false,
    bodyData: req.body,
    errors: {},
  };

  let isPass = true;

  // TODO: 欄位資料檢查
  const schemaEmail = z.string().email({ message: "請填寫正確的E-MAIL格式" });
  const schemaPwd = z.string().min(6, { message: "請填寫正確的密碼格式" });
  const r1 = schemaEmail.safeParse(req.body.email);
  if (!r1.success) {
    isPass = false;
    output.errors.email = r1.error.issues[0].message;
  }
  const r2 = schemaPwd.safeParse(req.body.password3);
  if (!r2.success) {
    isPass = false;
    output.errors.password3 = r2.error.issues[0].message;
  }

  const email = req.body.email;
  // 使用 bcrypt 加密密碼
  const password3 = req.body.password3;
  const hashedPassword = await bcrypt.hash(password3, 10);
  let result = {};

  if (isPass) {
    const sql =
      "INSERT INTO custom (custom_account, custom_password) VALUES (?, ?)";
    try {
      [result] = await db.query(sql, [email, hashedPassword]);
      output.success = !!result.affectedRows;
    } catch (ex) {}
  }
  res.json(output);
});

export default signUpRouter;

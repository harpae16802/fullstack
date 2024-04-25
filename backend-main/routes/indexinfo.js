// authRouter.js
import express from "express";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import db from "../utils/db.js";
import { z } from "zod";

// postman 測試路由 : http://localhost:3002/index-info/store
const indexInfoRouter = express.Router();

// GET - 商家資料
indexInfoRouter.get("/store", async function (req, res) {
  const sql = "SELECT seller.seller_id,seller.store_name,seller.store_image,market_data.market_name FROM seller JOIN market_data ON seller.market_id=market_data.market_id WHERE seller.seller_id IN (1,4,6,10,11,16,20,22,24,28,31,33)";
  const [rows, fields] = await db.query(sql);
  // fields: 資料表結構的相關訊息

  res.json(rows);
});

export default indexInfoRouter;

// authRouter.js
import express from "express";
//hash
import bcrypt from "bcryptjs";
//JWT
import jwt from "jsonwebtoken";
import db from "../utils/db.js";
import { z } from "zod";

// postman 測試路由 : http://localhost:3002/game-data/gamefile
const gameDataRouter = express.Router();

// POST - 新增通關紀錄
gameDataRouter.post("/gamefile", async function (req, res) {
  const { custom_id, score, level } = req.body || {};

  const output = {
    success: false,
    error: "",
    code: 0,
    //當success變為true要的資料
    data: {
      custom_id: 0,
      level: 0,
      game_point: 0,
    },
  };
  let isPass = true;

  if (!custom_id || !score || !level) {
    isPass = false;
    output.error = "通關資料不齊全";
    return res.json(output);
  }

  let result = {};
  if (isPass) {
    const sql =
      "INSERT INTO clear_data (user_id, level_id,clear_score) VALUES (?, ?, ?)";
    try {
      [result] = await db.query(sql, [custom_id, level, score]);
      output.success = !!result.affectedRows;
      output.data = {
        custom_id: custom_id,
        level: level,
      };
    } catch (ex) {
      console.error("Error inserting clearance record:", ex);
      output.error = "通關資料新增失敗";
    }
    // 查詢用戶在某關卡的通關次數
    const selectSql =
      "SELECT COUNT(*) AS clear_times FROM clear_data WHERE user_id = ? AND level_id = ?";
    try {
      const [selectResult] = await db.query(selectSql, [custom_id, level]);
      const clearTimes = selectResult[0].clear_times;

      // 查詢通關成就表中用戶通關次數小於等於用戶實際通關次數的最大紀錄
      const achievementSql =
        "SELECT * FROM achievement_category WHERE level_id = ? AND clear_times = ? ORDER BY clear_times DESC LIMIT 1";
      const [achievementResult] = await db.query(achievementSql, [
        level,
        clearTimes,
      ]);
      if (achievementResult.length > 0) {
        output.data.game_point = achievementResult[0].get_point;
      } else {
        // 找不到符合的次數就設為0
        output.data.game_point = 0;
      }
    } catch (ex) {
      console.error("Error retrieving clearance record:", ex);
      output.error = "通關資料查詢失敗";
    }
  }

  res.json(output);
});

export default gameDataRouter;

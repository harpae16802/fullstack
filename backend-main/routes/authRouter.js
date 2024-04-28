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
// authRouter.post("/register", upload.none(), async (req, res) => {
//   try {
//     const connection = await db.getConnection(); // 從連線池中獲取連線
//    await connection.beginTransaction();

//     // 1. 將帳號密碼注入 account 表
//     const { account, password } = req.body;
//     await connection.execute(
//       "INSERT INTO account (account, password) VALUES (?, ?)",
//       [account, password]
//     );

//     // 2. 將 seller 注入一個新的資料
//     const {
//       store_name,
//       contact_number,
//       email,
//       company_address,
//       company_description,
//       store_image,
//       opening_hours,
//       closing_hours,
//       created_at,
//       rest_day,
//       profile_picture,
//       favorite_count,
//       market_id,
//       ad_id,
//     } = req.body;

//     // 將 undefined 值替換為 null
//     const values = [
//       store_name,
//       contact_number,
//       email,
//       company_address,
//       company_description,
//       store_image,
//       opening_hours,
//       closing_hours,
//       created_at,
//       rest_day,
//       profile_picture,
//       favorite_count,
//       market_id,
//       ad_id,
//     ].map((value) => (value === undefined ? null : value));

//     await connection.execute(
//       "INSERT INTO seller (store_name, contact_number, email, company_address, company_description, store_image, opening_hours, closing_hours, created_at, rest_day, profile_picture, favorite_count, market_id, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//       values
//     );

//     // 3. 取得新插入的 seller_id
//     const [sellerIdRows, sellerIdFields] = await connection.execute(
//       "SELECT LAST_INSERT_ID()"
//     );
//     const sellerId = sellerIdRows[0]["LAST_INSERT_ID()"];

//     // 4. 將兩表用 seller_id 串接起來
//     if (sellerId !== undefined) {
//       await connection.execute(
//         "UPDATE account SET seller_id = ? WHERE account_id = LAST_INSERT_ID()",
//         [sellerId]
//       );
//     } else {
//       console.error("sellerId is undefined");
//     }

//     connection.release(); // 釋放連線

//     // 5. 將 seller_id 回傳至前端
//     res.json({ seller_id: sellerId }); // 回傳新建立的 seller 的 ID
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
// authRouter.post("/register", upload.none(), async (req, res) => {
//   try {
//     const connection = await db.getConnection(); // 從連線池中獲取連線

//     // 檢查帳號是否已經註冊過
//     const { account } = req.body;
//     const [existingAccountRows] = await connection.execute(
//       "SELECT * FROM account WHERE account = ?",
//       [account]
//     );

//     if (existingAccountRows.length > 0) {
//       // 帳號已經註冊過，回滾事務並返回錯誤訊息
//       await connection.rollback();
//       connection.release(); // 釋放連線
//       return res.status(400).json({ error: "帳號已經註冊過" });
//     }

//     // 帳號未註冊過，繼續執行註冊流程

//     // 1. 將帳號密碼注入 account 表
//     const { password } = req.body;
//     await connection.execute(
//       "INSERT INTO account (account, password) VALUES (?, ?)",
//       [account, password]
//     );

//     // 2. 將 seller 注入一個新的資料
//     const {
//       store_name,
//       contact_number,
//       email,
//       company_address,
//       company_description,
//       store_image,
//       opening_hours,
//       closing_hours,
//       created_at,
//       rest_day,
//       profile_picture,
//       favorite_count,
//       market_id,
//       ad_id,
//     } = req.body;

//     // 將 undefined 值替換為 null
//     const values = [
//       store_name,
//       contact_number,
//       email,
//       company_address,
//       company_description,
//       store_image,
//       opening_hours,
//       closing_hours,
//       created_at,
//       rest_day,
//       profile_picture,
//       favorite_count,
//       market_id,
//       ad_id,
//     ].map((value) => (value === undefined ? null : value));

//     await connection.execute(
//       "INSERT INTO seller (store_name, contact_number, email, company_address, company_description, store_image, opening_hours, closing_hours, created_at, rest_day, profile_picture, favorite_count, market_id, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
//       values
//     );
//     // 3. 取得新插入的 seller_id
//     const [sellerIdRows, sellerIdFields] = await connection.execute(
//       "SELECT LAST_INSERT_ID()"
//     );
//     const sellerId = sellerIdRows[0]["LAST_INSERT_ID()"];

//     // 4. 將兩表用 seller_id 串接起來
//     if (sellerId !== undefined) {
//       await connection.execute(
//         "UPDATE account SET seller_id = ? WHERE account_id = LAST_INSERT_ID()",
//         [sellerId]
//       );
//     } else {
//       console.error("sellerId is undefined");
//     }

//     // 提交事務
//     await connection.commit();

//     connection.release(); // 釋放連線

//     // 5. 將 seller_id 回傳至前端
//     res.json({ seller_id: sellerId }); // 回傳新建立的 seller 的 ID
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });

//     // 如果出現錯誤，回滾事務
//     await connection.rollback();
//   }
// });
authRouter.post("/register", upload.none(), async (req, res) => {
  let connection;
  try {
    connection = await db.getConnection(); // 從連線池中獲取連線

    // 檢查帳號是否已經註冊過
    const { account, password } = req.body;
    const [existingAccountRows] = await connection.execute(
      "SELECT * FROM account WHERE account = ?",
      [account]
    );

    if (existingAccountRows.length > 0) {
      connection.release(); // 釋放連線
      return res.status(400).json({ error: "帳號已經註冊過" });
    }

    // 1. 將帳號密碼注入 account 表
    await connection.execute(
      "INSERT INTO account (account, password) VALUES (?, ?)",
      [account, password]
    );

    // 2. 將 seller 注入一個新的資料
    const {
      store_name,
      contact_number,
      email,
      company_address,
      company_description,
      store_image,
      opening_hours,
      closing_hours,
      created_at,
      rest_day,
      profile_picture,
      favorite_count,
      market_id,
      ad_id,
    } = req.body;

    // 插入賣家資料，將 undefined 值替換為 null
    const sellerValues = [
      store_name,
      contact_number,
      email,
      company_address,
      company_description,
      store_image,
      opening_hours,
      closing_hours,
      created_at,
      rest_day,
      profile_picture,
      favorite_count,
      market_id,
      ad_id,
    ].map((value) => (value === undefined ? null : value));

    await connection.execute(
      "INSERT INTO seller (store_name, contact_number, email, company_address, company_description, store_image, opening_hours, closing_hours, created_at, rest_day, profile_picture, favorite_count, market_id, ad_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      sellerValues
    );

    // 3. 取得新插入的 seller_id
    const [sellerIdRows, sellerIdFields] = await connection.execute(
      "SELECT LAST_INSERT_ID()"
    );
    const sellerId = sellerIdRows[0]["LAST_INSERT_ID()"];

    // 4. 將新的 seller_id 注入到 account 表中
    await connection.execute(
      "UPDATE account SET seller_id = ? WHERE account = ?",
      [sellerId, account]
    );

    connection.release(); // 釋放連線

    // 5. 返回帳號中的 seller_id
    res.json({ seller_id: sellerId }); // 回傳新建立的 seller 的 ID
  } catch (err) {
    console.error(err);
    if (connection) {
      connection.release(); // 釋放連線
    }
    res.status(500).json({ error: "Server error" });
  }
});

export default authRouter;

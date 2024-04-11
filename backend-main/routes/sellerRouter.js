// ruoter/sellerRouter.js
import express from "express";
import db from "../utils/db.js";
import multer from "multer"; // 引入 multer 用於處理檔案上傳
import path from "path"; // 引入 path 模塊，用於處理文件路徑

const sellerRouter = express.Router();

// Multer 配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/seller/"); // 檔案儲存路徑
  },
  filename: function (req, file, cb) {
    // 生成唯一的文件名
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // 使用原始文件的擴展名
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("只支持上傳圖片文件"), false);
  }
};
// 拿取
sellerRouter.get("/:sellerId", async (req, res) => {
  const { sellerId } = req.params;
  try {
    // 賣家資訊
    const sellerQuery = "SELECT * FROM seller WHERE seller_id = ?";
    const [sellerRows] = await db.query(sellerQuery, [sellerId]);

    // 賣家帳號
    const accountQuery =
      "SELECT account, password FROM account WHERE seller_id = ?";
    const [accountRows] = await db.query(accountQuery, [sellerId]);

    if (sellerRows.length > 0) {
      //帳號
      const accountInfo = accountRows[0] || { account: "", password: "" };
      res.json({ success: true, data: { ...sellerRows[0], ...accountInfo } });
    } else {
      res.status(404).json({ success: false, message: "沒有此賣家" });
    }
  } catch (error) {
    console.error("獲取賣家資訊錯誤:", error);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

// 編輯賣家資訊
sellerRouter.put("/:sellerId/edit",upload.array(), async (req, res) => {
  const sellerId = req.params.sellerId;
  const {
    storeName,
    contactNumber,
    email,
    companyAddress,
    companyDescription,
    storeImage,
    openingHours,
    closingHours,
    restDay,
    profilePicture,
    account, 
    password
  } = req.body;
  try {
    const sellerQuery = "UPDATE seller SET store_name=?, contact_number=?, email=?, company_address=?, company_description=?, store_image=?, opening_hours=?, closing_hours=?, rest_day=?, profile_picture=? WHERE seller_id=?";
    await db.query(sellerQuery, [
      storeName,
      contactNumber,
      email,
      companyAddress,
      companyDescription,
      storeImage,
      openingHours,
      closingHours,
      restDay,
      profilePicture,
      sellerId,
    ]);
    if (account && password) {
      const accountQuery = "UPDATE account SET account=?, password=? WHERE seller_id=?";
      await db.query(accountQuery, [
        account,
        password,
        sellerId,
      ]);
    }
    res.status(200).json({ success: true, message: "賣家資訊編輯成功" });
  } catch (error) {
    console.error("賣家資訊編輯失敗", error);
    res.status(500).json({ success: false, message: "賣家資訊編輯失敗" });
  }
});

// 編輯賣家頭像 (圖片上傳)
sellerRouter.put(
  "/:sellerId/edit/profilePicture",
  upload.single("profilePicture"),
  async (req, res) => {
    const sellerId = req.params.sellerId;
    const profilePicture = req.file ? req.file.filename : null; // 從 req.file 中取得上傳的頭像檔名

    try {
      const query = "UPDATE seller SET profile_picture=? WHERE seller_id=?";
      await db.query(query, [profilePicture, sellerId]);
      res.status(200).json({ success: true, message: "頭像編輯成功" });
    } catch (error) {
      console.error("頭像編輯失敗", error);
      res.status(500).json({ success: false, message: "頭像編輯失敗" });
    }
  }
);

// 編輯賣家店家照片 (圖片上傳)
sellerRouter.put(
  "/:sellerId/edit/storeImage",
  upload.single("storeImage"),
  async (req, res) => {
    const sellerId = req.params.sellerId;
    const storeImage = req.file ? req.file.filename : null; // 從 req.file 中取得上傳的店家照片檔名

    try {
      const query = "UPDATE seller SET store_image=? WHERE seller_id=?";
      await db.query(query, [storeImage, sellerId]);
      res.status(200).json({ success: true, message: "店家照片更新成功" });
    } catch (error) {
      console.error("店家照片更新失敗", error);
      res.status(500).json({ success: false, message: "店家照片更新失敗" });
    }
  }
);

export default sellerRouter;

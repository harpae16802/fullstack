// sellerRouter.js

import express from 'express';
import db from '../utils/db.js';
import multer from 'multer'; // 引入 multer 用於處理檔案上傳

const sellerRouter = express.Router();

// 設置 Multer 上傳設定
const upload = multer({ dest: 'public/seller/' }); // 設定檔案上傳的目錄為 public/seller/

// 編輯賣家資訊
sellerRouter.put('/:sellerId/edit', async (req, res) => {
  const sellerId = req.params.sellerId;
  const { storeName, contactNumber, email, companyAddress, companyDescription, storeImage, openingHours, closingHours, restDay, profilePicture } = req.body;
  try {
    const query = 'UPDATE seller SET store_name=?, contact_number=?, email=?, company_address=?, company_description=?, store_image=?, opening_hours=?, closing_hours=?, rest_day=?, profile_picture=? WHERE seller_id=?';
    await db.query(query, [storeName, contactNumber, email, companyAddress, companyDescription, storeImage, openingHours, closingHours, restDay, profilePicture, sellerId]);
    res.status(200).json({ success: true, message: '賣家資訊編輯成功' });
  } catch (error) {
    console.error('賣家資訊編輯失敗', error);
    res.status(500).json({ success: false, message: '賣家資訊編輯失敗' });
  }
});

// 編輯賣家頭像 (圖片上傳)
sellerRouter.put('/:sellerId/edit/profilePicture', upload.single('profilePicture'), async (req, res) => {
  const sellerId = req.params.sellerId;
  const profilePicture = req.file ? req.file.filename : null; // 從 req.file 中取得上傳的頭像檔名

  try {
    const query = 'UPDATE seller SET profile_picture=? WHERE seller_id=?';
    await db.query(query, [profilePicture, sellerId]);
    res.status(200).json({ success: true, message: '頭像編輯成功' });
  } catch (error) {
    console.error('頭像編輯失敗', error);
    res.status(500).json({ success: false, message: '頭像編輯失敗' });
  }
});
// 編輯賣家店家照片 (圖片上傳)
sellerRouter.put('/:sellerId/edit/storeImage', upload.single('storeImage'), async (req, res) => {
  const sellerId = req.params.sellerId;
  const storeImage = req.file ? req.file.filename : null; // 從 req.file 中取得上傳的店家照片檔名

  try {
    const query = 'UPDATE seller SET store_image=? WHERE seller_id=?';
    await db.query(query, [storeImage, sellerId]);
    res.status(200).json({ success: true, message: '店家照片更新成功' });
  } catch (error) {
    console.error('店家照片更新失敗', error);
    res.status(500).json({ success: false, message: '店家照片更新失敗' });
  }
});


export default sellerRouter;

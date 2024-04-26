
// ruoter/sellerRouter.js
import express from 'express';
import db from '../utils/db.js';
import multer from 'multer';
import path from 'path';

const sellerRouter = express.Router();

// Multer 配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'store_image') {
      cb(null, 'public/images/seller/');  // 商店圖片的儲存路徑
    } else if (file.fieldname === 'profilePicture') {
      cb(null, 'public/seller/');  // 賣家頭像的儲存路徑
    } else {
      cb(new Error('不支持的檔案類型'), false);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // 文件名
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // 接受這個文件
  } else {
    cb(new Error('只支持上傳圖片文件'), false); // 拒絕這個文件
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// 賣家資訊 GET 路由
sellerRouter.get('/:sellerId', async (req, res) => {
  const { sellerId } = req.params;
  try {
    const sellerQuery = 'SELECT * FROM seller WHERE seller_id = ?';
    const [sellerRows] = await db.query(sellerQuery, [sellerId]);

    if (sellerRows.length > 0) {
      const accountQuery = 'SELECT account, password FROM account WHERE seller_id = ?';
      const [accountRows] = await db.query(accountQuery, [sellerId]);
      const bankAccountQuery = 'SELECT * FROM bank_account WHERE seller_id = ?';
      const [bankAccounts] = await db.query(bankAccountQuery, [sellerId]);

      const accountInfo = accountRows[0] || { account: '', password: '' };
      const sellerData = {
        ...sellerRows[0],
        ...accountInfo,
        bankAccounts: bankAccounts
      };

      res.json({ success: true, data: sellerData });
    } else {
      res.status(404).json({ success: false, message: '没有此卖家' });
    }
  } catch (error) {
    console.error('获取卖家资讯错误:', error);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// 賣家資訊編輯 PUT 路由
sellerRouter.put('/:sellerId/edit', upload.fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'store_image', maxCount: 1 }
]), async (req, res) => {
  const sellerId = req.params.sellerId;
  const {
    storeName,
    contactNumber,
    email,
    companyAddress,
    companyDescription,
    openingHours,
    closingHours,
    restDay,
    account,
    password
  } = req.body;

  const profilePicture = req.files['profilePicture'] ? req.files['profilePicture'][0].filename : null;
  const storeImage = req.files['store_image'] ? req.files['store_image'][0].filename : null;

  try {
    const sellerQuery = `
      UPDATE seller SET
      store_name=?,
      contact_number=?,
      email=?,
      company_address=?,
      company_description=?,
      store_image=?,
      opening_hours=?,
      closing_hours=?,
      rest_day=?,
      profile_picture=?
      WHERE seller_id=?`;
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
      sellerId
    ]);

    if (account && password) {
      const accountQuery = 'UPDATE account SET account=?, password=? WHERE seller_id=?';
      await db.query(accountQuery, [account, password, sellerId]);
    }
    res.status(200).json({ success: true, message: '賣家資訊編輯成功' });
  } catch (error) {
    console.error('賣家資訊編輯失敗:', error);
    res.status(500).json({ success: false, message: '賣家資訊編輯失敗' });
  }
});

// 編輯賣家頭像 (圖片上傳)
sellerRouter.put("/:sellerId/edit/profilePicture", upload.single('profilePicture'), async (req, res) => {
  const sellerId = req.params.sellerId;
  const profilePicture = req.file ? req.file.filename : null; // 從 req.file 中取得上傳的頭像檔名

  try {
    const query = "UPDATE seller SET profile_picture=? WHERE seller_id=?";
    await db.query(query, [profilePicture, sellerId]);
    res.status(200).json({
      success: true,
      imageUrl: `/public/seller/${profilePicture}`,
      message: "頭像編輯成功",
    });
  } catch (error) {
    console.error("頭像編輯失敗", error);
    res.status(500).json({ success: false, message: "頭像編輯失敗" });
  }
});


export default sellerRouter;

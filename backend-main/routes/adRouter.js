import express from "express";
import multer from "multer";
import path from "path";
import db from "../utils/db.js"; // 确保 db.js 提供了连接数据库的方法和 query 方法

const router = express.Router();

const storageType1 = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/adimg/type1");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const storageType2 = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/adimg/type2");
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadType1 = multer({ storage: storageType1 });
const uploadType2 = multer({ storage: storageType2 });

// 方案1
router.post("/uploadType1", uploadType1.single("adImage"), async (req, res) => {
  const sellerId = req.body.seller_id;
  const adType = 1;
  if (!sellerId) {
    return res.status(400).json({
      status: "error",
      message: "Missing seller_id. It is required.",
    });
  }

  if (req.file) {
    const imagePath = path.join("adimg/type1", req.file.filename); 
    try {
      const result = await db.query(
        "INSERT INTO advertisements (seller_id, image_path, ad_type) VALUES (?, ?, ?)",
        [sellerId, imagePath, adType]
      );

      res.json({
        status: "success",
        message: "File uploaded and path saved to database successfully!",
        filePath: imagePath,
        dbResult: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Database operation failed",
        error: error.message,
      });
    }
  } else {
    res.status(400).send("File upload failed.");
  }
});

// 方案2
router.post("/uploadType2", uploadType2.single("adImage"), async (req, res) => {
  const sellerId = req.body.seller_id;
  const adType = 2;
  if (!sellerId) {
    return res.status(400).json({
      status: "error",
      message: "Missing seller_id. It is required.",
    });
  }

  if (req.file) {
    const imagePath = path.join("adimg/type2", req.file.filename); 

    try {
      const result = await db.query(
        "INSERT INTO advertisements (seller_id, image_path, ad_type) VALUES (?, ?, ?)",
        [sellerId, imagePath, adType]
      );

      res.json({
        status: "success",
        message: "File uploaded and path saved to database successfully!",
        filePath: imagePath,
        dbResult: result,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Database operation failed",
        error: error.message,
      });
    }
  } else {
    res.status(400).send("File upload failed.");
  }
});

export default router;

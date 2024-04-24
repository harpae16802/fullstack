import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../utils/db.js'; // 确保 db.js 提供了连接数据库的方法和 query 方法

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './public/adimg');
    },
    filename(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('adImage'), async (req, res) => {
    const sellerId = req.body.seller_id;  // 使用 multer，req.body 应该能正确解析文本字段
    if (!sellerId) {
        return res.status(400).json({
            status: "error",
            message: "Missing seller_id. It is required."
        });
    }

    if (req.file) {
        const imagePath = req.file.path;

        try {
            // 插入数据到数据库
            const result = await db.query(
                'INSERT INTO advertisements (seller_id, image_path) VALUES (?, ?)',
                [sellerId, imagePath]
            );

            // 返回成功消息
            res.json({
                status: "success",
                message: "File uploaded and path saved to database successfully!",
                filePath: imagePath,
                dbResult: result
            });
        } catch (error) {
            // 如果有数据库操作错误，您可能需要检查数据库连接和 SQL 语句
            res.status(500).json({
                status: "error",
                message: "Database operation failed",
                error: error.message
            });
        }
    } else {
        res.status(400).send('File upload failed.');
    }
});

export default router;

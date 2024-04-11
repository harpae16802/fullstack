import express from "express";
import db from "../utils/db.js";
import multer from "multer"; // 引入 multer 用於處理檔案上傳
import path from "path"; // 引入 path 模塊，用於處理文件路徑

const productsRouter = express.Router();

// Multer 配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/products/"); // 檔案儲存路徑
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

const upload = multer({ storage: storage, fileFilter: fileFilter });

productsRouter
  .get("/:sellerId", async (req, res) => {
    const { sellerId } = req.params;
    const {
      category,
      minPrice,
      maxPrice,
      status,
      page = 1,
      limit = 10,
    } = req.query;
    const countQuery = 'SELECT COUNT(*) AS total FROM products WHERE seller_id = ?';
    let query = "SELECT * FROM products WHERE seller_id = ?";
    const params = [sellerId];

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    if (minPrice && maxPrice) {
      query += " AND price BETWEEN ? AND ?";
      params.push(minPrice, maxPrice);
    } else if (minPrice) {
      query += " AND price >= ?";
      params.push(minPrice);
    } else if (maxPrice) {
      query += " AND price <= ?";
      params.push(maxPrice);
    }

    // 根據 status 篩選
    if (status !== undefined) {
      query += " AND status = ?";
      params.push(status); // 假設 status 通過 query string 傳入，並且是 0 或 1
    }
    const offset = Math.max(0, (page - 1) * limit);//計算頁數
    query += " LIMIT ? OFFSET ?"; // SQL分頁語法
    params.push(parseInt(limit), offset); // 強制参数是整數
    try {
      const [totalRows] = await db.query(countQuery, [sellerId]); // 假设你只基于sellerId来计算总数
      const total = totalRows[0].total;
      const [rows] = await db.query(query, params); // 假設 db.query 返回的是一个數組，其中第一个元素包含查詢結果
      const products = rows.map((product) => ({
        productName: product.product_name, // 產品名稱
        stockQuantity: product.stock_quantity, // 產品數量
        category: product.category, // 產品類別
        price: product.price, // 產品價格
        status: product.status === 1 ? "上架" : "下架", // 產品狀態，这里假设 1 代表上架，其他值代表下架
      }));
      res.json({ success: true, products, total });
    } catch (error) {
      console.error("获取产品列表失败", error);
      res.status(500).json({ success: false, message: "服务器错误" });
    }
  })

  // 新增產品包含上船圖檔
  .post("/add", upload.single("image"), async (req, res) => {
    const {
      category,
      productName,
      productDescription,
      price,
      stockQuantity,
      sellerId,
    } = req.body;
    const imageUrl = req.file ? `/products/${req.file.filename}` : null; // 從 req.file 中取得上傳的圖片檔名

    try {
      const query =
        "INSERT INTO products (category, product_name, product_description, image_url, price, stock_quantity, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      await db.query(query, [
        category,
        productName,
        productDescription,
        imageUrl,
        price,
        stockQuantity,
        sellerId,
      ]);
      res.status(200).json({ success: true, message: "產品新增成功" });
    } catch (error) {
      console.error("產品新增失敗", error);
      res.status(500).json({ success: false, message: "產品新增失敗" });
    }
  })

  // 編輯產品
  .put("/edit/:productId", async (req, res) => {
    const productId = req.params.productId;
    const { category, productName, productDescription, price, stockQuantity } =
      req.body;
    try {
      const query =
        "UPDATE products SET category=?, product_name=?, product_description=?, price=?, stock_quantity=? WHERE product_id=?";
      await db.query(query, [
        category,
        productName,
        productDescription,
        price,
        stockQuantity,
        productId,
      ]);
      res.status(200).json({ success: true, message: "產品編輯成功" });
    } catch (error) {
      console.error("產品編輯失敗", error);
      res.status(500).json({ success: false, message: "產品編輯失敗" });
    }
  });

export default productsRouter;

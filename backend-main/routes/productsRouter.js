import express from "express";
import db from "../utils/db.js";
import multer from "multer"; // 引入 multer 用於處理檔案上傳
import path from "path"; // 引入 path 模塊，用於處理文件路徑


const productsRouter = express.Router();

// Multer 配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/products");
  },
  filename: function (req, file, cb) {
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

// 頭像更新
productsRouter.put(
  "/edit-profile-picture/:sellerId",
  upload.single("profilePicture"),
  async (req, res) => {
    const { sellerId } = req.params;
    const imageUrl = req.file ? `/products/${req.file.filename}` : null;

    try {
      const query = "UPDATE sellers SET profile_picture = ? WHERE id = ?";
      await db.query(query, [imageUrl, sellerId]);
      res.json({ success: true, imageUrl, message: "頭像更新成功。" });
    } catch (error) {
      console.error("更新頭像失敗", error);
      res.status(500).json({ success: false, message: "更新頭像失敗" });
    }
  }
);

//依照賣家找到對應商品
productsRouter.get("/:sellerId/categories", async (req, res) => {
  const { sellerId } = req.params;

  try {
    const query = `
          SELECT DISTINCT pc.category_id, pc.category_name
          FROM product_categories pc
          JOIN products p ON p.category_id = pc.category_id
          WHERE p.seller_id = ?;
      `;
    const [categories] = await db.query(query, [sellerId]);
    res.json({ success: true, categories });
  } catch (error) {
    console.error("獲取類別列表失敗", error);
    res.status(500).json({ success: false, message: "後端錯誤" });
  }
});

// 依照賣家獲取產品列表
productsRouter.get("/:sellerId", async (req, res) => {
  const { sellerId } = req.params;
  const {
    productName,
    category,
    minPrice,
    maxPrice,
    status,
    page = 1,
    limit = 10,
  } = req.query;

  // SQL
  let query = "SELECT * FROM products WHERE seller_id = ?";
  let countQuery = "SELECT COUNT(*) AS total FROM products WHERE seller_id = ?";
  const params = [sellerId];
  const countParams = [sellerId];

  if (productName) {
    query += " AND product_name LIKE ?";
    countQuery += " AND product_name LIKE ?";
    params.push(`%${productName}%`);
    countParams.push(`%${productName}%`);
  }

  if (category) {
    query += " AND category_id = ?";
    countQuery += " AND category_id = ?";
    params.push(parseInt(category)); // 類別
    countParams.push(parseInt(category));
  }

  if (minPrice && maxPrice) {
    query += " AND price BETWEEN ? AND ?";
    countQuery += " AND price BETWEEN ? AND ?";
    params.push(minPrice, maxPrice);
    countParams.push(minPrice, maxPrice);
  } else if (minPrice) {
    query += " AND price >= ?";
    countQuery += " AND price >= ?";
    params.push(minPrice);
    countParams.push(minPrice);
  } else if (maxPrice) {
    query += " AND price <= ?";
    countQuery += " AND price <= ?";
    params.push(maxPrice);
    countParams.push(maxPrice);
  }

  if (status !== undefined) {
    query += " AND status = ?";
    countQuery += " AND status = ?";
    params.push(status);
    countParams.push(status);
  }

  // 分頁處裡
  const offset = (page - 1) * limit;
  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  try {
    // 查询总数
    const [totalResults] = await db.query(countQuery, countParams);
    const total = totalResults[0].total;

    // 回傳前端的值
    const [rows] = await db.query(query, params);
    const products = rows.map((product) => ({
      product_id: product.product_id,
      productName: product.product_name,
      stockQuantity: product.stock_quantity,
      category: product.category,
      price: product.price,
      status: product.status === 1 ? "上架" : "下架",
      category_id: product.category_id,
    }));

    res.json({ success: true, total, products });
  } catch (error) {
    console.error("获取产品列表失败", error);
    res.status(500).json({ success: false, message: "服务器错误" });
  }
});

// 新增產品包含上船圖檔
productsRouter.post("/add", upload.single("image"), async (req, res) => {
  const {
    category,
    category_id,
    productName,
    productDescription,
    price,
    stockQuantity,
    productIngredient,
    productNutrition,
    seller_id,
  } = req.body;

  const imageUrl = req.file ? `/products/${req.file.filename}` : null; // 從 req.file 中取得上傳的圖片檔名
  const status = 1; // 根據您的業務規則設置，例如，新建產品預設為上架狀態
  const favoriteCount = 0; // 新建產品的初始蒐藏數為0

  try {
    const query = `
        INSERT INTO products (
          category, category_id, product_name, product_description, image_url,
          price, stock_quantity, seller_id, status, favorite_count, 
          product_ingredient, product_nutrition
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
    await db.query(query, [
      category,
      category_id,
      productName,
      productDescription,
      imageUrl,
      price,
      stockQuantity,
      seller_id,
      status,
      favoriteCount,
      productIngredient,
      productNutrition,
    ]);
    res.status(200).json({
      success: true,
      imageUrl: imageUrl,
      message: "產品新增成功",
    });
  } catch (error) {
    console.error("產品新增失敗", error);
    res.status(500).json({ success: false, message: "產品新增失敗" });
  }
});

// 獲取單個產品的詳細信息
productsRouter.get("/details/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const query = `
      SELECT * FROM products WHERE product_id = ?;
    `;
    const [product] = await db.query(query, [productId]);
    if (product.length === 0) {
      res.status(404).json({ success: false, message: "產品未找到" });
      return;
    }
    res.json({ success: true, product: product[0] });
  } catch (error) {
    console.error("獲取產品詳細信息失敗", error);
    res.status(500).json({ success: false, message: "伺服器錯誤" });
  }
});

// 更新產品資訊
productsRouter.put("/update-product/:productId", upload.single("image"), async (req, res) => {
  const { productId } = req.params;
  const {
    product_name,
    product_description,
    price,
    product_nutrition,
    product_ingredient,
    stock_quantity,
    category_id,
    category ,
    status
  } = req.body;

  console.log(req.body);  
 
  const imageUrl = req.file ? `/products/${req.file.filename}` : null;
  console.log(imageUrl);

  try {
    
    if (category_id) {
      const categoryExists = await db.query("SELECT * FROM product_categories WHERE category_id = ?", [category_id]);
      if (categoryExists[0].length === 0) {
        return res.status(404).json({ success: false, message: "指定的id不存在" });
      }
    }

    // 建構更新查詢
    const query = `
      UPDATE products SET
        product_name = ?,
        product_description = ?,
        price = ?,
        product_nutrition = ?,
        product_ingredient = ?,
        stock_quantity = ?,
        image_url = ?,
        category_id = ?,
        category = ?,
        status = ?
      WHERE product_id = ?;
    `;

    // 執行更新
    await db.query(query, [
      product_name,
      product_description,
      price,
      product_nutrition,
      product_ingredient,
      stock_quantity,
      imageUrl,
      category_id,
      category, 
      status,
      productId
    ]);

    res.json({ success: true, message: "更新成功", imageUrl });
  } catch (error) {
    console.error("更新失敗", error);
    res.status(500).json({ success: false, message: "更新產品訊息:", error: error.message });
  }
});



export default productsRouter;
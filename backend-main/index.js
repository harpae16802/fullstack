// index.js

import express from 'express';
import bodyParser from 'body-parser';
import sellerRouter from './routes/sellerRouter.js';
import productsRouter from './routes/productsRouter.js';
import authRouter from './routes/authRouter.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// 賣家登入驗證帳戶
app.use('/auth', authRouter);

//產品
app.use('/products', productsRouter);

// 賣家資料

app.use('/sellers', sellerRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

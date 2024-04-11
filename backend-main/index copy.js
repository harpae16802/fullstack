// index.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import productsRouter from './routes/productsRouter.js';
import sellersRouter from './routes/sellersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import db from './utils/db.js';

const app = express();
const PORT = process.env.WEB_PORT || 3003;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // 中間件 session cookies
// app.use(
//   session({
//     saveUninitialized: true,
//     resave: true,
//     secret: "kdjfsk94859348JHGJK85743",
//     store: sessionStore,
//     // cookies 生命週期
//     cookie: {
//       maxAge: 1200_000,
//     },
//   })
// );



// 賣家登入驗證帳戶
app.use('/auth', authRoutes);

//產品
app.use('/products', productsRouter);

// 賣家資料
app.use('/sellers', sellersRouter);
 app.use()
// 靜態
app.use("/", express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
app.use("/jquery", express.static("node_modules/jquery/dist"));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(err.message || 'Server Error');
});

db.getConnection()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

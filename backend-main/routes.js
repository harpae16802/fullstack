// router.js
// 导入模块
import { paypalPayMoney, clientToken } from "./controllers/paypalController.js";
import { hellojsonTable , jsonTableSearch  } from "./controllers/jsonTableConsroller.js";
import { jsonFormTa, ImgFormTa, insertMemberForm, updateMemberForm } from "./controllers/jsonFormConsroller.js";
import upload from './utils/multer.js';
import express from 'express';

const app = express.Router();

// 路由定义
app.get("/", hellojsonTable);
app.post("/create", jsonFormTa);
app.post("/bigImg", upload.single('file'), ImgFormTa);
app.post("/insertMemberForm", insertMemberForm);
app.post("/updateMemberForm", updateMemberForm);
app.post("/paypalPayMoney", paypalPayMoney);
app.get("/paypalPayMoney/client_token", clientToken);

// 导出模块

export default app;

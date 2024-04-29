// 獲得點數
import { selectGained2Ticket01,maxTicket, selectGained2Ticket02 } from "./controllers/ticket2Constroller.js";
// 遊戲資訊
import { selectGainedTicket01, selectGainedTicket02, selectGainedTicket03, selectry,remainTicket } from "./controllers/ticketConstroller.js";
// paypal
import { paypalPayMoney, clientToken } from "./controllers/paypalController.js"; 
// 基本資料修改 包括圖片訊息
import { jsonFormTa, ImgFormTa,getImgFormTa, insertMemberForm,selectCustom, updateMemberForm } from "./controllers/jsonFormConsroller.js"; 
// qrcode
import { myProduct, myProduct2 ,recordSearch,insertProduct} from "./controllers/qrcodeConstroller.js";
// 我的最愛
import { favoriteDel01Product, favoriteSearch01Product,favoriteDel02Store ,favoriteSearch02Store} from "./controllers/favoriteController.js";
// 遊戲紀錄(測試)
import { gamePassSelect01 } from "./controllers/gameConstroller.js"; 
import upload from './utils/multer.js';
import express from 'express';
const app = express.Router();


// app.get("/", hellojsonTable);
// app.get("/jsonTableSearch", jsonTableSearch);
// app.post("/create", jsonFormTa);
//++ 顧客資料
// 上傳圖片
app.post("/bigImg", upload.single('file'), ImgFormTa);
// 取得圖片
app.post("/getImgFormTa", getImgFormTa);
// 新增資料
app.post("/insertMemberForm", insertMemberForm);
// 更新資料
app.post("/updateMemberForm", updateMemberForm);
// 顧客資料
app.post("/selectCustom", selectCustom);

// paypal
app.post("/paypalPayMoney", paypalPayMoney);
app.get("/paypalPayMoney/client_token", clientToken);
// ++ 點數
// 全部點數
app.post("/ticket/ticket01Select01", selectGainedTicket01);
// 已獲得點數 
app.post("/ticket/ticket01Select02", selectGainedTicket02);
// 已使用點數  
app.post("/ticket/ticket01Select03", selectGainedTicket03);
// 勘版 剩下點數
app.post("/ticket/remainTicket", remainTicket);
// selectry
app.post("/ticket/selectry", selectry);

// ++ 遊戲通關
// 通關資訊
app.post("/ticket/ticket02Select01", selectGained2Ticket01);
// 成就資訊
app.post("/ticket/ticket02Select02", selectGained2Ticket02);
app.get("/ticket/ticket02Select02", selectGained2Ticket02);
// 勘版 通關
app.post("/ticket/maxTicket", maxTicket); 
// gamePassSelect01

app.get("/game/gamePassSelect01", gamePassSelect01);

//++  qrcode
//客戶選擇商家訂單
app.post("/qrcode/myProduct", myProduct);
//客戶選擇商家訂單的商品
app.post("/qrcode/myProduct2", myProduct2);
//客戶所有訂單資訊
app.get("/qrcode/recordSearch", recordSearch);
//客戶新增商家訂單
app.post("/qrcode/insertProduct", insertProduct);
 
// favorite

app.post("/favorite/favoriteDel01Product", favoriteDel01Product);
app.post("/favorite/favoriteSearch01Product", favoriteSearch01Product);
app.post("/favorite/favoriteDel02Store", favoriteDel02Store);
app.post("/favorite/favoriteSearch02Store", favoriteSearch02Store);

export default app;
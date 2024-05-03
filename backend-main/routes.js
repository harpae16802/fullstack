import { selectGained2Ticket01, selectGained2Ticket02 } from "./controllers/ticket2Constroller.js";
import { selectGainedTicket01, selectGainedTicket02, selectGainedTicket03, selectry } from "./controllers/ticketConstroller.js";
import { paypalPayMoney, clientToken } from "./controllers/paypalController.js"; 
import { jsonFormTa, ImgFormTa, insertMemberForm, updateMemberForm } from "./controllers/jsonFormConsroller.js"; 
import { myProduct, myProduct2 } from "./controllers/qrcodeConstroller.js";
import { favoriteDel01Product, favoriteSearch01Product,favoriteDel02Store ,favoriteSearch02Store} from "./controllers/favoriteController.js";
import { gamePassSelect01 } from "./controllers/gameConstroller.js"; 
import { linePayBox } from "./controllers/lineController.js"; 
import upload from './utils/multer.js';
import express from 'express';
const app = express.Router();


// app.get("/", hellojsonTable);
// app.get("/jsonTableSearch", jsonTableSearch);
// app.post("/create", jsonFormTa);
// 上傳圖片
app.post("/bigImg", upload.single('file'), ImgFormTa);
app.post("/insertMemberForm", insertMemberForm);
app.post("/updateMemberForm", updateMemberForm);
// paypal
app.post("/paypalPayMoney", paypalPayMoney);
app.get("/paypalPayMoney/client_token", clientToken);
// 點數

app.post("/ticket/ticket01Select01", selectGainedTicket01);
app.post("/ticket/ticket01Select02", selectGainedTicket02);
app.post("/ticket/ticket01Select03", selectGainedTicket03);
// selectry
app.post("/ticket/selectry", selectry);

// 遊戲點數

app.post("/ticket/ticket02Select01", selectGained2Ticket01);
app.post("/ticket/ticket02Select02", selectGained2Ticket02);

// gamePassSelect01

app.get("/game/gamePassSelect01", gamePassSelect01);

// qrcode

app.get("/qrcode/myProduct", myProduct);
app.get("/qrcode/myProduct2", myProduct2);

// favorite

app.post("/favorite/favoriteDel01Product", favoriteDel01Product);
app.post("/favorite/favoriteSearch01Product", favoriteSearch01Product);
app.post("/favorite/favoriteDel02Store", favoriteDel02Store);
app.post("/favorite/favoriteSearch02Store", favoriteSearch02Store);

// linePayBox
app.post("/linePayBox",linePayBox)
export default app;
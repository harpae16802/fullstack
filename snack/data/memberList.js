
const data = [
  {
    title: "個人基本資料",
    type: "memberData1",
    href: "/memberSystem"
  } 
   
  , {

    title: "商品與QRcode",
    type: "productQrcode1", 
    href: "/memberSystem/qrcodeSelect"  
  }
  ,
  {
    title: "我的點數",
    type: "mTicket2",
    href: "/memberSystem/ticket"

  },
  {
    title: "我的遊戲紀錄",
    href: "/home2",
    type: "qrcodeExchanged4",
    href: "/memberSystem/ticket2"

  }
  , {
    title: "我的最愛",
    type: "mLove1",
    href: "/memberSystem/favorite"

  } 
];
const dataMobile = [
  {
    title: "個人基本資料",
    type: "memberData",
    href: "/memberSystem"
  }
    
  ,  {
    title: "Qrcode確認",
    type: "qrcodeExchange2",
    href: "/memberSystem/qrcodeSelect2"

  }, {
    title: "Qrcode兌換",
    type: "qrcodeExchange210",
    href: "/home1"

  }, {
    title: "已兌換產品",
    href: "/memberSystem/qrcodeSelect3",
    type: "qrcodeExchanged22"

  }
  ,
  {
    title: "我的點數",
    type: "mTicket",
    href: "/memberSystem/ticket"

  },
  {
    title: "我的遊戲紀錄",
    href: "/home2",
    type: "qrcodeExchanged4",
    href: "/memberSystem/record"

  }

  , {
    title: "我的最愛",
    type: "mLove",
    href: "/memberSystem/favorite"

  } 
];
export default { data, dataMobile };
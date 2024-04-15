
const data = [
  {
    title: "個人基本資料",
    type: "memberData",
    href: "/memberSystem"
  } 
   
  , {

    title: "商品與QRcode",
    type: "productQrcode", 

    list: [
      {
        title: "Qrcode兌換",
        type: "qrcodeExchange",
        href: "/memberSystem/qrcodeSelect"

      },
      {
        title: "Qrcode確認",
        type: "qrcodeExchange",
        href: "/memberSystem/qrcodeSelect2"

      },
      {
        title: "已兌換產品",
        type: "qrcodeExchange",
        href: "/memberSystem/qrcodeSelect3"

      },
      {
        title: "已兌換產品二",
        href: "/home2",
        type: "qrcodeExchanged",
        href: "/memberSystem/qrcodeSelect4"
 
      }
    ]

  }
  ,
  {
    title: "我的點數",
    type: "mTicket",
    href: "/memberSystem/ticket"

  }

  , {
    title: "我的最愛",
    type: "mLove",
    href: "/memberSystem/favorite"

  }, {
    title: "我的留言",
    type: "mTalk",
    bindErr: "errhandle",
    href: "/memberSystem/record"

  }
];
const dataMobile = [
  {
    title: "個人基本資料",
    type: "memberData",
    href: "/memberSystem"
  }
  ,
  {
    title: "付款方式設定",
    type: "paymentWay",
    href: "/home"

  },
   {

    title: "商品與QRcode",
    type: "productQrcode",


  }
  , {
    title: "Qrcode兌換",
    type: "qrcodeExchange",
    href: "/home1",

  }, {
    title: "已兌換產品",
    href: "/home2",
    type: "qrcodeExchanged",

  }
  ,
  {
    title: "我的點數",
    type: "mTicket",
    href: "/home"

  }

  , {
    title: "我的最愛",
    type: "mLove",
    href: "/home"

  }, {
    title: "我的留言",
    type: "mTalk",
    href: "/home", 
    bindErr: "errhandle"
  }
];
export default { data, dataMobile };
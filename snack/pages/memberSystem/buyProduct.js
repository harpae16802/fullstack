import React from 'react'
import selectMenu from "@/components/memberS/person/selectMenu"
import BuyPro from "@/components/memberS/qrcode/product"
export default function buyProduct() {
  return (
    <div className="container">
    <div className="row">
        <div className="col-12 col-md-4 d-flex justify-content-center">
          <selectMenu/> 
        </div> 
        <div className="col-12 col-md-8">
          <BuyPro/>  
        </div> 
    </div>

</div>
  )
}

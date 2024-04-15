 

import SelectMenu from "@/components/memberS/person/selectMenu";
import QrcodeRecord from "@/components/memberS/qrcode/exchange4/qrcodeRecord"
import QrcodeRecordMobile from "@/components/memberS/qrcode/exchange4/qrcodeRecordMobile"
 
import Search from "@/components/memberS/qrcode/searchbar"
import styles from "@/styles/form.module.css"
import Pagination from "@/components/memberS/others/pagination"
import QrcodeCurrent from "@/components/modal/qrcodeCurrent";

import classNames from 'classnames'

export default function QrcodeselectMobile1() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-4 ">
          <SelectMenu />
        </div>

        <div className="col-12 col-md-8">
        <div className={classNames("", styles["main-O-baground"])}>

          <h4 className="text-title">[Qrcode兌換]</h4>
       
           <Search />

          <h4 className='creditTitle credit   text-smtitle' style={{ border: 0 }}>我的商品</h4>
          <div className={classNames(styles['border-1'], "px-4 py-3 mt-4", styles["rd-2"])}>

            <QrcodeRecord />
            <QrcodeRecordMobile />


          </div>
          <Pagination />
          <div className="d-flex justify-content-center align-items-center">
            <QrcodeCurrent />
            <button type="submit" className={classNames("btn  px-5 mx-2", styles["btn-parmary"], styles["rd-30"])}>上一步 </button>
            <button type="submit" className={classNames("btn  px-5 mx-2", styles["btn-parmary"], styles["rd-30"])}>下一步 </button>
          </div>
          </div>

        </div>
      </div>

    </div>
  );
}



import React from 'react'
import { IoIosCheckboxOutline } from "react-icons/io";
export default function qrcodeCurrent() {
    return (
        <>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                兌換成功
            </button>

            <div class="modal fade qrcodeCurrentBackdrop" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="qrcode-header">
                            <button type="button" class="btn-close qrcodeCloseIcon" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body body">
                        <h2 class="modal-title mb-5 font-bold" id="staticBackdropLabel ">Qrcode 兌換成功</h2>

                            <IoIosCheckboxOutline className='qrcodeCurrentIcon mb-5' />
                            <h4 className='font-bold'>
                                你的QRcode已兌換成功 <br />
                                接下來請和商家核對需兌換的商品囉
                            </h4>
                        </div>
                        <div class="qrcode-footer text-center mb-5 mt-5">
                            <button type="button" class=" btn-m-secondary" data-bs-dismiss="modal">前去評價</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

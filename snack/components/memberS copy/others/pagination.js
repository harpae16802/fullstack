import React from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
export default function pla() {
  return (
    <div aria-label="Page navigation example" className='d-flex justify-content-center mt-4'>
      <ul className="pagination justify-content-end">
        <li className="page-item disabled">
          <a className="page-link"><IoIosArrowForward /></a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
          <a className="page-link" href="#"><IoIosArrowBack /></a>
        </li>
      </ul>
    </div>

  )
}

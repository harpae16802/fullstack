import Section from '@/components/layout/section'
import React from 'react'
import Image from 'next/image'
import SearchBar from '@/components/common/search-bar'
// 用在分頁的icon
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa'

export default function Nightmarket() {
  return (
    <>
      <Section>
        {/* <Image src="/images/layout/icons.png" alt="" width={500} height={500} /> */}
        <SearchBar />

        <h1 className="mt-5">【有調整過的boostrap元件】</h1>
        {/* 按鈕 */}
        <>
          <h3 className="mt-5">==主要用這三個按鈕==</h3>
          <button type="button" className="btn btn-primary">
            加入購物車
          </button>
          <button type="button" className="btn btn-outline-primary">
            加入購物車
          </button>
          <button type="button" className="btn btn-light">
            Light
          </button>

          <h4 className="mt-5">===這裡只是參考用按鈕====</h4>
          <div className="other-none d-flex flex-row flex-wrap mb-3 mt-3">
            <button type="button" className="btn btn-secondary">
              Secondary
            </button>
            <button type="button" className="btn btn-success">
              Success
            </button>
            <button type="button" className="btn btn-danger">
              Danger
            </button>
            <button type="button" className="btn btn-warning">
              Warning
            </button>
            <button type="button" className="btn btn-info">
              Info
            </button>
            <button type="button" className="btn btn-dark">
              Dark
            </button>
            <button type="button" className="btn btn-link">
              Link
            </button>
          </div>
        </>

        <>
          <div className="other-none d-flex flex-row flex-wrap mb-3">
            <button type="button" className="btn btn-outline-secondary">
              Secondary
            </button>
            <button type="button" className="btn btn-outline-success">
              Success
            </button>
            <button type="button" className="btn btn-outline-danger">
              Danger
            </button>
            <button type="button" className="btn btn-outline-warning">
              Warning
            </button>
            <button type="button" className="btn btn-outline-info">
              Info
            </button>
            <button type="button" className="btn btn-outline-light">
              Light
            </button>
            <button type="button" className="btn btn-outline-dark">
              Dark
            </button>
          </div>
        </>

        <h3 className="mb-3 mt-5">==以下是調整過的,使用可從下面複製==</h3>
        <p>尤其是頁碼的html結構和bootstrap不一樣 要從這裡複製</p>

        <h4 className="mb-3 mt-5">===頁碼===</h4>
        {/* 頁碼開始 */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <div className="page-pre">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="First">
                  <span aria-hidden="true">
                    <FaAngleDoubleLeft />
                  </span>
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">
                    <FaAngleLeft />
                  </span>
                </a>
              </li>
            </div>
            <div className="page-number">
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
            </div>
            <div className="page-next">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">
                    <FaAngleRight />
                  </span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="End">
                  <span aria-hidden="true">
                    <FaAngleDoubleRight />
                  </span>
                </a>
              </li>
            </div>
          </ul>
        </nav>
        {/* 頁碼開始結束 */}

        <h4 className="mb-3 mt-5">===表單====</h4>
        {/* 表單開始 */}
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control is-invalid"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text invalid-feedback">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control is-valid"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* 表單結束 */}

        <h4 className="mb-3 mt-5">===輸入框===</h4>
        {/* 輸入框開始 */}
        <>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={''}
            />
          </div>
        </>
        {/* 輸入框結束 */}

        <h4 className="mb-3 mt-5">===下拉選單===</h4>
        {/* 下拉選擇開始 */}
        <select className="form-select" aria-label="Default select example">
          <option selected="">Open this select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        {/* 下拉選擇結束 */}

        <h4 className="mb-3 mt-5">===選取===</h4>
        {/* 選取開始 */}
        <>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Default checkbox
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultValue=""
              id="flexCheckChecked"
              defaultChecked=""
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Checked checkbox
            </label>
          </div>
        </>
        {/* 選取結束 */}
      </Section>
    </>
  )
}

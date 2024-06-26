import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare, FaRegWindowClose } from 'react-icons/fa'

export default function GameRule({ children }) {
  const [showModal, setShowModal] = useState(true)

  // 打開 modal
  const openModal = () => setShowModal(true)

  // 關閉 modal
  const closeModal = () => setShowModal(false)

  return (
    <>
      {/* 黑屏 */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: '1050' }}
        ></div>
      )}
      {/* Modal */}
      <div className="game-card">
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          tabIndex="-1"
          style={{ display: showModal ? 'block' : 'none' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {children}
                {/* 規則開始 */}
                {/* <div className="level-text">第一關</div>
                <div className="rule-group">
                  <div className="point-text">時間限制:60秒</div>
                  <div className="score-text">通關分數:1000</div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  挑戰開始
                </button> */}
                {/* 規則結束 */}
                {/* 挑戰成功開始 */}
                {/* <div className="level-text">第一關挑戰成功</div>
                <FaRegCheckSquare className="fa-success" />

                <div className="rule-group">
                  <div className="point-text">獲得點數:10點</div>
                </div>
                <div className="buttons">
                  <button type="button" className="btn btn-outline-primary">
                    回遊戲首頁
                  </button>
                  <button type="button" className="btn btn-primary">
                    前往下一關
                  </button>
                </div> */}
                {/* 挑戰成功結束 */}
                {/* 挑戰失敗開始 */}
                {/* <div className="level-text">第一關挑戰失敗</div>
                <FaRegWindowClose className="fa-fail" />

                <div className="rule-group">
                  <div className="point-text">挑戰失敗了......</div>
                </div>
                <div className="buttons">
                  <button type="button" className="btn btn-outline-primary">
                    回遊戲首頁
                  </button>
                  <button type="button" className="btn btn-primary">
                    再挑戰一次
                  </button>
                </div> */}
                {/* 挑戰失敗結束 */}
                {/* <div className="chara-group">
                  <div className="talk-group">
                    <div class="triangle"></div>
                    <div className="talk">
                      呼～總算把這些氣球全部射下來了！
                      <br />
                      雖然只是從遙遠的垃圾變成近一點的垃圾......
                    </div>
                  </div>
                  <div className="character">
                    {' '}
                    <img
                      src="/images/game/cha01.png"
                      className="character-obj"
                      alt="..."
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

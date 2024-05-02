import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare, FaRegWindowClose } from 'react-icons/fa'

export default function GameRule({
  levelName,
  time,
  clear,
  status,
  score,
  onClose,
  onStartGame, // 新增的 prop，用於開始遊戲
  showModal,
  setShowModal,
}) {
  // useEffect(() => {
  //   setShowModal(true)
  // }, [status])

  const handleClose = () => {
    setShowModal(false)
    // onClose()
  }

  let content
  if (status === 'rule') {
    content = (
      <>
        {/* 規則開始 */}
        <div className="level-text">{levelName}通關規則</div>
        <div className="rule-group">
          <div className="point-text">時間限制 : {time} 秒</div>
          <div className="score-text">通關分數 : {clear}</div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-dismiss="modal"
          onClick={onStartGame}
        >
          挑戰開始
        </button>
        {/* 規則結束 */}
        <div className="chara-group">
          <div className="talk-group">
            <div className="triangle"></div>
            <div className="talk">
              不好啦！
              <br />
              氣球飛上天空了！
              <br />
              這才不是普通的射氣球！！
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
        </div>
      </>
    )
  } else if (status === 'success') {
    content = (
      <>
        {/* 挑戰成功開始 */}
        <div className="level-text">{levelName}挑戰成功</div>
        <FaRegCheckSquare className="fa-success" />

        <div className="rule-group">
          <div className="point-text">獲得點數:10點{score}</div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-primary">
            回遊戲首頁
          </button>
          <button type="button" className="btn btn-primary">
            前往下一關
          </button>
        </div>
        {/* 挑戰成功結束 */}
        <div className="chara-group">
          <div className="talk-group">
            <div className="triangle"></div>
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
        </div>
      </>
    )
  } else if (status === 'success2') {
    content = (
      <>
        {/* 挑戰成功開始 */}
        <div className="level-text">
          {levelName}挑戰成功
          <div className="clear-text">
            恭喜全數通關！挑戰更多成就吧！
          </div>
        </div>

        <FaRegCheckSquare className="fa-success" />

        <div className="rule-group">
          <div className="point-text">獲得點數:10點{score}</div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-primary">
            回遊戲首頁
          </button>
        </div>
        {/* 挑戰成功結束 */}
        <div className="chara-group">
          <div className="talk-group">
            <div className="triangle"></div>
            <div className="talk">
              好累啊.....終於走到這了！
              <br />
              接下來還要再繼續喔！
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
        </div>
      </>
    )
  } else if (status === 'failure') {
    content = (
      <>
        {/* 挑戰失敗開始 */}
        <div className="level-text">{levelName}挑戰失敗</div>
        <FaRegWindowClose className="fa-fail" />

        <div className="rule-group">
          <div className="point-text">挑戰失敗了......{score}點</div>
        </div>
        <div className="buttons">
          <button type="button" className="btn btn-outline-primary">
            回遊戲首頁
          </button>
          <button type="button" className="btn btn-primary">
            再挑戰一次
          </button>
        </div>
        {/* 挑戰失敗結束 */}
        <div className="chara-group">
          <div className="talk-group">
            <div className="triangle"></div>
            <div className="talk">
              嗚哇......
              <br />
              那些氣球會飄到哪裡呢......
              <br />
              完全是環境污染的垃圾啊......
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
        </div>
      </>
    )
  }

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
                  onClick={handleClose}
                />
              </div>
              <div className="modal-body">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

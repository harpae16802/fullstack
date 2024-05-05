import React, { useEffect, useState } from 'react'
import { FaRegCheckSquare, FaRegWindowClose } from 'react-icons/fa'
import Link from 'next/link'

export default function GameRule({
  levelName,
  time,
  clear,
  status,
  score,
  getPoint,
  onStartGame, // 新增的 prop，用於開始遊戲
  onGoToNextLevel, // 新增的前往下一关事件处理函数
  onRetryLevel, // 新增的再次挑战事件处理函数
  showModal,
  setShowModal,
}) {


  const handleClose = () => {
    setShowModal(false)
  }

  let characterTalk = ''
  if (levelName === '第一關') {
    characterTalk = (
      <>
        不好啦！
        <br />
        氣球飛上天空了！
        <br />
        這才不是普通的射氣球！！
      </>
    )
  } else if (levelName === '第五關') {
    characterTalk = (
      <>
        這次應該是最後一次了吧？
        <br />
        之後又來的話......
        <br />
        我就要報警啦！
      </>
    )
  } else {
    characterTalk = (
      <>
        又來了！？
        <br />
        你們到底要弄飛幾次氣球啊！
        <br />
        我要上了！
      </>
    )
  }

  let content
  if (status === 'rule') {
    content = (
      <>
        {/* 規則開始 */}
        <div className="level-text">{levelName}通關規則</div>
        <div className="rule-group">
          <div className="point-text">時間限制 : {time}秒</div>
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
            <div className="talk">{characterTalk}</div>
          </div>
          <div className="character">
            {' '}
            <img
              src="/images/game/cha07.png"
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
          <div className="point-text">獲得點數:{getPoint}點</div>
        </div>
        <div className="buttons">
          <Link type="button" className="btn btn-outline-primary" href={'/game/game-select'}>
            回遊戲首頁
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onGoToNextLevel}
          >
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
              src="/images/game/cha04.png"
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
          <div className="clear-text">恭喜全數通關！挑戰更多成就吧！</div>
        </div>

        <FaRegCheckSquare className="fa-success" />

        <div className="rule-group">
          <div className="point-text">獲得點數:{getPoint}點</div>
        </div>
        <div className="buttons">
          <Link type="button" className="btn btn-primary" href={'/game/game-select'}>
            回遊戲首頁
          </Link>
        </div>
        {/* 挑戰成功結束 */}
        <div className="chara-group">
          <div className="talk-group">
            <div className="triangle"></div>
            <div className="talk">
              好累啊.....
              <br />
              終於走到這了！
              <br />
              好啦！之後又發生就儘管找我！
            </div>
          </div>
          <div className="character">
            {' '}
            <img
              src="/images/game/cha06.png"
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
          <div className="point-text">挑戰失敗了......</div>
        </div>
        <div className="buttons">
          <Link type="button" className="btn btn-outline-primary" href={'/game/game-select'}>
            回遊戲首頁
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onRetryLevel}
          >
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
              src="/images/game/cha05.png"
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
              </div>
              <div className="modal-body">{content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

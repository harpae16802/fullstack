import React, { useState, useEffect, useRef } from 'react';


const BalloonShooterGame = () => {
  const gameContainerRef = useRef(null);
  // 初始化狀態
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(30)
  const [level, setLevel] = useState(1)
  const [gameInterval, setGameInterval] = useState(null)

  // 關卡條件
  const levelConfigs = [
    { level: 1, levelName: '第一關', time: 20, speed: 3, clear: 1000 },
    { level: 2, levelName: '第二關', time: 20, speed: 2.5, clear: 3000 },
    { level: 3, levelName: '第三關', time: 15, speed: 2, clear: 2000 },
    { level: 4, levelName: '第四關', time: 15, speed: 1.5, clear: 3000 },
    { level: 5, levelName: '第五關', time: 10, speed: 1.5, clear: 200 },
  ]

  // 氣球的設定
  const balloonConfigs = [
    { color: 'green', name: '10', points: 10 },
    { color: 'blue', name: '30', points: 30 },
    { color: 'red', name: '50', points: 50 },
    { color: 'orange', name: '0', points: '0' },
    { color: 'purple', name: 'x2', points: 'x2' },
  ]

  // 開始遊戲
  const startGame = (level) => {
    // 清除之前的遊戲間隔
    clearInterval(gameInterval)

    // 根據關卡設定設置遊戲
    const levelConfig = levelConfigs.find((config) => config.level === level)
    setScore(0)
    setTimer(levelConfig.time)
    setLevel(level)

    const balloonInterval = level >= 4 ? 400 : 600

    // 設置遊戲間隔
    const interval = setInterval(() => {
      createBalloon(levelConfig.speed)
    }, balloonInterval)
    setGameInterval(interval)

    // 更新計時器
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)

    // 檢查遊戲是否結束
    setTimeout(() => {
      clearInterval(countdown)
      clearInterval(gameInterval)
      checkGameResult(levelConfig)
    }, levelConfig.time * 1000)
  }

  // 檢查遊戲結果
  const checkGameResult = (levelConfig) => {
    const nextLevel = level + 1
    if (score >= levelConfig.clear && level < 5) {
      const retry = window.confirm(
        `恭喜你${levelConfig.levelName}通關成功! 你的分數是 ${score}，要挑戰下一關嗎？`
      )
      if (retry) {
        startGame(nextLevel)
      }
    } else if (score < levelConfig.clear || level === 5) {
      const message =
        level === 5
          ? `恭喜你${levelConfig.levelName}通關成功! 你的分數是 ${score}。全數通關！`
          : `${levelConfig.levelName}通關失敗......你的分數是${score}，要繼續挑戰嗎？`
      window.confirm(message)
    }
  }

  // 創建氣球
  const createBalloon = (speed) => {
    const numBalloons = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numBalloons; i++) {
      const balloonConfig = chooseBalloonConfig()
      const balloon = document.createElement('div')
      const balloonimg = document.createElement('div')
      balloon.classList.add('balloon')
      balloon.style.left = `${Math.random() * (gameContainerRef.current.offsetWidth - 77)}px`
      balloon.style.animation = `moveUp ${speed}s linear forwards`
      const points = balloonConfig.points
      balloon.dataset.points = points
      balloon.addEventListener('click', () => {
        popBalloon(balloon)
      })
      balloonimg.classList.add('balloonimg')
      const name = balloonConfig.name
      balloonimg.textContent = name
      const imageUrl =`url('/images/game/${balloonConfig.color}.png')`;
      balloonimg.style.backgroundImage = imageUrl
      balloon.appendChild(balloonimg)
      document.getElementById('game-container').appendChild(balloon)
      setTimeout(() => {
        if (balloon.parentNode === document.getElementById('game-container')) {
          balloon.remove()
          updateScore(0)
        }
      }, 5000)
    }
  }

  // 選擇氣球配置
  const chooseBalloonConfig = () => {
    const randomNumber = Math.random()
    if (randomNumber < 0.3) {
      return balloonConfigs[0]
    } else if (randomNumber < 0.6) {
      return balloonConfigs[1]
    } else if (randomNumber < 0.77) {
      return balloonConfigs[2]
    } else if (randomNumber < 0.92) {
      return balloonConfigs[3]
    } else {
      return balloonConfigs[4]
    }
  }

  // 點擊氣球
  const popBalloon = (balloon) => {
    const points = parseInt(balloon.dataset.points)
    const balloonName = balloon.textContent
    balloon.remove()
    updateScore(points, balloonName)
  }

  // 更新分數
  const updateScore = (points, balloonName) => {
    setScore((prevScore) => {
      if (balloonName === '0') {
        return 0
      } else if (balloonName === 'x2') {
        return prevScore * 2
      } else {
        return prevScore + points
      }
    })
  }
  useEffect(() => {
    startGame(1);
  }, []);

  return (

      <div className="game-play-page">
        {/* <QrcodeCurrent /> */}
        {/* <GameRule /> */}
        {/* <div className="black-mode black-show"></div> */}
        <div className="game-main">
          <div className="time-table">
            <div id="level" className="level">{`第${level}關`}</div>

            <div className="table-bottom">
              <div className="time-group">
                <div className="time-text">剩餘時間</div>
                <div id="timer" className="game-seconds">{`00:${timer
                  .toString()
                  .padStart(2, '0')}`}</div>
              </div>
              <div className="point-group">
                <div className="point-text">累積分數</div>
                <div id="score" className="game-point">
                  {score.toString().padStart(5, '0')}
                </div>
              </div>
            </div>
          </div>
          <div className="play-div ">
            <div className="balloon-play" id="game-container" ref={gameContainerRef}>
            </div>
          </div>
        </div>

        {/* <div className="chara-group">
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
        </div> */}
      </div>
  )
}

export default BalloonShooterGame

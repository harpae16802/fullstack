import React, { useState, useEffect, useRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import GameRule from '@/components/modal/game-rule'
// import { useSelectedLevel } from '@/contexts/LevelContext'; // 引入剛剛創建的上下文

const BalloonShooterGame = () => {
  const gameContainerRef = useRef(null)
  const timerRef = useRef(null)
  const gameIntervalRef = useRef(null)

  // 初始化狀態
  // const { selectedLevel } = useSelectedLevel();
  const [myScore, setScore] = useState(0)
  const [timer, setTimer] = useState(30)
  const [level, setLevel] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [gameStatus, setGameStatus] = useState('rule') // 初始為顯示遊戲規則

  const [currentLevelInfo, setCurrentLevelInfo] = useState({
    levelName: '',
    time: 0,
    clear: 0,
  })

  // 關卡條件
  const levelConfigs = [
    { level: 1, levelName: '第一關', time: 10, speed: 3, clear: 100 },
    { level: 2, levelName: '第二關', time: 20, speed: 2.5, clear: 3000 },
    { level: 3, levelName: '第三關', time: 15, speed: 2, clear: 2000 },
    { level: 4, levelName: '第四關', time: 15, speed: 1.5, clear: 3000 },
    { level: 5, levelName: '第五關', time: 10, speed: 1.5, clear: 2000 },
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
    clearInterval(gameIntervalRef.current)
    clearInterval(timerRef.current)

    // 根據關卡設定設置遊戲
    const levelConfig = levelConfigs.find((config) => config.level === level)
    setCurrentLevelInfo(levelConfig)
    setScore(0)
    setTimer(levelConfig.time)
    setLevel(level)

    const balloonInterval = level >= 4 ? 400 : 600

    // 設置遊戲間隔
    const interval = setInterval(() => {
      createBalloon(levelConfig.speed)
    }, balloonInterval)
    gameIntervalRef.current = interval

    // 更新計時器
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1)
    }, 1000)
    timerRef.current = countdown

    // 檢查遊戲是否結束
    setTimeout(() => {
      clearInterval(timerRef.current)
      clearInterval(gameIntervalRef.current)
      let mmScore = 0;
      setScore(old=>{
        console.log({old});
        mmScore = old;
        return old;
      })
      console.log({myScore, setScore});
      console.log({mmScore});
      checkGameResult(levelConfig, mmScore)
    }, levelConfig.time * 1000)
  }
  useEffect(() => {
    setShowModal(true)
  }, [])

  // useEffect(() => {
  //   if (!showModal) {
  //     startGame(1)
  //   }

  //   return () => {
  //     clearInterval(timerRef.current)
  //     clearInterval(gameIntervalRef.current)
  //   }
  // }, [showModal])

  const checkGameResult = (levelConfig, myScore) => {
    console.log({ levelConfig, level, myScore })
    if (myScore >= levelConfig.clear && level < 5) {
      setGameStatus('success') // 通關成功
      setShowModal(true)
    } else if (myScore > levelConfig.clear && level === 5) {
      setGameStatus('success') // 通關成功
      setShowModal(true)
    } else {
      setGameStatus('failure') // 通關失敗
      setShowModal(true)
    }
  }
  //監聽分數和 modal 狀態的變化

  // useEffect(() => {
  //   // 檢查遊戲是否結束
  //   const levelConfig = levelConfigs.find((config) => config.level === level)
  //   if (myScore >= levelConfig.clear && level < 5) {
  //     setGameStatus('success') // 通關成功
  //     setShowModal(true)
  //   } else if (myScore < levelConfig.clear && level === 5) {
  //     setGameStatus('success') // 通關成功
  //     setShowModal(true)
  //   } else if (myScore < levelConfig.clear && level === 5) {
  //     setGameStatus('failure') // 通關失敗
  //     setShowModal(true)
  //   }
  // }, [myScore, level])

  // 創建氣球
  const createBalloon = (speed) => {
    const numBalloons = Math.floor(Math.random() * 3) + 1
    for (let i = 0; i < numBalloons; i++) {
      const balloonConfig = chooseBalloonConfig()
      const balloon = document.createElement('div')
      const balloonimg = document.createElement('div')
      balloon.classList.add('balloon')
      balloon.style.left = `${
        Math.random() * (gameContainerRef.current.offsetWidth - 77)
      }px`
      balloon.style.animation = `moveUp ${speed}s linear forwards`
      const points = balloonConfig.points
      balloon.dataset.points = points
      balloon.addEventListener('click', () => {
        popBalloon(balloon)
      })
      balloonimg.classList.add('balloonimg')
      const name = balloonConfig.name
      balloonimg.textContent = name
      const imageUrl = `url('/images/game/${balloonConfig.color}.png')`
      balloonimg.style.backgroundImage = imageUrl
      balloon.appendChild(balloonimg)
      gameContainerRef.current.appendChild(balloon)
      setTimeout(() => {
        if (balloon.parentNode === gameContainerRef.current) {
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
      console.log({ prevScore })
      if (balloonName === '0') {
        return 0
      } else if (balloonName === 'x2') {
        return prevScore * 2
      } else {
        return prevScore + points
      }
    })
  }

  // 當點擊規則模态框上的開始遊戲按鈕時
  const handleStartGame = () => {
    setShowModal(false) // 關閉規則模态框
    startGame(level) // 開始遊戲
  }

  return (
    <div className="game-play-page">
      <div className="game-main">
        <div className="time-table">
          <div
            id="level"
            className="level"
          >{`${currentLevelInfo.levelName}`}</div>
          <div className="table-bottom">
            <div className="time-group">
              <div className="time-text">剩餘時間</div>
              <div id="timer" className="game-seconds">{`00:${timer
                .toString()
                .padStart(2, '0')}`}</div>
            </div>
            <div className="point-group">
              <div className="point-text">累積分數</div>
              <div className="game-point">
                {myScore.toString().padStart(5, '0')}
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <GameRule
            status={gameStatus}
            levelName={currentLevelInfo.levelName}
            time={currentLevelInfo.time}
            clear={currentLevelInfo.clear}
            score={currentLevelInfo.myScore}
            onClose={() => setShowModal(false)}
            onStartGame={handleStartGame}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        <div className="play-div ">
          <div className="balloon-play" ref={gameContainerRef}></div>
        </div>
      </div>
    </div>
  )
}

export default BalloonShooterGame

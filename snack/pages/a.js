import React, { useState, useEffect } from 'react';


function App() {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      clearInterval(timer);
      alert("Time's up! Your final score is: " + score);
    }
  }, [time]);

  const handleBalloonClick = (index, points) => {
    if (!balloons[index].clicked) { // 只有當氣球還沒被點擊過時才計分
      setScore(prevScore => prevScore + points);
      const updatedBalloons = [...balloons];
      updatedBalloons[index].clicked = true; // 標記這個氣球已經被點擊過
      setBalloons(updatedBalloons.filter(balloon => !balloon.clicked)); // 移除被點擊的氣球
    }
  };

  const generateBalloons = () => {
    const newBalloons = [];
    for (let i = 0; i < 5; i++) {
      let points;
      switch (i) {
        case 0:
          points = 10;
          break;
        case 1:
          points = 30;
          break;
        case 2:
          points = 50;
          break;
        case 3:
          points = 0;
          break;
        case 4:
          points = 2;
          break;
        default:
          points = 10;
      }
      const speed = Math.random() * 5 + 1; // 1到5之間的速度
      const position = Math.random() * 80; // 80% 的垂直位置
      newBalloons.push({ id: i, points, speed, position, clicked: false });
    }
    setBalloons(newBalloons);
  };

  useEffect(() => {
    const balloonGenerator = setInterval(() => {
      generateBalloons();
    }, 2000);

    return () => clearInterval(balloonGenerator);
  }, []);

  return (
    <div className="App">
      <h1>Balloon Shooter</h1>
      <div>Score: {score}</div>
      <div>Time: {time}</div>
      <div className="balloon-container">
        {balloons.map(balloon => (
          <div
            key={balloon.id}
            className={`balloon ${balloon.exploded ? 'exploded' : ''}`}
            onClick={() => handleBalloonClick(balloon.id, balloon.points)}
            style={{
              bottom: `${balloon.position}%`,
              animation: `balloonFloat ${10 / balloon.speed}s linear infinite`,
              // 根據氣球速度設置動畫時間
            }}
          >
            {balloon.points}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

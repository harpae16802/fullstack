import React from 'react';

const Balloon = ({ balloonConfig, createBalloon, popBalloon }) => {
  const handleClick = () => {
    popBalloon(balloonConfig.points);
  };

  return (
    <div
      className="balloon"
      style={{
        left: `${Math.random() * 100}%`, // 隨機水平位置
        animationDuration: `${balloonConfig.speed}s`, // 動畫速度
        backgroundImage: `url('/images/game/${balloonConfig.color}.png')`, // 氣球圖片
      }}
      onClick={handleClick}
    >
      {balloonConfig.name}
    </div>
  );
};

export default Balloon;

import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
const PasswordToggle = ({ name, value, onChange }) => {
  const [passwordShown, setPasswordShown] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown)
  }

  // 定義根據視窗寬度調整眼睛位置的函數
  const calculateEyePosition = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1220) {
      return '90%'; // 寬度大於等於1220px時的位置
    } else if (windowWidth >= 1000) {
      return '85%'; // 寬度大於等於1000px時的位置
    } else {
      return '80%'; // 其他情況下的位置
    }
  }

  // 在組件加載時和窗口大小變化時更新眼睛位置
  useEffect(() => {
    const updateEyePosition = () => {
      const eyePosition = calculateEyePosition();
      const eyeElement = document.querySelector('.icon-toggle');
      if (eyeElement) {
        eyeElement.style.left = eyePosition;
      }
    }
    window.addEventListener('resize', updateEyePosition);
    updateEyePosition(); // 初始化
    return () => {
      window.removeEventListener('resize', updateEyePosition);
    };
  }, []);

  return (
    <div className="position-relative">
      <input
        type={passwordShown ? 'text' : 'password'}
        className="form-control col-6"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder="至少包含英文和數字，長度不少於8位數"
      />
      <i
        className="icon-toggle col-6"
        onClick={togglePasswordVisibility}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: '2',
        }}
      >
        {passwordShown ? <FaEyeSlash /> : <FaEye />}
      </i>
    </div>
  )
}

export default PasswordToggle

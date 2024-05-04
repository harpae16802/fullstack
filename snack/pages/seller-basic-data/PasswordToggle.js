import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function PasswordToggle() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    // 定义样式基于屏幕宽度
    const iconStyle = {
        position: 'absolute',
        top: '265px',
        left: windowWidth > 768 ? '150px' : '100px', // 举例：在窗口宽度大于768px时使用150px，否则使用100px
        transform: 'translateY(-50%)',
        fontSize: '30px',
        cursor: 'pointer',
        zIndex: '2',
    };

    return (
        <i
            className="icon-toggle col-6"
            onClick={togglePasswordVisibility}
            style={iconStyle}
        >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
        </i>
    );
}

export default PasswordToggle;

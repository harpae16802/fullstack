import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const accountRef = useRef('');
  const passwordRef = useRef('');
  const confirmPasswordRef = useRef('');
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [accountError, setAccountError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

  const phonePattern = /^09\d{8}$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const account = accountRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    let isValid = true;

    if (!phonePattern.test(account)) {
        setAccountError('帳號必須是有效的手機號碼');
        isValid = false;
      } else {
        setAccountError('');
      }
  
      // 验证密码
      if (!passwordPattern.test(password)) {
        setPasswordError('密碼必須是6到16位，且包含英文與數字');
        isValid = false;
      } else {
        setPasswordError('');
      }
  
      // 验证确认密码
      if (password !== confirmPassword )  {
        setConfirmPasswordError('兩次輸入的密碼不一致');
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
  
      if (!isValid) {
        setLoading(false);
        return;
      }

    try {
      const response = await axios.post(
        'http://localhost:3002/auth/register',
        { account, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        localStorage.setItem('sellerId', response.data.sellerId);  // Assuming sellerId is returned
        setShowSuccessModal(true);
        onSuccess && onSuccess();
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('註冊錯誤', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="account" className="form-label">帳號:</label>
        <input
          type="text"
          id="account"
          className={`form-control ${accountError ? 'is-invalid' : ''}`}
          ref={accountRef}
          
        />
        {accountError && <div className="invalid-feedback">{accountError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">密碼:</label>
        <input
          type="password"
          id="password"
          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
          ref={passwordRef}
        />
        {/* <FaEyeSlash onClick={togglePasswordVisibility} className={`eye-icon ${passwordVisibility ? '' : 'show'}`}/> */}
        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">再次確認密碼:</label>
        <input
          type="password"
          id="confirmPassword"
          className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
          ref={confirmPasswordRef}
          
        />
        {/* <FaEyeSlash onClick={toggleConfirmPasswordVisibility} className={`eye-icon ${confirmPasswordVisibility ? 'show' : ''}`}/> */}
        {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}   
        </div>
      <button type="submit" className="btn btn-primary mt-4 mb-4" disabled={loading}>
        註冊
      </button>
      {loading && <div>Loading...</div>}

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>註冊成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        註冊成功
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>註冊失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         請檢察網路狀態，或稍後再試
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default RegisterForm;

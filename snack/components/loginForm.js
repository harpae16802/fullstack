// export default LoginForm
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSeller } from '@/contexts/SellerContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const accountRef = useRef('');
  const passwordRef = useRef('');
  const router = useRouter();
  const { setSeller } = useSeller();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);  

  const phonePattern = /^09\d{8}$/;
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const account = accountRef.current.value;
    const password = passwordRef.current.value;
    let isValid = true;

    if (!phonePattern.test(account)) {
      setAccountError('帳號必須是有效的手機號碼');
      isValid = false;
    } else {
      setAccountError(false);
    }

    if (!passwordPattern.test(password)) {
      setPasswordError('密碼必須是6到16位，且包含英文與數字');
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!isValid) {
      setLoading(false);
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/auth/login',
        { account, password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.success) {
        localStorage.setItem('sellerId', response.data.sellerId);
        setSeller({ id: response.data.sellerId, isLoggedIn: true });
        setShowSuccessModal(true);
        onSuccess();
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('登入错误', error);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(prev => ({
      ...prev,
      password: !prev.password
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="account" className="form-label">
          帳號:
        </label>
        <input
          type="text"
          id="account"
          className={`form-control ${accountError ? 'is-invalid' : ''}`}
          ref={accountRef}
          
        /> {accountError && <div className="invalid-feedback">{accountError}</div>}
      </div>
      <div className="mb-3 pswinput">
        <label htmlFor="password" className="form-label">
          密碼:
        </label>
        <input
          type={passwordVisibility.password ? 'text' : 'password'}
          id="password"
          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
          ref={passwordRef}
          
        />
        <div className="password-eye" onClick={togglePasswordVisibility}>
          {passwordVisibility.password ? <FaEyeSlash /> : <FaEye />}
        </div>
        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
      </div>
      <button type="submit" className="btn btn-primary mt-4 mb-4" disabled={loading}>
        登入
      </button>
      {loading && <div>Loading...</div>}

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>登入成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        登入成功
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>登入失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          帳號或密碼錯誤請稍後再試
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

export default LoginForm;

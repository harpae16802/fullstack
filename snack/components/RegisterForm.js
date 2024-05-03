import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSeller } from '@/contexts/SellerContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap'

const RegisterForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const accountRef = useRef('')
  const passwordRef = useRef('')
  const confirmPasswordRef = useRef('')
  const router = useRouter()
  const { setSeller } = useSeller()

  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [accountError, setAccountError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(false)
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] =
    useState(false)

  const phonePattern = /^09\d{8}$/
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,16}$/

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('account', accountRef.current.value)
    formData.append('password', passwordRef.current.value)
    formData.append('confirmPassword', confirmPasswordRef.current.value)
    let isValid = true

    if (!phonePattern.test(accountRef.current.value)) {
      setAccountError('帳號必須是有效的手機號碼')
      isValid = false
    } else {
      setAccountError(false)
    }

    if (!passwordPattern.test(passwordRef.current.value)) {
      setPasswordError('密碼必須是6到16位，且包含英文與數字')
      isValid = false
    } else {
      setPasswordError(false)
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setConfirmPasswordError('密碼與確認密碼不相符')
      isValid = false
    } else {
      setConfirmPasswordError(false)
    }

    if (!isValid) {
      setLoading(false)
      setShowErrorModal(true)
      return
    }

    try {
      const response = await axios.post(
        'http://localhost:3002/auth/register',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      if (response.data.success) {
        localStorage.setItem('sellerId', response.data.sellerId);
        setSeller({ id: response.data.sellerId, isLoggedIn: true })
        setShowSuccessModal(true)
        onSuccess()
      } else {
        console.log(1)
        setShowErrorModal(true)
      }
    } catch (error) {
      console.error('註冊錯誤', error)
      if (error.response && error.response.status === 400) {
        setShowAlreadyRegisteredModal(true)
        console.log(2)
      } else {
        console.log(3)
        setShowErrorModal(true)
      }
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prev) => !prev)
  }

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
        />{' '}
        {accountError && <div className="invalid-feedback">{accountError}</div>}
      </div>
      <div className="mb-3 pswinput">
        <label htmlFor="password" className="form-label">
          密碼:
        </label>
        <input
          type={passwordVisibility ? 'text' : 'password'}
          id="password"
          className={`form-control ${passwordError ? 'is-invalid' : ''}`}
          ref={passwordRef}
        />
        <div className="password-eye" onClick={togglePasswordVisibility}>
          {passwordVisibility ? <FaEyeSlash /> : <FaEye />}
        </div>
        {passwordError && (
          <div className="invalid-feedback">{passwordError}</div>
        )}
      </div>
      <div className="mb-3 pswinput">
        <label htmlFor="confirmPassword" className="form-label">
          確認密碼:
        </label>
        <input
          type={confirmPasswordVisibility ? 'text' : 'password'}
          id="confirmPassword"
          className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
          ref={confirmPasswordRef}
        />
        <div className="password-eye" onClick={toggleConfirmPasswordVisibility}>
          {confirmPasswordVisibility ? <FaEyeSlash /> : <FaEye />}
        </div>
        {confirmPasswordError && (
          <div className="invalid-feedback">{confirmPasswordError}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 mb-4"
        disabled={loading}
      >
        註冊
      </button>
      {loading && <div>Loading...</div>}

      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>註冊成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>註冊成功</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>註冊失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>註冊失敗，請稍後再試</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showAlreadyRegisteredModal}
        onHide={() => setShowAlreadyRegisteredModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>註冊失敗</Modal.Title>
        </Modal.Header>
        <Modal.Body>帳號已經註冊過，請使用其他帳號註冊。</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAlreadyRegisteredModal(false)}
          >
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  )
}

export default RegisterForm

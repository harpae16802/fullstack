// components/LoginForm.js
import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSeller } from '@/contexts/SellerContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const LoginForm = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const accountRef = useRef('')
  const passwordRef = useRef('')
  const router = useRouter()
  const { setSeller } = useSeller()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('account', accountRef.current.value)
    formData.append('password', passwordRef.current.value)

    try {
      const response = await axios.post(
        'http://localhost:3002/auth/login',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      if (response.data.success) {
        localStorage.setItem('sellerId', response.data.sellerId)
        setSeller({ id: response.data.sellerId, isLoggedIn: true })
        setLoading(false)
        onSuccess() // Callback for successful login
      } else {
        setLoading(false)
        alert(response.data.message)
      }
    } catch (error) {
      setLoading(false)
      console.error('Login request failed', error)
      alert('Login failed')
    }
  }

  //眼睛
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  })

  // 切換指定密碼欄位的顯示狀態
  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [fieldName]: !passwordVisibility[fieldName],
    })
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
          className="form-control"
          ref={accountRef}
          required
        />
      </div>
      <div className="mb-3 pswinput">
        <label htmlFor="password" className="form-label">
          密碼:
        </label>
        <input
          type={passwordVisibility.password ? 'text' : 'password'}
          id="password"
          className="form-control"
          ref={passwordRef}
          required
        />
        <div
          className="password-eye"
          onClick={() => togglePasswordVisibility('password')}
        >
          {passwordVisibility.password ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-4 mb-4" disabled={loading}>
        登入
      </button>
      {loading && <div>Loading...</div>}
    </form>
  )
}

export default LoginForm

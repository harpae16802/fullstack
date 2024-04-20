// context/custom-context.js
import { createContext, useContext, useEffect, useState } from 'react'
import { JWT_LOGIN_POST } from '@/components/config/api-path'

const CustomContext = createContext()

// 保有登入的 "狀態": id, account, nickname, token
// login 功能
// logout 功能
// getAuthHeader()

// 預設的狀態, 沒有登入
const emptyAuth = {
  custom_id: 0,
  account: '',
  nickname: '',
  token: '',
}

// 設定 localStorage 的key
const storageKey = 'shinder-auth'

export function CustomContextProvider({ children }) {
  const [auth, setAuth] = useState(emptyAuth);

  // 登入的功能
  const login = async (account, password) => {
    const r = await fetch(JWT_LOGIN_POST, {
      method: 'POST',
      body: JSON.stringify({ account, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await r.json()

    //這裡的return的布林值會傳給login-quick
    if (result.success) {
      // 把 token 記錄在 localStorage
      localStorage.setItem(storageKey, JSON.stringify(result.data))

      setAuth(result.data)
      return true
    } else {
      return false
    }
  }
  // 登出的功能
  const logout = () => {
    //從localStorage移除
    localStorage.removeItem(storageKey)
    setAuth(emptyAuth)
  }

  //加最愛的功能,傳送getAuthHeader
  const getAuthHeader = () => {
    if (auth.token) {
      return { Authorization: 'Bearer ' + auth.token }
    } else {
      return {}
    }
  }

  //處理重整後葉面直接登出,由 localStorage 讀取登入狀態
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    try {
      const data = JSON.parse(str)
      if (data) {
        setAuth(data)
      }
    } catch (ex) {}
  }, [])

  return (
    // login & logout 是function 傳出的是promise
    <CustomContext.Provider value={{ auth, login, logout,storageKey }}>
      {children}
    </CustomContext.Provider>
  )
}

// 自訂的 hook
export const useAuth = () => useContext(CustomContext)

export default CustomContext

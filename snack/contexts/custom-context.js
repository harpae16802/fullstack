// context/custom-context.js
import { createContext, useContext, useEffect, useState } from 'react'
import useFirebase from '@/hooks/use-firebase'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

import { JWT_LOGIN_POST, GOOGLE_LOGIN_POST,GOOGLE_SIGN_POST } from '@/components/config/api-path'

const CustomContext = createContext()

// 保有登入的 "狀態": id, account, nickname, token
// login 功能
// logout 功能
// getAuthHeader()

// 預設的狀態, 沒有登入
const emptyAuth = {
  custom_id: 0,
  account: '',
  google_uid: '',
  token: '',
}

// 設定 localStorage 的key
const storageKey = 'Nightmarket-auth'

export function CustomContextProvider({ children }) {
  const router = useRouter()

  const [auth, setAuth] = useState(emptyAuth)

  // 解決Google的存localStorage的問題
  // const [isLoginByGoogle, setIsLoginByGoogle] = useState(false)
  

  //loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { logoutFirebase, loginGoogleRedirect, initApp, loginGoogle } =
    useFirebase()
    

  // // google登入功能
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)
    // 清除 localStorage
    localStorage.removeItem(storageKey)

    // 最後檢查完全沒問題才送到伺服器(ajax/fetch)
    const res = await fetch(GOOGLE_LOGIN_POST, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(providerData),
    })

    const result = await res.json()

    if (result.success) {
      // 標記 Google 已登入
      // setIsLoginByGoogle(true)
      // 把 token 記錄在 localStorage
      localStorage.setItem(storageKey, JSON.stringify(result.data))
      setAuth(result.data)

      toast.success('歡迎您！登入成功', {
        style: {
          color: '#a32c2d',
        },
        iconTheme: {
          primary: '#29a21e',
          secondary: '#ffffff',
        },
      })

      setTimeout(() => {
        router.push('/')
      }, 2000)
      return true
    } else {
      return false
    }
  } //callback



  // 登入的功能
  const login = async (account, password) => {
  
    // 清除 localStorage
    localStorage.removeItem(storageKey)
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
    logoutFirebase()
    
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

  //處理重整後頁面直接登出,由 localStorage 讀取登入狀態
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    try {
      const data = JSON.parse(str)
      console.log(data)
      if (data) {
        setAuth(data)
      }
    } catch (ex) {}
  }, [])

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  // useEffect(() => {
  //   initApp(callbackGoogleLoginRedirect,)
  // }, [])

  return (
    // login & logout 是function 傳出的是promise
    <CustomContext.Provider
      value={{
        auth,
        login,
        logout,
        storageKey,
        getAuthHeader,
        callbackGoogleLoginRedirect,
        
      }}
    >
      {children}
    </CustomContext.Provider>
  )
}

// 自訂的 hook
export const useAuth = () => useContext(CustomContext)

export default CustomContext

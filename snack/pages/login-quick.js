import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { useAuth } from '@/contexts/custom-context'
import Link from 'next/link'
import Section from '@/components/layout/section'

export default function PageA() {
  const { auth, login, logout } = useAuth()
  return (
    <Section>
      <ul className="navbar-nav mb-2 mb-lg-0">
        {auth.custom_id ? (
          <>
            <li className="nav-item">
              <a className="nav-link">{auth.nickname}</a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                }}
              >
                登出
              </a>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className="nav-link" href="/login-quick">
                快速登入
              </Link>
            </li>
          </>
        )}
      </ul>
      <button
        onClick={() => {
          login('luki@gg.com', '234567').then((result) => {
            if (result) {
              alert('登入成功')
            } else {
              alert('失敗')
            }
          })
        }}
      >
        快速登入 luki@gg.com
      </button>
      <hr />
      <button
        onClick={() => {
          login('ming@gg.com', '123456').then((result) => {
            if (result) {
              alert('登入成功')
            } else {
              alert('失敗')
            }
          })
        }}
      >
        快速登入 ming@gg.com
      </button>
      <br />
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Section>
  )
}

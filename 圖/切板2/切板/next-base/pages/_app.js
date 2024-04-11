import { useEffect } from 'react'
import '@/styles/globals.scss'
import DefaultLayout from '@/components/layout/default-layout'
import MainLayout from '@/components/layout/main-layout'
import '@/styles/index.scss'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`
  const getLayout =
    Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>)

  return getLayout(<Component {...pageProps} />)
}

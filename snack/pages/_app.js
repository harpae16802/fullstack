// _app.js

import 'bootstrap/dist/css/bootstrap.min.css'
import { SellerProvider } from '../contexts/SellerContext'
import { CustomContextProvider } from '@/contexts/custom-context'
import MainLayout from '@/components/layout/main-layout'
import AuthChecker from '../components/AuthChecker'
import { useEffect } from 'react'
import Sesson from '@/components/layout/section'
import '@/styles/globals.scss'
import '../styles/form.css';
import '@/styles/index.scss'
import '@/styles/login.scss'
import '@/styles/game.scss'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <MainLayout>
        <>{page}</>
      </MainLayout>
    ))

  return (
    <CustomContextProvider>
    <SellerProvider>
      <AuthChecker>

       {getLayout( <Component {...pageProps} />)}
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossorigin="anonymous"
        ></script>

      </AuthChecker>
    </SellerProvider>
    </CustomContextProvider>

  )
}

export default MyApp

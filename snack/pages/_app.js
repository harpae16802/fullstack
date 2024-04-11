// _app.js

import 'bootstrap/dist/css/bootstrap.min.css';
import { SellerProvider } from '../contexts/SellerContext';
import MainLayout from '@/components/layout/main-layout'
import AuthChecker from '../components/AuthChecker'
import { useEffect } from 'react'
import '@/styles/globals.scss'


function MyApp({ Component, pageProps }) {

  
  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')
  }, [])
  const getLayout =
  Component.getLayout || ((page) => <MainLayout>{page}</MainLayout>)


  return getLayout(

    <SellerProvider>
      <AuthChecker>
      <Component {...pageProps} />
      </AuthChecker>
    </SellerProvider>
  );
}

export default MyApp;

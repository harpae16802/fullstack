// _app.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { SellerProvider } from '../contexts/SellerContext'
import { CustomContextProvider } from '@/contexts/custom-context'
import { MiniloginProvider } from '@/contexts/minilogin-context'
import { LevelProvider } from '@/contexts/LevelContext'
import { MapProvider } from '@/contexts/mapContext'
import { PaymentProvider } from '../contexts/PaymentContext';
import MainLayout from '@/components/layout/main-layout'
import AuthChecker from '../components/AuthChecker'
import {NotifyProvider} from "@/data/context/use-notify"
import Loader from '../components/Loader';

import { ImgProvider } from '@/data/context/ImgContext'
import { QrcodeProvider } from '@/data/context/QrcodeContext'
import Sesson from '@/components/layout/section'

import '@/styles/globals.scss'
import '../styles/form.css'
import '@/styles/index.scss'
import '@/styles/login.scss'
import '@/styles/carousel.scss'
import '@/styles/game.scss'

function MyApp({ Component, pageProps }) {


  const [loading, setLoading] = useState(false);
  const router = useRouter();


  useEffect(() => {
    // 要document物件出現後才能導入 bootstrap的js函式庫
    import('bootstrap/dist/js/bootstrap')

    const handleStart = () => { setLoading(true); };
    const handleComplete = () => { setLoading(false); };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };


  }, [router])

  const getLayout =
    Component.getLayout ||
    ((page) => (
      <MainLayout>

        <>
        {loading && <Loader />}
        {page}
        </>
      </MainLayout>
    ))

  return (
    <PaymentProvider>
    <NotifyProvider>
    <ImgProvider>   
    <QrcodeProvider>
    <CustomContextProvider>
      <SellerProvider>
        <MapProvider>
          <AuthChecker>
            <MiniloginProvider>
              <LevelProvider>
                {getLayout(<Component {...pageProps} />)}
                {/* <script
             
                src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
                integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
                crossorigin="anonymous"
              ></script> */}
              </LevelProvider>
            </MiniloginProvider>
          </AuthChecker>
        </MapProvider>
      </SellerProvider>
    </CustomContextProvider>
    </QrcodeProvider>
    </ImgProvider>
    </NotifyProvider>
    </PaymentProvider>
  )
}

export default MyApp

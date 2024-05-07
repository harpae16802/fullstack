// _app.js
import 'bootstrap/dist/css/bootstrap.min.css'
import { CartProvider } from '@/contexts/cartContext'
import { ImgProvider } from '@/data/context/ImgContext'
import { SellerProvider } from '../contexts/SellerContext'
import { CustomContextProvider } from '@/contexts/custom-context'
import { MiniloginProvider } from '@/contexts/minilogin-context'
import { LevelProvider } from '@/contexts/LevelContext'
import { MapProvider } from '@/contexts/mapContext'
import { PaymentProvider } from '../contexts/PaymentContext'
import MainLayout from '@/components/layout/main-layout'
import AuthChecker from '../components/AuthChecker'
import { NotifyProvider } from '@/data/context/use-notify'
import { QrcodeProvider } from '@/data/context/QrcodeContext'
import Sesson from '@/components/layout/section'
import { useEffect } from 'react'
import '@/styles/globals.scss'
import '../styles/form.css'
// import '../styles/App.css'
import '@/styles/index.scss'
import '@/styles/loader.scss'
import '@/styles/login.scss'
import '@/styles/carousel.scss'
import '@/styles/game.scss'

// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'
// 自訂用載入動畫元件
import { HunterLoader } from '@/hooks/use-loader/components'
// ...

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
    // <LoaderProvider close={3} CustomLoader={HunterLoader}>
    <PaymentProvider>
      <NotifyProvider>
        <ImgProvider>
          <QrcodeProvider>
            <CustomContextProvider>
              <SellerProvider>
                <MapProvider>
                  <CartProvider>
                    <AuthChecker>
                      <MiniloginProvider>
                        <LevelProvider>
                          {getLayout(<Component {...pageProps} />)}
                        </LevelProvider>
                      </MiniloginProvider>
                    </AuthChecker>
                  </CartProvider>
                </MapProvider>
              </SellerProvider>
            </CustomContextProvider>
          </QrcodeProvider>
        </ImgProvider>
      </NotifyProvider>
    </PaymentProvider>
    // </LoaderProvider>
  )
}

export default MyApp

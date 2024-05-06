// _app.js

import 'bootstrap/dist/css/bootstrap.min.css'
import { SellerProvider } from '../contexts/SellerContext'
import { CustomContextProvider } from '@/contexts/custom-context'
import { MiniloginProvider } from '@/contexts/minilogin-context'
import { LevelProvider } from '@/contexts/LevelContext'
import { MapProvider } from '@/contexts/mapContext'
import MainLayout from '@/components/layout/main-layout'
import AuthChecker from '../components/AuthChecker'
import { useEffect } from 'react'
import Sesson from '@/components/layout/section'
import '@/styles/globals.scss'
import '../styles/form.css'
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
    <LoaderProvider close={3} CustomLoader={HunterLoader}>
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
    </LoaderProvider>
  )
}

export default MyApp

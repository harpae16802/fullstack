import Navbar from './navbar'
import NavbarLogout from './navbar-logout'
import NavbarCustom from './navbar-custom'
import NavbarSeller from './navbar-seller'
import Footer from './footer'

export default function DefaultLayout({ children }) {
  return (
    <>
      <NavbarSeller />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}

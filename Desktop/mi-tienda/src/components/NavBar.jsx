import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"
import logo from "../assets/img/download.png"

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo Mi Tienda" className="logo-img" />
        <span>Mi Tienda</span>
      </Link>

      <div className="nav-links">
        <Link to="/category/urbana">Urbano</Link>
        <Link to="/category/perfumeria">Accesorios</Link>
      </div>

      <CartWidget />
    </nav>
  )
}

export default NavBar
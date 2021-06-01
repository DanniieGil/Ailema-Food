import React, { useState } from 'react'
import './Navbar.css'


// * COMPONENTS & FUNCTIONS
import { Link } from 'react-router-dom'
import { SidebarData, setActive } from './SidebarData'

function Navbar() {

  // * STATE REACT COMPONENT
  const [toggle, setToggle] = useState(true)
  const [navbars, setNavbars] = useState(true)
  const [bodypd, setbodypd] = useState(true)

  const showSidebar = () => {
    setToggle(!toggle)
    setNavbars(!navbars)
    setbodypd(!bodypd)
  }

  // * EXPANDER CONTENT AND ACTIVE MENU
  const Expander = () => {
    var content = document.querySelector(".content");
    var expander = document.querySelector(".expander");
    if (!toggle) content.classList.add("expander")
    else if (expander) expander.classList.remove("expander")
  };

  Expander()
  setActive()

  return (
    <div className={bodypd ? '' : 'body-pd'}>
      {/* HEADER */}
      <header className={bodypd ? 'header' : 'header body-pd'} id="header">
        <Link to="#" className="header__toggle">
          <i className={toggle ? 'bx bx-menu' : 'bx bx-x'} onClick={showSidebar} id="toggle"></i>
        </Link>

        <div class="header__img">
         <Link to="/"><img src='https://ps.w.org/cooked/assets/icon-256x256.png?rev=2005204' alt="" /></Link> 
        </div>
      </header>

      {/* MENU */}
      <div className={navbars ? 'l-navbar' : 'l-navbar show'} id="nav-bar">
        <nav className="nav">
          <Link to="/" className="nav__link">
            <i className="bx bx-home nav__logo-icon"></i>
            <span className=" nav__logo-name">Home</span>
          </Link>
          <div>
            {SidebarData.map((item, index) => {
              return (
                <Link to={item.path} className="nav__link">
                  <i className={item.cName}></i>
                  <span className="nav__name">{item.title}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar

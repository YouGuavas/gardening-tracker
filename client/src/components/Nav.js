import {useState, useEffect} from 'react';
import '../styles/Nav.scss';


export function Nav(props) {

  const links = props.links;

  const [active, setActive] = useState('');

  const toggleMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu-main');
    const mobileBtn = document.getElementById('mobile-menu-button-main');
    mobileMenu.classList.toggle('change');
    mobileBtn.classList.toggle('change');
  }

  useEffect(function() {
    setActive(window.location.pathname);
  }, [active]);
  return (
      <nav className={`main-nav ${props.classes}`}>
        {/*Standard menu, hides below laptop size*/}
        <ul className="standard-menu">
        {links.map((item, index) => {
            //replace #navs with item
            return (
              <li key={index}><a className={(active === `/${item}`) || (active === `/${item.split(' ').join('%20')}`) || ((active === '/') && (item === 'Home')) ? 'active' : ''} href={item === 'Home' ? '/' : `/${item}`}>{item}</a></li>
            )
          })}
          {!props.isLoggedIn ? <li><a className={(active === '/register') || (active === '/login') ? 'active' : ''} href="/login">Login</a></li> : null}
        </ul>
        <div className="mobile-grid">
          <button name="Main Nav Mobile Button" onClick={toggleMenu} id="mobile-menu-button-main" className="mobile-menu-button">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>

          {/*Mobile menu, hides above tablet size*/}
          <ul id="mobile-menu-main" className="mobile-menu">
            {links.map((item, index) => {
              //replace #navs with item
              return (
                <li key={index} onClick={toggleMenu}><a className={(active === `/${item}`) || (active === `/${item.split(' ').join('%20')}`) || ((active === '/') && (item === 'Home')) ? 'active' : ''} href={`/${item}`}>{item}</a></li>
              )
            })}
            {!props.isLoggedIn ? <li onClick={toggleMenu}><a className={(active === '/register') || (active === '/login') ? 'active' : ''} href="/login">Login</a></li> : null}
          </ul>
        </div>
      </nav>
  )
}

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
  const logOut = (mobile) => {
    props.handleLogin(false);
    if (mobile) toggleMenu();
  }

  useEffect(function() {
    setActive(window.location.pathname.toLowerCase());
  }, [active]);
  return (
      <nav className={`main-nav ${props.classes}`}>
        {/*Standard menu, hides below laptop size*/}
        <ul className="standard-menu">
        {links.map((item, index) => {
            item=item.toLowerCase();
            return (
              <li key={index}><a className={(active === `/${item}`) || (active === `/${item.split(' ').join('%20')}`) || ((active === '/') && (item === 'home')) ? 'active' : ''} href={item === 'home' ? '/' : `/${item}`}>{item}</a></li>
            )
          })}
          {props.isLoggedIn ? <li><a className={(active === '/user') || (active === '/profile') || (active === '/garden')? 'active' : ''} href="/garden">Garden</a></li> : null}
          {!props.isLoggedIn ? <li><a className={(active === '/register') || (active === '/login') ? 'active' : ''} href="/login">Login</a></li> : <li onClick={logOut}><a className='' href="/logout">Logout</a></li>}
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
              item = item.toLowerCase();
              return (
                <li key={index} onClick={toggleMenu}><a className={(active.toLowerCase() === `/${item.toLowerCase()}`) || (active === `/${item.split(' ').join('%20')}`) || ((active === '/') && (item === 'home')) ? 'active' : ''} href={`/${item}`}>{item}</a></li>
              )
            })}
            {props.isLoggedIn ? <li onClick={toggleMenu}><a className={(active === '/user') || (active === '/profile') || (active === '/garden')? 'active' : ''} href="/garden">Garden</a></li> : null}
            {!props.isLoggedIn ? <li onClick={toggleMenu}><a className={(active === '/register') || (active === '/login') ? 'active' : ''} href="/login">Login</a></li> : <li onClick={() => logOut(true)}><a className='' href="/logout">Logout</a></li>}
          </ul>
        </div>
      </nav>
  )
}

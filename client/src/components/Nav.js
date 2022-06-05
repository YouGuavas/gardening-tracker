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
    //toggle mobile menu onclick classes on click
  }

  const renderGardenButton = (menuType) => {
    if (props.isLoggedIn) {
      if ((active === '/user') || (active === '/profile') || (active === '/garden')) {
        return <li onClick={(menuType) ? toggleMenu : null}><a className='active' href="/garden">Garden</a></li>
      } else {
        return <li onClick={(menuType) ? toggleMenu : null}><a href="/garden">Garden</a></li>
      }
    } 
  }


  const renderLoginButtons = (menuType) => {
    if (!props.isLoggedIn) {
      if ((active === '/register') || (active === '/login')) return <li onClick={(menuType) ? toggleMenu : null}><a className='active' href="/login">Login</a></li>;
      else return <li onClick={(menuType) ? toggleMenu : null}><a href="/login">Login</a></li>
    } else {
      return <li onClick={() => logOut(true)}><a href="/login">Logout</a></li>
    }

  }


  const logOut = (mobile) => {
    localStorage.removeItem('gardeningTrackerLogin');
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
          {renderGardenButton()}
          {renderLoginButtons()}
        </ul>
        {/*End standard menu*/}

        <div className="mobile-grid">

          {/*Hamburger button*/}
          <button name="Main Nav Mobile Button" onClick={toggleMenu} id="mobile-menu-button-main" className="mobile-menu-button">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>
          {/*End hamburger button*/}

          {/*Mobile menu, hides above tablet size*/}
          <ul id="mobile-menu-main" className="mobile-menu">
            {links.map((item, index) => {
              item = item.toLowerCase();
              return (
                <li key={index} onClick={toggleMenu}><a className={(active.toLowerCase() === `/${item.toLowerCase()}`) || (active === `/${item.split(' ').join('%20')}`) || ((active === '/') && (item === 'home')) ? 'active' : ''} href={`/${item}`}>{item}</a></li>
              )
            })}
            {renderGardenButton('mobile')}
            {renderLoginButtons('mobile')}
          </ul>
          {/*End mobile menu*/}
          
        </div>
      </nav>
  )
}

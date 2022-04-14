import {useState} from 'react';
import '../styles/Nav.scss';


export function Nav(props) {

  const links = props.links;

  const [active, setActive] = useState('Home');

  const toggleMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu-main');
    const mobileBtn = document.getElementById('mobile-menu-button-main');
   // mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('change');
    mobileBtn.classList.toggle('change');
  }
  const toggleActive = (e) => {
    setActive(e.target.innerHTML);
  }
  return (
      <nav className={`main-nav ${props.classes}`}>
        {/*Standard menu, hides below laptop size*/}
        <ul className="standard-menu">
        {links.map((item, index) => {
            //replace #navs with item
            return (
              <li key={index}><a className={(active === item) ? 'active' : ''} onClick={toggleActive} href={`#${item}`}>{item}</a></li>
            )
          })}
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
                <li key={index} onClick={toggleMenu}><a onClick={toggleActive} className={(active === item ? 'active' : '')} href={`#${item}`}>{item}</a></li>
              )
            })}
          </ul>
        </div>
      </nav>
  )
}

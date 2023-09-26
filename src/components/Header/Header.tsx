import React from 'react';
import './Header.scss';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

function Header() {
  const routes = useLocation();

  return (
      <header className="header">
        <nav className='header__navigation'>
          <ul className='header__navigation-list'>
            <li><NavLink className={`header__link ${routes.pathname === '/' ? 'header__link_active' : ''}`} to='/'>проекты</NavLink></li>
            <li><NavLink className={`header__link ${routes.pathname === '/tasks' ? 'header__link_active' : ''}`} to='/tasks'>задачи</NavLink></li>
          </ul>
        </nav>
      </header>
  );
}

export default Header;

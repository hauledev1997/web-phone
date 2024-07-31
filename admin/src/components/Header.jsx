import React from 'react';
import './Header.css';

const Header = ({ userName }) => {
  return (
    <div className='header-container'>
      <div className='header-logo'>
        <span>BOUTIQUE</span>
      </div>
      <div className='header-buttons'>
        <span>{userName}</span>
        <a href='/signin'>{userName ? 'Logout' : 'Sign in'}</a>
      </div>
    </div>
  );
};

export default Header;

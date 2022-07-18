import React from "react";
import logo from "../images/logo.svg";
import { BrowserRouter, Link } from 'react-router-dom';



function Header(props) {
  return (
    
    <header className="header">
      <BrowserRouter>
      <Link to="#">
        <img
          src={logo}
          className="effecthov logo"
          alt="Логотип 'Места России'"
        />
      </Link>
      {props.loggedIn ?
      <nav className='header__nav'>
        <p className='header__text'>{props.userData}</p>
        <button className='header__nav-but header__but' onClick={props.signOut}>Выйти</button>
      </nav>
        :
      <nav className='header__nav'>
        <Link to={props.navLink} className="header__nav-but">{props.navText}</Link>
        </nav>
    }
    </BrowserRouter>
    </header>
  );
}

export default Header;

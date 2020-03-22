import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom'
const Header = () => {
    const [show, showMenu] = useState(false);

    return (
        <div className="header-holder">
            <Container className="header-content">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={`hamburger ${show && 'rotate-hamburger'}`} onClick={() => showMenu(!show)}>
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                    <div className="hamburger-item"></div>
                </div>
            </Container>

            <div className={`menu ${show && 'move-menu'}`}>
                <ul className="nav-items list-unstyled">
                    <li className="nav-item has-menu" onClick={() => showMenu(!show)}>
                        <Link to="/" title="G0 to home">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item mt-5" onClick={() => showMenu(!show)}>
                        <Link to="/MovieListing/" title="List of Latest Movies">
                            Movie List
                        </Link>
                    </li>
                    <li className="nav-item mt-5" onClick={() => showMenu(!show)}>
                        <a href="index.html" title="say hello">
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`banner ${show && 'move-menu'}`}></div>
        </div>
    )
}

export default Header;
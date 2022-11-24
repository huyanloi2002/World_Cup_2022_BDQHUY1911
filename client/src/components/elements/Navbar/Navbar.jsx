import React
    from 'react';
import logo from '../../../assets/logo-wc2022.png'
import './Navbar.scss';
import { Link } from 'react-router-dom';


const Navbar = () => {

    return (
        <React.Fragment>
            <div className="navbar-content">
                <nav className="navbar navbar-expand-lg sticky-top">
                    <Link to="/">
                        <img className="logo" src={logo} alt="logo-wc2022" width="80" height="50" />
                    </Link>
                    <button
                        className="navbar-toggler" type="button"
                        data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span ><i className="bi bi-list"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                    </div>
                </nav>
            </div>
        </React.Fragment>
    )
}

export default Navbar;
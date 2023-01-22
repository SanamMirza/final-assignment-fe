import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link, NavLink} from "react-router-dom";
import './Nav.css'
import {ReactComponent as Menu} from '../../assets/menu-icon.svg';

function Nav() {
    const {isAuth, logout} = useContext (AuthContext)
    const [dropDown, setDropDown] = useState(false)

    function handleDropDown() {
        setDropDown(!dropDown);
    }

    function handleLogout() {
        logout()
    }

    return (
        <>
            <nav className="nav-container" onClick={handleDropDown}>
                <Menu className="menu-icon"/>
                <ul>
                    <li>
                        <NavLink to="/" className={( {isActive} ) => isActive ? "link--active" : "link"} >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" className={( {isActive} ) => isActive ? "link--active" : "link"} >
                            Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointment" className={( {isActive} ) => isActive ? "link--active" : "link"} >
                            Appointment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className={( {isActive} ) => isActive ? "link--active" : "link"} >
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={( {isActive} ) => isActive ? "link--active" : "link"} >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="dropdown">
                <div className={dropDown ? "d-block" : "d-none"}>
                    <div className="dropdown-content">
                        <Link to="/appointment">Afspraken</Link>
                        <Link to="/product/overzicht">Producten en Diensten</Link>
                        <Link to="/melding">Melding</Link>
                        <Link to="/nieuws">Nieuws</Link>
                        <Link to="/bestuur">Bestuur en Organisatie</Link>
                        <Link to="/register">Registreren</Link>
                        <Link to="/login">Inloggen</Link>

                    </div>
                </div>
            </div>
        </>

    );
}

export default Nav;
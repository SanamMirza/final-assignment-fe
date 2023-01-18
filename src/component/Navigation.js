import React, {useContext} from 'react';
import AuthContext from "../context/AuthContext";
import {NavLink} from "react-router-dom";
import './Navigation.css'

function Navigation() {
    const {isAuth, logout} = useContext (AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <header>
            <nav className="container">
                <ul>
                    <li>
                        <NavLink to="/" className{({isActive}) => isActive ? "link--active" : "link"} >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/account" className={({isActive}) => isActive ? "link--active" : "link"} >
                            Account
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/appointment" className{({isActive}) => isActive ? "link--active" : "link"} >
                            Appointment
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" className{({isActive}) => isActive ? "link--active" : "link"} >
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className{({isActive}) => isActive ? "link--active" : "link"} >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navigation;
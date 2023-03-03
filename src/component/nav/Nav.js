import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link, NavLink} from "react-router-dom";
import './Nav.css'
import {ReactComponent as Menu} from '../../assets/menu-icon.svg';


function Nav() {
    const {isAuth, logout} = useContext(AuthContext)
    const [dropDown, setDropDown] = useState(false)




        function handleDropDown() {
            setDropDown(!dropDown);
        }

        return (
            <>
                <nav className="nav-container" >
                    <Menu className="menu-icon" onClick={handleDropDown}/>
                    <div className="dropdown" >
                        <div className={dropDown ? "d-block" : "d-none"}>
                            <div className="dropdown-content" onClick={handleDropDown}>
                                <Link to="/appointment">Afspraken</Link>
                                <Link to="/product/overzicht">Producten en Diensten</Link>
                                <Link to="/melding">Melding</Link>
                                <Link to="/nieuws">Nieuws</Link>
                                <Link to="/bestuur">Bestuur en Organisatie</Link>
                                <Link to="/register">Registreren</Link>
                                <Link to="/login">Inloggen</Link>
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    </div>

                    <ul>
                        <li>
                            <NavLink to="/" className={({isActive}) => isActive ? "link-active" : "default"}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" className={({isActive}) => isActive ? "link--active" : "default"}>
                                Admin
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/adminaccount" className={({isActive}) => isActive ? "link--active" : "default"}>
                                Admin Account
                            </NavLink>
                        </li>

                        {isAuth ?
                            <button type="button"
                                    onClick={logout}
                            >
                                Log uit
                            </button>
                            :
                            <div>
                            <li>
                                <NavLink to="/login" className={({isActive}) => isActive ? "link--active" : "default"}>
                                    Log in
                                </NavLink>
                            </li>
                            <li>
                            <NavLink to="/register" className={({isActive}) => isActive ? "link--active" : "default"}>
                            Registreren
                            </NavLink>
                            </li>
                            </div>}

                        {isAuth &&
                        <li>
                          <NavLink to="/account" className={({isActive}) => isActive ? "link--active" : "default"}>
                            mijn Account
                          </NavLink>
                        </li>}

                    </ul>
                </nav>
            </>

        );
    }

export default Nav;
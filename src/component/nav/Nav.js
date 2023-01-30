import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Link, NavLink, useNavigate} from "react-router-dom";
import './Nav.css'
import {ReactComponent as Menu} from '../../assets/menu-icon.svg';

function Nav() {
    const {isAuth, logout} = useContext(AuthContext)
    const [dropDown, setDropDown] = useState(false)
    // const navigate = useNavigate();



        function handleDropDown() {
            setDropDown(!dropDown);
        }

        return (
            <>
                <nav className="nav-container" onClick={handleDropDown}>
                    <Menu className="menu-icon"/>
                    <Link to="/"><h3 className="logo">logo</h3></Link>
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
                            </div>
                        }
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
import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";
import {
    FaBuilding,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTwitter, FaYoutube
} from "react-icons/fa";


function Footer() {
    return (
        <section className="footer">
            <div className="footer-container">
                <div className="contact-info">
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p> <FaBuilding/> Gemeentestraat 1</p>
                                <p>1111 GG Gemeente</p>
                                <p>020 23 23 233</p>

                            </li>
                        </ul>
                    </h5>
                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                            </li>
                        </ul>
                    </h5>
                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                            </li>
                        </ul>
                    </h5>
                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Lorem ipsum dolor.</p>
                                <p>klik <Link to="/contact">hier</Link> om naar het</p>
                                <p>contact formulier te gaan</p>
                            </li>
                        </ul>
                        </h5>
                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                                <p>Lorem ipsum dolor.</p>
                            </li>
                        </ul>
                    </h5>
                </div>
            </div>
            <FaTwitter/> <FaFacebook/> <FaInstagram/> <FaLinkedin/> <FaYoutube/>
            <p>Final assignment web application made by S.J. Mirza © 2023</p>
        </section>
    );
}

export default Footer;
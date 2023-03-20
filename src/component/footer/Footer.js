import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";


function Footer() {
    return (
        <section className="footer">
            <div className="footer-container">
                <div className="contact-info">
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Gemeentestraat 1</p>
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
                                <p>Gemeentestraat 1</p>
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
                                <p>Gemeentestraat 1</p>
                                <p>1111 GG Gemeente</p>
                                <p>020 23 23 233</p>

                            </li>
                        </ul>
                    </h5>
                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <div>block 4</div></h5>
                    <p>klik <Link to="/contact">hier</Link> om naar het contact formulier te gaan</p>

                </div>
                <div>
                    <h5>Contact informatie
                        <hr className="divider" />
                        <ul>
                            <li>
                                <p>Gemeentestraat 1</p>
                                <p>1111 GG Gemeente</p>
                                <p>020 23 23 233</p>

                            </li>
                        </ul>
                    </h5>
                </div>
            </div>
            <p>Final assignment web application made by S.J. Mirza © 2023</p>
        </section>
    );
}

export default Footer;
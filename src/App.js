import './App.css';
import {Link, Navigate, Route, Routes} from "react-router-dom";
import Home from "../../final-assignment/src/pages/home/Home";
import Appointment from "../../final-assignment/src/pages/appointment/Appointment";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Account from "../../final-assignment/src/pages/account/Account";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Paspoort from "./pages/product/paspoort/Paspoort";
import Verhuizing from "./pages/product/verhuizing/Verhuizing";
import Parkeervergunning from "./pages/product/parkeer/Parkeervergunning";
import Subsidie from "./pages/product/subsidie/Subsidie";
import Nav from './component/nav/Nav';
import Overzicht from "./pages/product/overzicht/Overzicht";
import Nieuws from "./pages/nieuws/Nieuws";
import Melding from "./pages/melding/Melding";
import Bestuur from "./pages/bestuur/Bestuur";
import Admin from "./pages/admin/AdminLogin";
import Contact from "./pages/contact-form/Contact";


function App() {
    const {isAuth} = useContext(AuthContext);



  return (
    <>

        <Nav />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<div className="page"><Login/></div>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/account" element={isAuth ? <Account/> : <Navigate to="/"/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/product/paspoort" element={<Paspoort/>}/>
        <Route path="/product/verhuizing" element={<Verhuizing/>}/>
        <Route path="/product/parkeervergunning" element={<Parkeervergunning/>}/>
        <Route path="/product/subsidie" element={<Subsidie/>}/>
        <Route path="/product/overzicht" element={<Overzicht/>}/>
        <Route path="/nieuws" element={<Nieuws/>}/>
        <Route path="/melding" element={<Melding/>}/>
        <Route path="/bestuur" element={<Bestuur/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>

        <footer className="footer-container">
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
                <p>Final assignment web application made by S.J. Mirza © 2023</p>
            </div>
        </footer>
    </>
  );
}

export default App;

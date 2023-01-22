import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
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
import {Navigation} from "react-calendar";
import Overzicht from "./pages/product/overzicht/Overzicht";
import Nieuws from "./pages/nieuws/Nieuws";
import Melding from "./pages/melding/Melding";
import Bestuur from "./pages/bestuur/Bestuur";

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
        <Route path="/product/paspoort" element={<Paspoort/>}/>
        <Route path="/product/verhuizing" element={<Verhuizing/>}/>
        <Route path="/product/parkeervergunning" element={<Parkeervergunning/>}/>
        <Route path="/product/subsidie" element={<Subsidie/>}/>
        <Route path="/product/overzicht" element={<Overzicht/>}/>
        <Route path="/nieuws" element={<Nieuws/>}/>
        <Route path="/melding" element={<Melding/>}/>
        <Route path="/bestuur" element={<Bestuur/>}/>

      </Routes>

        <footer className="footer-container">
            <div className="contact-info">
                <h4>Contact informatie</h4>
                <hr className="divider" />
                <ul>
                    <li>
                        <p>Gemeentestraat 1</p>
                        <p>1111 GG Gemeente</p>
                        <img src="./../assets/phone-icon.svg" alt="phone"/> <p>020 23 23 233</p>

                    </li>
                </ul>
            </div>
            <div>
                <h4>Contact informatie</h4>
                <hr className="divider" />
                <div>block 2</div>
            </div>
            <div>
                <h4>Contact informatie</h4>
                <hr className="divider" />
                Final assignment web application made by S.J. Mirza © 2023
            </div>
        </footer>
    </>
  );
}

export default App;

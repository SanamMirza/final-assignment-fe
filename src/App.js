import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Nav from './component/nav/Nav';
import Footer from "./component/footer/Footer";
import Home from "./pages/home/Home";
import Appointment from "./pages/appointment/Appointment";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Account from "./pages/account/Account";
import Paspoort from "./pages/product/paspoort/Paspoort";
import Verhuizing from "./pages/product/verhuizing/Verhuizing";
import Parkeervergunning from "./pages/product/parkeer/Parkeervergunning";
import Subsidie from "./pages/product/subsidie/Subsidie";
import Overzicht from "./pages/product/overzicht/Overzicht";
import Nieuws from "./pages/nieuws/Nieuws";
import Melding from "./pages/melding/Melding";
import Bestuur from "./pages/bestuur/Bestuur";
import Contact from "./pages/contact-form/Contact";
import AdminAccount from "./pages/admin/AdminAccount";
import PageNotFound from "./pages/page-not-found/PageNotFound";



function App() {
    const {isAuth} = useContext(AuthContext);



  return (
    <>

        <Nav />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/account" element={isAuth ? <Account/> : <Navigate to="/login"/>}/>
        <Route path="/product/paspoort" element={<Paspoort/>}/>
        <Route path="/product/verhuizing" element={<Verhuizing/>}/>
        <Route path="/product/parkeervergunning" element={<Parkeervergunning/>}/>
        <Route path="/product/subsidie" element={<Subsidie/>}/>
        <Route path="/product/overzicht" element={<Overzicht/>}/>
        <Route path="/nieuws" element={<Nieuws/>}/>
        <Route path="/melding" element={<Melding/>}/>
        <Route path="/bestuur" element={<Bestuur/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/adminaccount" element={<AdminAccount/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>


      <Footer/>
    </>
  );
}

export default App;

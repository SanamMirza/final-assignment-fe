import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../../final-assignment-goverment/src/pages/home/Home";
import Appointment from "../../final-assignment-goverment/src/pages/appointment/Appointment";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Account from "../../final-assignment-goverment/src/pages/account/Account";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth} = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/account" element={isAuth ? <Account/> : <Navigate to="/"/>}/>
      </Routes>

      <footer>
        <div>
          Final assignment web application made by S.J. Mirza © 2023
        </div>
      </footer>
    </>
  );
}

export default App;

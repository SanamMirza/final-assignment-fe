import React, {useContext, useState} from 'react';
import './Admin.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";


function AdminLogin() {
    const[email,setEmail]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[error,toggleError]=useState(false);
    const{login}= useContext (AuthContext)



    async function handleAdminLogin(e){
        e.preventDefault();
        toggleError(false);
        try{
            const response= await axios.post('http://localhost8081/authenticate',{
                email:email,
                username:username,
                password:password,
            });
            console.log(response.data);
            login(response.data.jwt);

        }catch(error){
            console.error(error);
            toggleError(true);
        }
    }

    return(
        <div>
            <h2>Admin pagina</h2>

            <main className="login-container">
                <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture"/>
                <h1>Inloggen voor medewerkers</h1>
                <form className="admin-login" onSubmit={handleAdminLogin}>
                    <label htmlFor="email-field">
                        Emailadres:
                        <input
                            type="text"
                            id="email-field"
                            className="form-input-field"
                            name="email"
                            placeholder="Email-adres"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="username-field">
                        Gebruikersnaam:
                        <input
                            type="text"
                            id="username-field"
                            className="form-input-field"
                            name="username"
                            placeholder="Gebruikersnaam"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    </label>
                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input
                            type="password"
                            id="password-field"
                            className="form-input-field"
                            name="password"
                            placeholder="wachtwoord"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </label>
                    {error&&<p className="error">Combinatie van gebruikers naam en wachtwoord is onjuist</p>}
                    <button className="button login-button"
                        type="submit"
                        >
                        Inloggen
                    </button>
                </form>
            </main>
        </div>
    );


}

export default AdminLogin;
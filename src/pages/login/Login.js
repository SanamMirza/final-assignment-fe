import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './Login.css'
import {Link} from "react-router-dom";

function Login() {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, toggleError] = useState(false);
    const {login} = useContext(AuthContext)


    async function handleLogin(e) {
        e.preventDefault();
        toggleError(false);
        try {
            const response = await axios.post('http://localhost:8081/authenticate', {
                username: "username",
                password: "password",
            });
            console.log(response.data);
            login(response.data.jwt);
        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    return (
        <main className="login-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture" />
            <h1>Inloggen</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label htmlFor="email-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        className="form-input-field"
                        name="username"
                        placeholder="Gebruikersnaam"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {error && <p className="error">Combinatie van gebruikersnaam en wachtwoord is onjuist</p> }
                <button className="button login-button"
                    type="submit"
                >
                    Inloggen
                </button>
            </form>
            <p>Heb je nog geen account? <Link to="/register"> Regisreer</Link> je dan eerst.</p>
        </main>
    )
}



export default Login;
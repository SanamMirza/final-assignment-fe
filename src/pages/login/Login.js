import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './Login.css'
import {Link} from "react-router-dom";
import FormInput from "../../component/form-field/FormInput";


function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, toggleError] = useState(false);
    const {login, isAuth} = useContext(AuthContext)


    async function handleLogin(e) {
        e.preventDefault();
        toggleError(false);
        try {
            const response = await axios.post('http://localhost:8081/authenticate', {
                email: email,
                username: username,
                password: password,
            });
        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    return (
        <main className="login-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture" />
            <h1>Inloggen</h1>
            {isAuth ? <p>U bent al ingelogd</p>
                :
            <form className="login-form" onSubmit={handleLogin}>
                <FormInput name="email-field"
                           type="text"
                           id="email-field"
                           value={email}
                           placeholder="Email"
                           clickHandler={(e) => setEmail(e.target.value)}>
                    Email:
                </FormInput>
                <FormInput name="username-field"
                           type="text"
                           id="username-field"
                           value={username}
                           placeholder="Gebruikersnaam"
                           clickHandler={(e) => setUsername(e.target.value)}>
                    Gebruikersnaam:
                </FormInput>
                <FormInput name="password-field"
                           type="password"
                           id="password-field"
                           value={password}
                           placeholder="Wachtwoord"
                           clickHandler={(e) => setPassword(e.target.value)}>
                    Wachtwoord:
                </FormInput>
                {error && <p className="error">Combinatie van gebruikersnaam en wachtwoord is onjuist</p> }
                <button className="button login-button"
                    type="submit"
                >
                    Inloggen
                </button>
                <p>Heb je nog geen account? <Link to="/register"> Registreer</Link> je dan eerst.</p>
            </form>}

        </main>
    );
}



export default Login;
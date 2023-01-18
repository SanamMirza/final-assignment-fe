import React, {useContext, useState} from 'react';
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {login} = useContext(AuthContext)

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: "email",
                password: "password",
            })
            login(response.data.accessToken)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="container">
            <h1>Inloggen</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email-field">
                    Emailadres:
                    <input
                        type="text"
                        id="email-field"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="password-field">
                    Wachtwoord:
                    <input
                        type="text"
                        id="password-field"
                        name="password"
                        placeholder="wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                >
                    Inloggen
                </button>
            </form>
        </main>
    )
}



export default Login;
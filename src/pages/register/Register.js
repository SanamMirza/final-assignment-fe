import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Register(props) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("");
    const [address, setAddress] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerSuccess, toggleRegisterSuccess] = useState(false);


    const {login} = useContext(AuthContext);
    const navigate = useNavigate();


    async function registerUser(e) {
        e.preventDefault();
        console.log("De gebruiker is ingelogd 👤")
        setError('');
        toggleLoading(true);

        try {
            const result = await axios.post('http://localhost:3000/register', {
                name: userName,
                address: address,
                telephoneNumber: telephoneNumber,
                email: email,
                password: password,
            });
            login(result.data.accesToken);

            toggleRegisterSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        catch (error) {
            console.error(error);
            // (`Het registreren is mislukt. Probeer het opnieuw(${e.message})`);
        }
        toggleLoading(false);
    }


    return (
            <main className="container">
            <h1>Registreren</h1>
            <form onSubmit={registerUser}>
                <label htmlFor="name-field">
                    Voornaam en Achternaam:
                    <input
                        type="text"
                        id="name-field"
                        name="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value) }
                    />
                </label>
                <label htmlFor="address-field">
                    Adres:
                    <input
                        type="text"
                        id="address-field"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value) }
                    />
                </label>
                <label htmlFor="telephoneNumber-field">
                    Telefoonnummer:
                    <input
                        type="number"
                        id="telephoneNumber-field"
                        name="telephoneNumber"
                        value={telephoneNumber}
                        onChange={(e) => setTelephoneNumber(e.target.value)}
                    />
                </label>
                <label htmlFor="email-field">
                    Email:
                    <input
                        type="text"
                        id="email-field"
                        name="email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type="submit"
                    disabled={loading}
                > {loading ? 'Versturen..' : 'Maak account aan'}
                </button>
                {registerSuccess === true && <p>Registreren is gelukt. Je wordt nu doorgestuurd naar de inlog pagina.</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            </main>
    );
}

export default Register;
import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './Register.css'
import {AuthContext} from "../../context/AuthContext";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [houseNumber, setHouseNumber] =useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [registerSuccess, toggleRegisterSuccess] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();



    async function registerUser(e) {
        e.preventDefault();
        console.log("Data in register 👤");
        console.log(firstName, lastName, street, houseNumber, zipcode, telephoneNumber, email, username)
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(`http://localhost:8081/accounts`, {
                firstName: firstName,
                lastName: lastName,
                address: `${street}, ${houseNumber}, ${zipcode}`,
                telephoneNumber: telephoneNumber,
                email: email,
                password: password,
                username: username,
            });
            console.log(result.data)

            toggleRegisterSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        }
        catch (error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    return (
            <main className="register-container">
                <img className="register-icon" src="https://as2.ftcdn.net/v2/jpg/01/95/70/73/1000_F_195707316_wGdiWMFQxeFcRqi8YiG3V3pp3KvI3MQp.jpg" alt="register-icon"/>
                <h1>Registreren</h1>
                <form onSubmit={registerUser} className="registeration-form">
                    <div className="horizontal-row">
                        <label htmlFor="firstname-field">
                            Voornaam:
                            <input
                                type="text"
                                id="firstname-field"
                                value={firstName}
                                placeholder="Voornaam"
                                onChange={(e) => setFirstName(e.target.value)}/>
                        </label>
                        <label htmlFor="lastname-field">
                            Achternaam:
                            <input
                                type="text"
                                id="lastname-field"
                                value={lastName}
                                placeholder="Achternaam"
                                onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                    </div>
                    <div className="horizontal-row">
                        <label htmlFor="street-field">
                            Straatnaam:
                            <input
                                type="text"
                                id="street-field"
                                value={street}
                                placeholder="Straatnaam"
                                onChange={(e) => setStreet(e.target.value)}/>
                        </label>
                        <label htmlFor="housenumber-field">
                            Huisnummer:
                            <input
                                type="text"
                                id="housenumber-field"
                                value={houseNumber}
                                placeholder="Huisnummer"
                                onChange={(e) => setHouseNumber(e.target.value)}/>
                        </label>
                    </div>
                    <div className="horizontal-row">
                        <label htmlFor="zipcode-field">
                            Postcode:
                            <input
                                type="text"
                                id="zipcode-field"
                                value={zipcode}
                                placeholder="Postcode"
                                onChange={(e) => setZipcode(e.target.value)}/>
                        </label>
                        <label htmlFor="telephoneNumber-field">
                            Telefoonnummer:
                            <input
                                type="tel"
                                id="telephoneNumber-field"
                                value={telephoneNumber}
                                placeholder="Telefoonnummer"
                                onChange={(e) => setTelephoneNumber(e.target.value)}/>
                        </label>
                    </div>
                    <label htmlFor="email-field">
                        Email:
                        <input
                            type="text"
                            id="email-field"
                            name="email"
                            value={email}
                            placeholder="Email-adres"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                        <label htmlFor="username-field">
                            Gebruikersnaam:
                            <input
                                type="text"
                                id="username-field"
                                name="username"
                                value={username}
                                placeholder="Gebruikersnaam"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                    <label htmlFor="password-field">
                        Wachtwoord:
                        <input
                            type="password"
                            id="password-field"
                            name="password"
                            value={password}
                            placeholder="Wachtwoord"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="button register-button"
                        type="submit"
                    >
                        Registreren
                    </button>
                    {registerSuccess === true && <p>Registreren is gelukt. Je wordt nu doorgestuurd naar de inlog pagina.{loading}</p>}
                    {error && <p className="error">Dit account bestaat al. Probeer een ander emailadres</p>}
                </form>
                <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            </main>
    );
}

export default Register;
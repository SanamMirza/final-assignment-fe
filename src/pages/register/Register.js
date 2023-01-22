import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

function Register(props) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [houseNumber, setHouseNumber] =useState("");
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
                name: firstName, lastName,
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
            <main className="register-container">
            <h1>Registreren</h1>
            <form onSubmit={registerUser}>
                <fieldset>
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
                    Familienaam:
                    <input
                        type="text"
                        id="lastname-field"
                        value={lastName}
                        placeholder="Familienaam"
                        onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label htmlFor="address-field">
                    Straatnaam:
                    <input
                        type="text"
                        id="address-field"
                        value={address}
                        placeholder="Straatnaam"
                        onChange={(e) => setAddress(e.target.value)}/>
                </label>
                <label htmlFor="zipcode-field">
                    Postcode:
                    <input
                        type="text"
                        id="zipcode-field"
                        value={zipcode}
                        placeholder="Postcode"
                        onChange={(e) => setZipcode(e.target.value)}/>
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
                <label htmlFor="telephoneNumber-field">
                    Telefoonnummer:
                    <input
                        type="number"
                        id="telephoneNumber-field"
                        name="telephoneNumber"
                        value={telephoneNumber}
                        placeholder="Telefoonnummer"
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
                        placeholder="email-adres"
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
                        placeholder="wachtwoord"
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
                </fieldset>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            </main>
    );
}

export default Register;
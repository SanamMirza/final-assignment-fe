import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './Register.css';
import '../../component/form-field/FormInput';
import FormInput from "../../component/form-field/FormInput";

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
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(`http://localhost:8081/users`, {
                firstName: firstName,
                lastName: lastName,
                address: `${street}, ${houseNumber}, ${zipcode}`,
                telephoneNumber: telephoneNumber,
                email: email,
                password: password,
                username: username,
            });

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
                        <FormInput name="firstname-field"
                            type="text"
                            id="firstname-field"
                            value={firstName}
                            placeholder="Voornaam"
                            clickHandler={(e) => setFirstName(e.target.value)}>
                            Voornaam:
                        </FormInput>
                        <FormInput name="lastname-field"
                            type="text"
                            id="lastname-field"
                            value={lastName}
                            placeholder="Achternaam"
                            clickHandler={(e) => setLastName(e.target.value)}>
                            Achternaam:
                        </FormInput>
                    </div>
                    <div className="horizontal-row">
                        <FormInput name="street-field"
                                   type="text"
                                   id="street-field"
                                   value={street}
                                   placeholder="Straat"
                                   clickHandler={(e) => setStreet(e.target.value)}>
                            Straat:
                        </FormInput>
                        <FormInput name="housenumber-field"
                                   Achternaam
                                   type="text"
                                   id="housenumber-field"
                                   value={houseNumber}
                                   placeholder="Huisnummer"
                                   clickHandler={(e) => setHouseNumber(e.target.value)}>
                            Huisnummer:
                        </FormInput>
                    </div>
                    <div className="horizontal-row">
                        <FormInput name="zipcode-field"
                                   type="text"
                                   id="zipcode-field"
                                   value={zipcode}
                                   placeholder="Postcode"
                                   clickHandler={(e) => setZipcode(e.target.value)}>
                            Postcode:
                        </FormInput>
                        <FormInput name="telephone-field"
                                   type="text"
                                   id="telephone-field"
                                   value={telephoneNumber}
                                   placeholder="Telefoonnummer"
                                   clickHandler={(e) => setTelephoneNumber(e.target.value)}>
                            Telefoonnummer:
                        </FormInput>
                    </div>
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
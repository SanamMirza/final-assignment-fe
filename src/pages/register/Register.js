import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './Register.css';
import '../../component/form-field/FormInput';
import FormInput from "../../component/form-field/FormInput";
import {useForm} from 'react-hook-form';
import Button from "../../component/button/Button";
import PopUp from "../../component/pop-up-message/PopUp";

function Register() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onBlur"});
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const navigate = useNavigate();

    const postcodeRegex = /^\d{4}[a-zA-Z]{2}$/;
    const telefoonRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


    async function registerUser(data) {
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.post(`http://localhost:8081/users`, data);

            setShowPopUp(true);

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
                <form onSubmit={handleSubmit(registerUser)} className="registration-form">
                    <div className="horizontal-row">
                        <FormInput
                            type="text"
                            name="firstName"
                            inputId="firstname-field"
                            inputLabel="Voornaam"
                            placeholder="Voornaam"
                            validationRules={{
                                required: "Voornaam is verplicht",
                                minLength: {
                                    value: 3,
                                    message: "Naam moet minimaal 3 karakters bevatten"
                                }
                            }}
                            register={register}
                            errors={errors}
                            />
                        <FormInput
                            type="text"
                            name="lastName"
                            inputId="lastname-field"
                            inputLabel="Achternaam"
                            placeholder="Achternaam"
                            validationRules={{
                                required: 'Achternaam is verplicht',
                                minLength: {
                                    value: 3,
                                    message: 'Naam moet minimaal 3 karakters bevatten'
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <div className="address-row">
                        <FormInput
                            type="text"
                            name="address"
                            inputId="address-field"
                            inputLabel="Straat"
                            placeholder="Straat en huisnummer"
                            validationRules={{
                                required: "Straat is verplicht",
                                minLength: {
                                    value: 3,
                                    message: "Straat moet minimaal 3 karakters bevatten"
                                }
                            }}
                            register={register}
                            errors={errors}
                            />

                    </div>
                    <div className="horizontal-row">
                        <FormInput
                            type="text"
                            name="zipCode"
                            inputId="zipcode-field"
                            inputLabel="Postcode"
                            placeholder="Postcode"
                            validationRules={{
                                required: "Postcode is verplicht",
                                pattern: {
                                    value: postcodeRegex,
                                    message: "Ongeldig postcode"
                                }
                            }}
                            register={register}
                            errors={errors}
                        />

                        <FormInput
                            type="text"
                            name="telephoneNumber"
                            inputId="telephone-field"
                            inputLabel="Telefoonnummer"
                            placeholder="Telefoonnummer"
                            validationRules={{
                                required: "Telefoonnummer is verplicht",
                                    pattern: {
                                        value: telefoonRegex,
                                        message: "Ongeldig telefoonnummer"
                            }
                            }}
                            register={register}
                            errors={errors}
                        />
                    </div>
                    <FormInput
                        type="email"
                        name="email"
                        inputId="email-field"
                        inputLabel="Email"
                        placeholder="Email"
                        validationRules={{
                            required: "Email is verplicht",
                            pattern: {
                                value: emailRegex,
                                message: "Ongeldig emailadres"
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        type="text"
                        name="username"
                        inputId="username-field"
                        inputLabel="Gebruikersnaam"
                        placeholder="Gebruikersnaam"
                        validationRules={{
                            required: "Gebruikersnaam is verplicht",
                            minLength: {
                                value: 3,
                                message: "Gebruikersnaam moet minimaal 3 karakters bevatten"
                            }
                        }}
                        register={register}
                        errors={errors}
                    />
                    <FormInput
                        type="password"
                        name="password"
                        inputId="password-field"
                        inputLabel="Wachtwoord"
                        placeholder="Wachtwoord"
                        validationRules={{
                            required: "Wachtwoord is verplicht",
                        }}
                        register={register}
                        errors={errors}
                    />
                    <Button
                        className="button"
                        type="submit"
                        children="Registreren"
                    />

                    {showPopUp && (
                        <PopUp
                            title="Registreren is gelukt! Je wordt nu doorgestuurd naar de inlog pagina."
                            onClose={() => setShowPopUp(false)}
                        />
                    )}
                    {loading}
                    {error && <h5 className="error">Dit account bestaat al. Probeer een ander emailadres</h5>}
                </form>
                <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
            </main>
    );
}

export default Register;
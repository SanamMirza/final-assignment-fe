import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './Login.css'
import {Link} from "react-router-dom";
import FormInput from "../../component/form-field/FormInput";
import {useForm} from "react-hook-form";
import Button from "../../component/button/Button";
import PopUp from "../../component/pop-up-message/PopUp";
import ErrorMessage from "../../component/error/ErrorMessage";


function Login() {
    const {register, handleSubmit, formState : {errors}} = useForm({mode: "onBlur"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const {login, isAuth} = useContext(AuthContext)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    async function handleLogin(data) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/authenticate', data);

            setShowPopUp(true);
            login(response.data.jwt);


        } catch (error) {
            console.error(error);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <main className="login-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile" />
            <h1>Inloggen</h1>
            {isAuth ? <p>U bent al ingelogd</p>
                :
            <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
                <FormInput
                    type="text"
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
                    children="Inloggen"
                />
                {showPopUp && (
                    <PopUp
                        title="Inloggen is gelukt! U wordt nu doorgestuurd naar uw Account."
                        onClose={() => setShowPopUp(false)}
                    />
                )}
                {loading}
                {error && (
                    <ErrorMessage
                        title="Error"
                        text="Combinatie van gebruikersnaam en wachtwoord is onjuist."
                        onClose={() => toggleError(false) }
                    />
                )}
                <p>Heb je nog geen account? <Link to="/register"> Registreer</Link> je dan eerst.</p>
            </form>}

        </main>
    );
}



export default Login;
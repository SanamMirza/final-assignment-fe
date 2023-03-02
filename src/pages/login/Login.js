import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import './Login.css'
import {Link, useNavigate} from "react-router-dom";
import FormInput from "../../component/form-field/FormInput";
import {useForm} from "react-hook-form";


function Login() {
    const {register, handleSubmit, formState : {errors}} = useForm({mode: "onBlur"});
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [loginSuccess, toggleLoginSuccess] = useState(false);
    const {login, isAuth} = useContext(AuthContext)
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    async function handleLogin(data) {
        console.log(data);
        console.log('ERRORS', errors)
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/authenticate', data);
            toggleLoginSuccess(true);

            login(response.data.jwt);

            // setTimeout(() => {
            //     navigate('/account');
            // }, 2000);

        } catch (error) {
            console.error(error);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <main className="login-container">
            <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture" />
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
                {error && <h5 className="error-melding">Combinatie van gebruikersnaam en wachtwoord is onjuist</h5> }
                <button className="button login-button"
                    type="submit"
                >
                    Inloggen
                </button>
                {loginSuccess === true && <h5>Registreren is gelukt. Je wordt nu doorgestuurd naar de inlog pagina.{loading}</h5>}
                <p>Heb je nog geen account? <Link to="/register"> Registreer</Link> je dan eerst.</p>
            </form>}

        </main>
    );
}



export default Login;
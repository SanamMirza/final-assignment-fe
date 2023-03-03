import React, {useContext, useState} from 'react';
import './Admin.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import FormInput from "../../component/form-field/FormInput";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";


function AdminLogin() {
    const {register, handleSubmit, formState : {errors}} = useForm({mode: "onBlur"});
    const[error,toggleError]=useState(false);
    const [loading, toggleLoading] = useState(false);
    const [loginSuccess, toggleLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const{isAuth, login}= useContext (AuthContext)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    async function handleAdminLogin(data){
        console.log(data);
        toggleError(false);
        toggleLoading(true);
        try{
            const response= await axios.post('http://localhost8081/authenticate', data);
            console.log(response);
            login(response.data.jwt);

            toggleLoginSuccess(true);
            setTimeout(() => {
                navigate('/adminAccount');
            }, 2000);

        } catch(error) {
            console.error(error);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return(
        <div>
            <h2>Admin pagina</h2>

            <main className="login-container">
                <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture"/>
                <h1>Inloggen voor medewerkers</h1>
                {isAuth ? <p>U bent al ingelogd</p>
                    :
                <form className="admin-login" onSubmit={handleSubmit(handleAdminLogin)}>
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
                    {error&&<p className="error">Combinatie van gebruikers naam en wachtwoord is onjuist</p>}
                    <button className="button login-button"
                        type="submit"
                        >
                        Inloggen
                    </button>
                    {loginSuccess === true && <h5>Registreren is gelukt. Je wordt nu doorgestuurd naar de inlog pagina.{loading}</h5>}

                </form>}
            </main>
        </div>
    );


}

export default AdminLogin;
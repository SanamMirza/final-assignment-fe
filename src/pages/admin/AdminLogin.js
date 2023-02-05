import React, {useContext, useState} from 'react';
import './Admin.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import FormInput from "../../component/form-field/FormInput";


function AdminLogin() {
    const[email,setEmail]=useState("");
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[error,toggleError]=useState(false);
    const{login}= useContext (AuthContext)



    async function handleAdminLogin(e){
        e.preventDefault();
        toggleError(false);
        try{
            const response= await axios.post('http://localhost8081/authenticate',{
                email:email,
                username:username,
                password:password,
            });

        }catch(error){
            console.error(error);
            toggleError(true);
        }
    }

    return(
        <div>
            <h2>Admin pagina</h2>

            <main className="login-container">
                <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp" alt="template-profile-picture"/>
                <h1>Inloggen voor medewerkers</h1>
                <form className="admin-login" onSubmit={handleAdminLogin}>
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
                    {error&&<p className="error">Combinatie van gebruikers naam en wachtwoord is onjuist</p>}
                    <button className="button login-button"
                        type="submit"
                        >
                        Inloggen
                    </button>
                </form>
            </main>
        </div>
    );


}

export default AdminLogin;
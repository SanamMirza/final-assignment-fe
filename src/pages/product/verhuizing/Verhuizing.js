import React, {useContext, useState} from 'react';
import axios from "axios";
import './Verhuizing.css'
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FormInput from "../../../component/form-field/FormInput";
import {useForm} from "react-hook-form";
import Button from "../../../component/button/Button";
import PopUp from "../../../component/pop-up-message/PopUp";


function Verhuizing() {
    const {register, handleSubmit, reset, formState: {errors}} = useForm({mode: "onBlur"});
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState("");
    const {isAuth, user} = useContext(AuthContext);


    const postcodeRegex = /^\d{4}[a-zA-Z]{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    function handleDoc(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    const formSubmit = async (data) => {
        toggleError(false);
        toggleLoading(true);
        const jwt = localStorage.getItem('token');
        const decodedToken = jwt_decode(jwt);
        const id = decodedToken.sub;

        const formData = new FormData();
        formData.append("file", file);


        try {
            await axios.post(`http://localhost:8081/docs/single/upload/${id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${jwt}`,
                    },
                });
            await axios.put(`http://localhost:8081/accounts/${user.id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                }});

            reset();
            setShowPopUp(true);
            setPreviewUrl("");

        } catch(error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }


    return (
        <main className="outer-container">
            <h1>Verhuizing</h1>
            <img src="https://media.istockphoto.com/id/1288083160/vector/happy-family-moving-into-new-house-flat-vector-illustration.jpg?s=170667a&w=0&k=20&c=6Q9wfa-kTLMxk6O_8D1pTmyaBDQzTbICXpSv7TtWo3g=" alt="verhuizing"/>
            <h2>Geef hier uw verhuizing door</h2>
            {isAuth ?
                <section className="inner-container">
                    <form onSubmit={handleSubmit(formSubmit)}>
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
                        <div>
                            <p>Upload hier uw huurovereneenkomst of koopakte</p>

                            <input type="file" onChange={handleDoc}/>
                            {previewUrl && (<img src={previewUrl} alt="Preview" style={{maxWidth: "100px"}}/> )}
                        </div>
                                <Button
                                    className="button"
                                    type="submit"
                                    children="Versturen"
                                />


                        {showPopUp && (
                            <PopUp
                                title="Uw formulier is verzonden!"
                                onClose={() => setShowPopUp(false)}
                            />
                       )}
                        {loading}
                            </form>
                    </section>
                        :
                        <p>U dient ingelogd te zijn om uw verhuizing door te geven. Klik <Link to="/login">hier</Link> om in te loggen</p>
                    }
                </main>
            );
        }


export default Verhuizing;
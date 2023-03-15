import React, {useState} from 'react';
import './Contact.css';
import axios from "axios";
import FormInput from "../../component/form-field/FormInput";
import {useForm} from "react-hook-form";
import Button from "../../component/button/Button";
import PopUp from "../../component/pop-up-message/PopUp";


function Contact() {
    const {register, handleSubmit, reset, formState : {errors}} = useForm({mode: "onBlur"});
    const [showPopUp, setShowPopUp] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    async function handleContactForm(data) {
        console.log(data);
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/contact', data);

            console.log(response.data)

            reset();
            setShowPopUp(true)

        } catch (error) {
            console.error(error);
            toggleError(true);

        }
        toggleLoading(false)
    }

    function handleClose() {
        setShowPopUp(false);
    }

    return (
        <>
        <div className="contact-page">
            <h1>Contact informatie</h1>
            <ul>
                <li>
                    <p>Gemeentestraat 1</p>
                    <p>1111 GG Gemeente</p>
                    <p>020 23 23 233</p>
                </li>
            </ul>
        </div>
        <main className="contact-form">
            <h1>Contact formulier</h1>
            <form onSubmit={handleSubmit(handleContactForm)}>
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
                <label htmlFor="message">
                    Bericht:
                    <textarea
                              rows="10" cols="50"
                              name="message"
                              placeholder="Bericht"
                              {...register("message", {
                                  required: {
                                      maxLength: "500",
                                      message: "Maximaal 500 karakters"
                                  }
                              })}
                    >
                        {errors.message && <p>{errors.message.message}</p>}
                    </textarea>
                </label>
                <Button
                    className="button"
                    type="submit"
                    children="Versturen"
                />
                {showPopUp && (
                    <PopUp
                        title="Uw formulier is verzonden!"
                        onClose={handleClose}
                    />
                   )}
            </form>
        </main>
            </>
    );
}

export default Contact;
import React, {useState} from 'react';
import './Contact.css';
import axios from "axios";
import FormInput from "../../component/form-field/FormInput";
import {useForm} from "react-hook-form";


function Contact() {
    const {register, handleSubmit, formState : {errors}} = useForm({mode: "onBlur"});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    async function handleContactForm(data) {
        console.log(data);
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.post('http://localhost:8081/contact', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                message: message,
            }, {
                    headers: {
                        "Content-Type": "application/json",
                    }});
            setContactSuccess(true)

        } catch (error) {
            console.error(error);
            toggleError(true);

        }
        toggleLoading(false)
    }

    return (
        <>
        <div>
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
                              id="message"
                              name="message"
                              placeholder="Bericht"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}>
                    </textarea>
                </label>
                <button className="button" type="submit">
                    Versturen
                </button>
                {contactSuccess === true && <h5>Uw contact formulier is verzonden.{loading}</h5>}
            </form>
        </main>
            </>
    );
}

export default Contact;
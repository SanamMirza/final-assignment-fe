import React, {useState} from 'react';
import './Contact.css';
import axios from "axios";
import FormInput from "../../component/form-field/FormInput";


function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [contactSuccess, setContactSuccess] = useState(false);


    async function handleContactForm(e) {
        e.preventDefault();
        console.log(firstName, lastName, email, message);
        toggleLoading(true)
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
            <form onSubmit={handleContactForm}>
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
                <FormInput name="email-field"
                           type="text"
                           id="email-field"
                           value={email}
                           placeholder="Email"
                           clickHandler={(e) => setEmail(e.target.value)}>
                    Email:
                </FormInput>
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
                {contactSuccess === true && <p>Uw contact formulier is verzonden.{loading}</p>}
            </form>
        </main>
            </>
    );
}

export default Contact;
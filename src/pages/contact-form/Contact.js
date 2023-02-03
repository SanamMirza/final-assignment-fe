import React, {useState} from 'react';
import './Contact.css';
import axios from "axios";


function Contact() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleContactForm(e) {
        e.preventDefault();
        console.log(firstName, lastName, email, message);
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

            console.log(response.data)

        } catch (error) {
            console.error(error);

        }
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
                <label htmlFor="first-name-field">
                    Voornaam:
                    <input type="text"
                    id="first-name-field"
                    name="first-name-field"
                    placeholder="Voornaam"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label htmlFor="last-name-field">
                    Achternaam:
                    <input type="text"
                           id="last-name-field"
                           name="last-name-field"
                           placeholder="Achternaam"
                           value={lastName}
                           onChange={(e) => setLastName(e.target.value)}
                    />
                </label>
                <label htmlFor="email-field">
                    Naam:
                    <input type="text"
                           id="email-field"
                           name="email-field"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
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

            </form>
        </main>
            </>
    );
}

export default Contact;
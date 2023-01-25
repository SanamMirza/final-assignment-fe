import React, {useState} from 'react';
import axios from "axios";
import './Verhuizing.css'

function Verhuizing(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [houseNumber, setHouseNumber] =useState("");

    async function formSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/verhuizing', {
                firstName: firstName,
                lastName: lastName,
                address: address,
                zipcode: zipcode,
                houseNumber: houseNumber,
            });
            console.log(response.data)
        } catch(error) {
            console.error(error);
        }
    }

            return (
                <body className="outer-container">
                    <h1>Verhuizing</h1>
                    <h2>Geef hier uw verhuizing door</h2>
                    <section className="inner-container">
                    <form onSubmit={formSubmit}>
                        <fieldset>
                        <label htmlFor="firstname-field">
                            Voornaam
                            <input
                                type="text"
                                id="firstname-field"
                                value={firstName}
                                placeholder="Voornaam"
                                onChange={(e) => setFirstName(e.target.value)}/>
                        </label>
                        <label htmlFor="lastname-field">
                            Familienaam
                            <input
                                type="text"
                                id="lastname-field"
                                value={lastName}
                                placeholder="Familienaam"
                                onChange={(e) => setLastName(e.target.value)}/>
                        </label>
                        <label htmlFor="address-field">
                            Straat
                            <input
                                type="text"
                                id="address-field"
                                value={address}
                                placeholder="Nieuw straatnaam"
                                onChange={(e) => setAddress(e.target.value)}/>
                        </label>
                        <label htmlFor="zipcode-field">
                            Postcode
                            <input
                                type="text"
                                id="zipcode-field"
                                value={zipcode}
                                placeholder="Nieuw postcode"
                                onChange={(e) => setZipcode(e.target.value)}/>
                        </label>
                        <label htmlFor="housenumber-field">
                            Huisnummer
                            <input
                                type="text"
                                id="housenumber-field"
                                value={houseNumber}
                                placeholder="Nieuw huisnummer"
                                onChange={(e) => setHouseNumber(e.target.value)}/>
                        </label>
                        <button type="submit">
                            Versturen
                        </button>
                        </fieldset>
                    </form>
                    </section>
                </body>
            );
        }

export default Verhuizing;
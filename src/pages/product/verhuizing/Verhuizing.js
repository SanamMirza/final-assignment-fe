import React, {useContext, useState} from 'react';
import axios from "axios";
import './Verhuizing.css'
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import FormInput from "../../../component/form-field/FormInput";


function Verhuizing() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] =useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const[email,setEmail]=useState("");
    const [addSucces, toggleAddSuccess] = useState(false);
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const {isAuth, user} = useContext(AuthContext);
    const storedToken = localStorage.getItem('token');



    async function formSubmit(e) {
        e.preventDefault();
        const jwt = localStorage.getItem('token');
        const decodedToken = jwt_decode(jwt);
        const id = decodedToken.sub;

        try {
            const response = await axios.put(`http://localhost:8081/accounts/${user.id}`, {
                firstName: firstName,
                lastName: lastName,
                address: `${address}, ${houseNumber}, ${zipcode}, ${city}`,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    }})

            toggleAddSuccess(true);

        } catch(error) {
            console.error(error);
        }
    }

    function handleDoc(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }


    async function sendDoc(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`http://localhost:8081/docs/single/upload`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${storedToken}`,
                    },
                })
            toggleAddSuccess(true)
        } catch (e) {
            console.error(e)
        }
    }


            return (
                <main className="outer-container">
                    <h1>Verhuizing</h1>
                    <img src="https://media.istockphoto.com/id/1288083160/vector/happy-family-moving-into-new-house-flat-vector-illustration.jpg?s=170667a&w=0&k=20&c=6Q9wfa-kTLMxk6O_8D1pTmyaBDQzTbICXpSv7TtWo3g=" alt="verhuizing"/>
                    <h2>Geef hier uw verhuizing door</h2>
                    {isAuth ?
                    <section className="inner-container">
                    <form onSubmit={formSubmit}>
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
                        <FormInput name="address-field"
                                   type="text"
                                   id="address-field"
                                   value={address}
                                   placeholder="Straat"
                                   clickHandler={(e) => setAddress(e.target.value)}>
                            Straat:
                        </FormInput>
                        <FormInput name="housenumber-field"
                                   type="text"
                                   id="housenumber-field"
                                   value={houseNumber}
                                   placeholder="Huisnummer"
                                   clickHandler={(e) => setHouseNumber(e.target.value)}>
                            Huisnummer:
                        </FormInput>
                        <FormInput name="zipcode-field"
                                   type="text"
                                   id="zipcode-field"
                                   value={zipcode}
                                   placeholder="Postcode"
                                   clickHandler={(e) => setZipcode(e.target.value)}>
                            Postcode:
                        </FormInput>
                        <FormInput name="city-field"
                                   type="text"
                                   id="city-field"
                                   value={city}
                                   placeholder="Plaats"
                                   clickHandler={(e) => setCity(e.target.value)}>
                            Plaats:
                        </FormInput>
                        <FormInput name="email-field"
                                   type="text"
                                   id="email-field"
                                   value={email}
                                   placeholder="Email"
                                   clickHandler={(e) => setEmail(e.target.value)}>
                            Email:
                        </FormInput>
                            <p>Upload hier uw huurovereneenkomst of koopakte</p>
                            <label htmlFor="doc-upload">
                             Kies uw bestand:
                                <input type="file" name="doc-field" id="doc-upload" onChange={handleDoc}/>
                            </label>
                            <button className="button" type="submit" value="Submit">
                            Versturen
                        </button>
                            {addSucces === true && <p>Formulier is verzonden!</p>}
                        </form>
                    </section>
                        :
                        <p>U dient ingelogd te zijn om uw verhuizing door te geven. Klik <Link to="/login">hier</Link> om in te loggen</p>}
                </main>
            );
        }

export default Verhuizing;


import React, {useContext, useState} from 'react';
import axios from "axios";
import './Verhuizing.css'
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";


function Verhuizing() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [houseNumber, setHouseNumber] =useState("");
    const [zipcode, setZipcode] = useState("");
    const [plaats, setPlaats] = useState("");
    const[email,setEmail]=useState("");
    const [addSucces, toggleAddSuccess] = useState(false);
    const [file, setFile] = useState([]);
    const [previewUrl, setPreviewUrl] = useState('');
    const {isAuth} = useContext(AuthContext);
    const storedToken = localStorage.getItem('token');

    // function submit(jwt) {
    //     console.log("Formulier is verzonden");
    //
    //
    //     void formSubmit(jwt, b);
    // }


    async function formSubmit() {
        // e.preventDefault();
        const jwt = localStorage.getItem('token');
        const id = jwt_decode(jwt);
        console.log(firstName, lastName, address, houseNumber,zipcode, plaats)

        try {
            const response = await axios.put(`http://localhost:8081/accounts${id}`, {
                firstName: firstName,
                lastName: lastName,
                address: `${address}, ${houseNumber}, ${zipcode}, ${plaats}`,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    }})

            console.log(response.data)
            toggleAddSuccess(true);

        } catch(error) {
            console.error(error);
        }
    }

    function handleDoc(e) {
        const uploadedFile = e.target.files[0];
        console.log(uploadedFile);
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }


    async function sendDoc(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(`http://localhost:8081/docs/multiple/upload`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${storedToken}`,
                    },
                })
            console.log("Document")
            console.log(response);
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
                            Achternaam
                            <input
                                type="text"
                                id="lastname-field"
                                value={lastName}
                                placeholder="Achternaam"
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
                        <label htmlFor="housenumber-field">
                            Huisnummer
                            <input
                                type="text"
                                id="housenumber-field"
                                value={houseNumber}
                                placeholder="Nieuw huisnummer"
                                onChange={(e) => setHouseNumber(e.target.value)}/>
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
                        <label htmlFor="city-field">
                            Plaats
                            <input
                                type="text"
                                id="city-field"
                                value={plaats}
                                placeholder="Nieuw plaatsnaam"
                                onChange={(e) => setPlaats(e.target.value)}/>
                        </label>
                        <label htmlFor="email-field">
                            Emailadres:
                            <input
                                type="text"
                                id="email-field"
                                className="form-input-field"
                                name="email"
                                placeholder="Email-adres"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </label>
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
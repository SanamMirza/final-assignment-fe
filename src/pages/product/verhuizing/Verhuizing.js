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
    // const storedToken = localStorage.getItem('token');


    const postcodeRegex = /^\d{4}[a-zA-Z]{2}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    function handleDoc(e) {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }

    const formSubmit = async (data) => {
        console.log(data)
        toggleError(false);
        toggleLoading(true);
        const jwt = localStorage.getItem('token');
        const decodedToken = jwt_decode(jwt);
        const id = decodedToken.sub;

        try {
            const formData = new FormData();
            formData.append("file", file);
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

            console.log(data, formData)
            reset();
            setShowPopUp(true);
            // setFile(null);
            setPreviewUrl("");

        } catch(error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    function handleClose() {
        setShowPopUp(false);
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
                            inputId="street-field"
                            inputLabel="Straat"
                            placeholder="Straat"
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
                            name="address"
                            inputId="houseNumber-field"
                            inputLabel="Huisnummer"
                            placeholder="Huisnummer"
                            validationRules={{
                                required: "Huisnummer is verplicht",
                                minLength: {
                                    value: 1,
                                    message: "Huisnummer moet minimaal 1 karakter bevatten"
                                }
                            }}
                            register={register}
                            errors={errors}
                        />
                        <FormInput
                            type="text"
                            name="address"
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
                            type="text"
                            name="address"
                            inputId="city-field"
                            inputLabel="Plaats"
                            placeholder="Plaats"
                            validationRules={{
                                required: "Plaatsnaam is verplicht"
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
                        <FormInput
                            type="file"
                            name="file"
                            inputId="document"
                            inputLabel="document"
                            register={register}
                            errors={errors}
                            onChange={handleDoc}
                        />
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
                                onClose={handleClose}
                            />
                       )}
                            </form>
                    </section>
                        :
                        <p>U dient ingelogd te zijn om uw verhuizing door te geven. Klik <Link to="/login">hier</Link> om in te loggen</p>
                    }
                </main>
            );
        }


export default Verhuizing;






// async function sendDoc(e) {
//     e.preventDefault()
//     const formData = new FormData();
//     formData.append("file", file);
//     const jwt = localStorage.getItem('token');
//     const decodedToken = jwt_decode(jwt);
//     const id = decodedToken.sub;
//
//     try {
//         const response = await axios.post(`http://localhost:8081/docs/single/upload/${id}`, formData,
//             {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     "Authorization": `Bearer ${jwt}`,
//                 },
//             })
//         toggleAddSuccess(true)
//     } catch (e) {
//         console.error(e)
//     }
// }





    {/*<form onSubmit={sendDoc}>*/}
    {/*    <p>Upload hier uw huurovereneenkomst of koopakte</p>*/}
    {/*    <label htmlFor="doc-upload">*/}
    {/*        Kies uw bestand:*/}
    {/*        <input type="file" name="doc-field" id="doc-upload" onChange={handleDoc}/>*/}
    {/*    </label>*/}
    {/*    <button className="button" type="submit" value="Submit">*/}
    {/*        Versturen*/}
    {/*    </button>*/}
    {/*    {addSuccess === true && <p>Formulier is verzonden!</p>}*/}
    {/*</form>*/}
{/*</form>*/}
{/*<form onSubmit={handleSubmit(sendDoc)}>*/}
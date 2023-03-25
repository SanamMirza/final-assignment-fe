import React, {useContext, useEffect, useState} from 'react';
import './Account.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import PopUp from "../../component/pop-up-message/PopUp";
import {FaArrowLeft, FaEdit, FaSave, FaTrash} from "react-icons/fa";
import Button from "../../component/button/Button";
import {useForm} from "react-hook-form";
import ErrorMessage from "../../component/error/ErrorMessage";



function Account() {
    const {handleSubmit, reset} = useForm();
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [idAppointment, setIdAppointment] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [showPasswordField, setShowPasswordField ] = useState(false);
    const storedToken = localStorage.getItem('token');

    const {user} = useContext(AuthContext);




    useEffect(()=>{

        async function fetchPrivateData() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get('http://localhost:8081/accounts', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedToken}`
                    },
                });
                setUsers(response.data);
            }
            catch (error) {
                console.error(error);
                toggleError(true);
            }

            toggleLoading(false);
        }
        void fetchPrivateData();
    }, [])


    async function changePassword() {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.put(`http://localhost:8081/users/${user.username}`, {
                isAuth: user,
                password: password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`
                }
            }
        );
            setPassword(response.data);
            reset();
            setPasswordSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        catch(error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }



    async function userModifyAppointment(idAppointment) {
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.put(`http://localhost:8081/appointments/${idAppointment}`, {
                appointmentDate: date,
                appointmentTime: time,
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`
                }
            })

            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);


        } catch (error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }

    async function userDeleteAppointment(idAppointment) {
        toggleError(false);
        toggleLoading(true);

        try {
            const result = await axios.delete(`http://localhost:8081/appointments/${idAppointment}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storedToken}`
                }
            })

            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    async function downloadMyDocument(fileName) {
        toggleError(false);
        toggleLoading(true);

        try {
            const response = await axios.get(`http://localhost:8081/docs/downloadFrom/${fileName}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${storedToken}`,
                    },
                })
        //Deze log moet er staan om het document in de console te zien.
            console.log(response.data);

        } catch (e) {
            console.error(e)
            toggleError(true);
        }
        toggleLoading(false);
    }


    return (
        <>
        <main className="outer-container">

            {Object.keys(users).length > 0 &&
                <section className="private-container">
                    <h1>Mijn Account</h1>
                    <h1>Welkom <span>{user.username}</span></h1>
                    <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp-account" alt="template-profile"/>
                    <div className="content">
                    <h3>Uw gegevens</h3>
                    Naam: <span>{user.firstName} {user.lastName}</span> <br/>
                    Adres: <span>{user.address}</span> <br/>
                    Telefoonnummer: <span>{user.telephoneNumber}</span> <br/>
                    Email: <span>{user.email}</span> <br/>
                    Gebruikersnaam: <span>{user.username}</span> <br/>
                    Wachtwoord wijzigen
                        {showPasswordField ?
                            <form onSubmit={handleSubmit(changePassword)}>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Wachtwoord"
                                    id="password"
                                    name={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {passwordSuccess && (
                                    <div className="password-message">
                                    <span className="password-message-close"
                                          onClick={() => setPasswordSuccess(false)}> x </span>
                                        <h2 className="password-message-title">Wachtwoord is gewijzigd!</h2>
                                    </div>
                                )}
                                <Button className="button" type="button" onClick={() => changePassword(password)}>Wijzig
                                    wachtwoord</Button>

                                {loading}

                            </form>:
                            <FaEdit onClick={(e) => setShowPasswordField(true)}/>}
                            <FaArrowLeft onClick={()=> setShowPasswordField(false)}/>
                    <table>
                    <thead>
                    <tr>
                        <th>Mijn afspraken:</th>
                        <th>Datum:</th>
                        <th>Tijd:</th>
                        <th>Acties:</th>
                    </tr>
                    </thead>
                        <tbody>
                            {user.appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                <td>{appointment.subject + " "}</td>
                                        <td>{appointment.id === idAppointment ? (
                                            <select
                                                className="date-selection"
                                                name="appointment-date"
                                                id="date"
                                                value={date}
                                                onChange={(event) => setDate(event.target.value)}
                                        >
                                            <option value="">
                                                Selecteer een datum
                                            </option>
                                            <option value="2023-04-03">
                                                03-04-2023
                                            </option>
                                            <option value="2023-04-04">
                                                04-04-2023
                                            </option>
                                            <option value="2023-04-05">
                                                05-04-2023
                                            </option>
                                            <option value="2023-04-06">
                                                06-04-2023
                                            </option>
                                            <option value="2023-04-07">
                                                07-04-2023
                                            </option>
                                            <option value="2023-04-10">
                                                10-04-2023
                                            </option>
                                            <option value="2023-04-11">
                                                11-04-2023
                                            </option>
                                            <option value="2023-04-12">
                                                12-04-2023
                                            </option>
                                            <option value="2023-04-13">
                                                13-04-2023
                                            </option>
                                        </select>) : appointment.appointmentDate + " "}</td>
                                        <td>{appointment.id === idAppointment ? (
                                            <select
                                                className="time-selection"
                                                name="appointment-time"
                                                id="time"
                                                value={time}
                                                onChange={(event) => setTime(event.target.value)}
                                        >
                                        <option value="">
                                        Selecteer een tijd
                                        </option>
                                        <option value="09:00">
                                        09:00-10:00
                                        </option>
                                        <option value="10:00">
                                        10:00-11:00
                                        </option>
                                        <option value="11:00">
                                        11:00-12:00
                                        </option>
                                        <option value="12:00">
                                        12:00-13:00
                                        </option>
                                        <option value="13:00">
                                        13:00-14:00
                                        </option>
                                        <option value="14:00">
                                        14:00-15:00
                                        </option>
                                        <option value="15:00">
                                        15:00-16:00
                                        </option>
                                        </select>) : appointment.appointmentTime}</td>
                            <td><FaTrash onClick={(e) => userDeleteAppointment(appointment.id)}> </FaTrash>
                            <FaEdit onClick={(e) => setIdAppointment(appointment.id)} />
                            <FaSave onClick={(e)=> userModifyAppointment(appointment.id)}> </FaSave>
                            <FaArrowLeft onClick={() => setIdAppointment(0)} />
                            </td>
                            </tr>))}
                        </tbody>
                    </table>
                        {showPopUp && (
                            <PopUp
                                title="Uw Afspraak is gewijzigd/verwijderd! De pagina wordt nu ververst!"
                                onClose={() => setShowPopUp(false)}
                            />
                        )}
                        {loading}
                        <table>
                            <thead>
                            <tr>
                                <th>Mijn documenten</th>
                            </tr>
                            </thead>
                            <tbody>
                            {user.fileUploads.map(file => (
                                    <tr key={file.id}>
                                        <td>{file.fileName + " "}
                                            <Button type="button" className="button" onClick={()=> downloadMyDocument(file.fileName)}>Download</Button></td>
                                    </tr>
                                ))}
                            {error && (
                                <ErrorMessage
                                    title="Error"
                                    text="Er ging iets fout, probeer het nog een keer!"
                                    onClose={() => toggleError(false) }
                                />
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>
            }
        </main>
                </>
    );
}

export default Account;


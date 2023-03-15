import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Account.css';
import {FaPen, FaSave, FaTrash} from "react-icons/fa";
import jwt_decode from "jwt-decode";



function Account() {
    const [subject, setSubject] = useState("");
    const [users, setUsers] = useState([]);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [modifySuccess, setModifySuccess] = useState(false);
    const storedToken = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [update, toggleUpdate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');

    const {user} = useContext(AuthContext);




    useEffect(()=>{


        async function fetchPrivateData() {
            toggleError(false);
            toggleLoading(true);

            try {
                const response = await axios.get('http://localhost:8081/accounts', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
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



    async function userModifyAppointment(idAppointment, data) {
        setSubject(subject);
        toggleUpdate(true);
        try {
            const result = await axios.put(`http://localhost:8081/appointments/${idAppointment}`, data, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(result.data)
            console.log(`Appointment with id ${idAppointment} has been modified`)
            setModifySuccess(true)
        } catch (error) {
            console.error(error);
        }
    }

    async function userDeleteAppointment(idAppointment) {

        try {
            const result = await axios.delete(`http://localhost:8081/appointments/${idAppointment}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(result.data)
            console.log(`Appointment with id ${idAppointment} has been deleted`)
            setDeleteSuccess(true)
        } catch (error) {
            console.error(error);
        }
    }

    async function downloadMyDocument(fileName) {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);


        try {
            const response = await axios.get(`http://localhost:8081/docs/downloadFromDB/${fileName}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`,
                    },
                })
            console.log(response.data)
            console.log(`download ${fileName} gelukt`)

        } catch (e) {
            console.error(e)
        }
    }



    return (
        <>
        <main className="outer-container">

            {Object.keys(users).length > 0 &&
                <section className="private-container">
                    <h1>Mijn Account</h1>
                    <h1>Welkom <span>{user.username}</span></h1>
                    <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="login-pfp-account" alt="template-profile-picture" />
                    <div className="content">
                    <h3>Uw gegevens</h3>
                    <h3>Voornaam: <span>{user.firstName}</span></h3>
                    <h3>Achternaam: <span>{user.lastName}</span></h3>
                    <h3>Adres: <span>{user.address}</span></h3>
                    <h3>Telefoonnummer: <span>{user.telephoneNumber}</span></h3>
                    <h3>Email: <span>{user.email}</span></h3>
                    <table>
                    <thead>
                    <tr>
                        <th>Mijn afspraken:</th>
                        <th>Datum:</th>
                        <th>Tijd:</th>
                        <th>Delete:</th>
                    </tr>
                    </thead>
                        <tbody>
                            {users.map(user => (
                            user.appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>{appointment.subject + " "}</td>
                                <td>{update ?  (<select className="date-selection"
                                                       name="appointment-date"
                                                        placeholder={date}
                                                       id="date"
                                                       value={date}
                                                       onChange={(event) => setDate(event.target.value)}
                                >
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
                            <td>{update ? (<select className="time-selection"
                                                   name="appointment-time"
                                                   placeholder={time}
                                                   id="time"
                                                   value={time}
                                                   onChange={(event) => setTime(event.target.value)}
                            >
                                <option value="09:00-10:00">
                                    09:00-10:00
                                </option>
                                <option value="10:00-11:00">
                                    10:00-11:00
                                </option>
                                <option value="11:00-12:00">
                                    11:00-12:00
                                </option>
                                <option value="12:00-13:00">
                                    12:00-13:00
                                </option>
                                <option value="13:00-14:00">
                                    13:00-14:00
                                </option>
                                <option value="14:00-15:00">
                                    14:00-15:00
                                </option>
                                <option value="15:00-16:00">
                                    15:00-16:00
                                </option>
                            </select>) : appointment.appointmentTime}</td>
                            <td><FaTrash onClick={(e) => userDeleteAppointment(appointment.id)}> </FaTrash>
                            <FaPen onClick={(e) => toggleUpdate(!update)} />
                            <FaSave onClick={()=> userModifyAppointment(appointment.id)}>Save</FaSave></td></tr>))))
                            }
                        </tbody>
                    </table>
                        {deleteSuccess === true && <p><strong>Afspraak is verwijderd.{loading}</strong></p>}
                        {modifySuccess === true && <p><strong>Afspraak is gewijzigd.{loading}</strong></p>}
                        <table>
                            <thead>
                            <tr>
                                <th>Mijn documenten</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user =>(
                                user.fileUploads.map(file => (
                                    <tr key={file.id}>
                                        <td>{file.fileName + " "}
                                            <button onClick={()=> downloadMyDocument(file.fileName)}>Download</button></td>
                                    </tr>
                                ))
                                ))}
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


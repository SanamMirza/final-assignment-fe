import React, {useContext, useEffect, useState} from 'react';
import './Account.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import PopUp from "../../component/pop-up-message/PopUp";
import {FaArrowAltCircleLeft, FaEdit, FaPen, FaSave, FaTrash} from "react-icons/fa";



function Account() {
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [modifySuccess, setModifySuccess] = useState(false);
    const storedToken = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [idAppointment, setIdAppointment] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [password, setPassword] = useState("");

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


    async function changePassword(username) {
        toggleError(false);
        toggleLoading(true);
        try {
            const response = await axios.put(`http://localhost:8081/users/${username}`, {
                password: password,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
            });
            setPassword(response.data);

        }
        catch(error) {
            console.error(error);
            toggleError(true);
        }
        toggleLoading(false);
    }



    async function userModifyAppointment(idAppointment) {

        try {
            const result = await axios.put(`http://localhost:8081/appointments/${idAppointment}`, {
                appointmentDate: date,
                appointmentTime: time,
            },
            {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(result.data);
            console.log(`Appointment with id ${idAppointment} has been modified`);
            setModifySuccess(true);
            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);


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
            setShowPopUp(true);
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

    function handleClose() {
        setShowPopUp(false);
    }

    function handleCancel() {
        setCancel(true);
    }

    if (cancel) {
        return <h4>Annulering voltooid</h4>
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
                    Naam: <span>{user.firstName} {user.lastName}</span> <br/>
                    Adres: <span>{user.address}</span> <br/>
                    Telefoonnummer: <span>{user.telephoneNumber}</span> <br/>
                    Email: <span>{user.email}</span> <br/>
                    Gebruikersnaam: <span>{user.username}</span> <br/>
                    Wachtwoord wijzigen {user === password ? (
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(event)=> setPassword(event.target.value)}
                            />) :
                        <FaEdit onClick={(e) => setPassword(password)}/>}

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
                            {user.appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                <td>{appointment.subject + " "}</td>
                                <td>{appointment.id === idAppointment ?  (<select className="date-selection"
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
                            <td>{appointment.id === idAppointment ? (<select className="time-selection"
                                                                             name="appointment-time"
                                                                             placeholder={time}
                                                                             id="time"
                                                                             value={time}
                                                                             onChange={(event) => setTime(event.target.value)}
                            >
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
                            <FaPen onClick={(e) => setIdAppointment(appointment.id)} />
                            <FaSave onClick={(e)=> userModifyAppointment(appointment.id)}> </FaSave>
                            <FaArrowAltCircleLeft onClick={()=> window.location.reload()}/></td>
                            </tr>))}
                        </tbody>
                    </table>
                        {deleteSuccess === true && <h4><strong>Uw afspraak is verwijderd.{loading}</strong></h4>}
                        {modifySuccess === true && <h4><strong>Uw afspraak is gewijzigd. De pagina wordt verversd! {loading}</strong></h4>}
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
                        {showPopUp && (
                            <PopUp
                                title="Uw Afspraak is gewijzigd!"
                                onClose={handleClose}
                            />
                        )}

                    </div>
                </section>
            }
        </main>
                </>
    );
}

export default Account;


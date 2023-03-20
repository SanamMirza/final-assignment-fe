import React, {useContext, useEffect, useState} from 'react';
import './Account.css';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import PopUp from "../../component/pop-up-message/PopUp";
import {FaArrowAltCircleLeft, FaArrowLeft, FaEdit, FaPen, FaSave, FaTrash} from "react-icons/fa";
import Button from "../../component/button/Button";
import {useForm} from "react-hook-form";
import FormInput from "../../component/form-field/FormInput";



function Account() {
    const {handleSubmit, reset} = useForm();
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const storedToken = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [idAppointment, setIdAppointment] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
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
                        Authorization: `Bearer ${storedToken}`
                }
            }
        );
            setPassword(response.data);
            console.log(`Password has been changed`);
            reset();
            setShowPopUp(true);

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
            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
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
                    Naam: <span>{user.firstName} {user.lastName}</span> <br/>
                    Adres: <span>{user.address}</span> <br/>
                    Telefoonnummer: <span>{user.telephoneNumber}</span> <br/>
                    Email: <span>{user.email}</span> <br/>
                    Gebruikersnaam: <span>{user.username}</span> <br/>
                    Wachtwoord wijzigen <FaEdit onClick={(e) => setPassword(password)}/>
                        <form onSubmit={handleSubmit(changePassword)}>
                            <input
                                type="password"
                                value={password}
                                placeholder="Wachtwoord"
                                id="password"
                                name={password}
                                // register={register}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                            <Button className="button" type="button" onClick={() => changePassword(password)}>Wijzig wachtwoord</Button>
                            {showPopUp && (
                                <PopUp
                                    title="Uw wachtwoord is gewijzigd!"
                                    onClose={() => setShowPopUp(false)}
                                />
                            )}
                            {loading}
                        </form>


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
                                        <td>{appointment.id === idAppointment ? (<select className="date-selection"
                                                                                         name="appointment-date"
                                                                                         placeholder={date}
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
                                        <td>{appointment.id === idAppointment ? (<select className="time-selection"
                                        name="appointment-time"
                                        placeholder={time}
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


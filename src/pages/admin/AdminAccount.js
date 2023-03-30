import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './AdminAcoount.css';
import {FaEdit, FaSave, FaTrash, FaUsers} from "react-icons/fa";
import Button from "../../component/button/Button";
import PopUp from "../../component/pop-up-message/PopUp";
import ErrorMessage from "../../component/error/ErrorMessage";



function AdminAccount() {
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(
        localStorage.getItem('showUsers') === 'true');
    const [loading, toggleLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [error, toggleError] = useState(false);
    const [idAppointment, setIdAppointment] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);
    const {user} = useContext(AuthContext);
    const storedToken = localStorage.getItem('token');


    useEffect(() => {

        async function fetchUser() {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/accounts`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${storedToken}`
                    },
                });

                const filteredUsers = result.data.filter((user) => user.authorities.includes("USER"));

                setUsers(filteredUsers);

            } catch (error) {
                console.error(error);
                toggleError(true);
            }

            toggleLoading(false);
        }

        void fetchUser();
    }, [])


    async function deleteAppointment(idAppointment) {
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
            }, 2000);

        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    async function adminModifyAppointment(idAppointment) {
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
                });

            setShowPopUp(true);
            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            console.error(error);
            toggleError(true);
        }
    }

    async function downloadDoc(fileName) {
        const jwt = localStorage.getItem('token');

        try {
            const response = await axios.get(`http://localhost:8081/docs/downloadFrom/${fileName}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${jwt}`,
                    },
                })
            // deze log staat er om het gedownloade document in de log te kunnen zien.
            console.log(response.data);

        } catch (e) {
            console.error(e)
            toggleError(true);
        }
    }

    useEffect(() => {
        localStorage.setItem('showUsers', showUsers);
    }, [showUsers]);


    function handleShow() {
        setShowUsers(!showUsers);
    }



    return (
        <div className="admin">
            <div className="admin-container">
            <h1> Welkom {user.username} !</h1>
            <section>
                <h2>Overzicht van users</h2>
                <p>Klik op de knop "Overzicht van users" om de user gegevens op te halen</p>
                <p> Acties : </p>
                <ul>
                    <p>U kunt de tijden en datum van de afspraken wijzigen met <FaEdit/> icoon</p>
                    <p>De wijzigingen dient u op te slaan met <FaSave/> icoon</p>
                    <p>De afspraken kunnen ook verwijderd worden met <FaTrash/> icoon </p>
                </ul>
                <p>Documenten : De documenten van de users kunnen gedownload worden.</p>
                <p className="let-op">Let op! Nadat een afspraak is gewijzgd of verwijderd, zal de pagina verversd worden!</p>
                <p>De NAW gegevens en de documenten van de users mag niet door Admin gewijzigd of verwijderd worden. Dit dient de user zelf te doen via de users account.</p>
                <Button
                    type="button"
                    onClick={handleShow}
                    className="button"
                >
                    {showUsers ? 'Sluiten' : 'Overzicht van users'}
                    <FaUsers/></Button>
                {showUsers &&
                <table>
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Gebruikersnaam</th>
                        <th>Telefoonnummer</th>
                        <th>Adresgegevens</th>
                        <th>Afspraak</th>
                        <th className="table-date">Datum afspraak</th>
                        <th>Tijd afspraak</th>
                        <th>Acties</th>
                        <th>Documenten</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.telephoneNumber}</td>
                            <td>{user.address}, {user.zipCode}</td>
                            <td>
                                {user.appointments.map((appointment) => (
                                <span key={appointment.id}>{appointment.subject + " "}</span>
                            ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <span key={appointment.id}>
                                        {appointment.id === idAppointment ?  (
                                            <select
                                                className="date-selection"
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
                                            </select>) : appointment.appointmentDate + " "}</span>
                                ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <span key={appointment.id}>
                                        {appointment.id === idAppointment ? (
                                            <select
                                                className="time-selection"
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
                                            </select>) : appointment.appointmentTime + " "}</span>
                            ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <span key={appointment.id}>
                                    <FaTrash onClick={() => deleteAppointment(appointment.id)} />
                                    <FaEdit onClick={() => setIdAppointment(appointment.id)} />
                                    <FaSave onClick={(e)=> adminModifyAppointment(appointment.id)} />
                                    </span>
                            ))}
                            </td>
                            <td>
                                {user.fileUploads.map(file => (
                                        <span key={file.id}>
                                            <span>{file.fileName + " "}
                                                <Button type="button" className="button" onClick={()=> downloadDoc(file.fileName)}>Download</Button></span>
                                        </span>
                                    ))}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>}
                {showPopUp && (
                    <PopUp
                        title="De wijzigingen worden opgeslagen!
                                    De pagina wordt nu ververst!"
                        onClose={() => setShowPopUp(false)}
                    />
                )}
                {error && (
                    <ErrorMessage
                        title="Error"
                        text="Er ging iets fout, probeer het nog een keer!"
                        onClose={() => toggleError(false) }
                    />
                )}
                {loading}
                <p>Klaar met werken? Vergeet niet alles netjes af te sluiten & uit te loggen. (ivm gevoelige informtie)😉!</p>
            </section>
        </div>
        </div>

    );

}





export default AdminAccount;

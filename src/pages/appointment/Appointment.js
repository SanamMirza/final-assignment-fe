import React, {useContext, useState} from 'react';
import axios from "axios";
import './Appointment.css';
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";



function Appointment() {

    const [subject, setSubject] = useState('paspoort aanvragen');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [appointments, setAppointments] = useState("")
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);
    const [appointmentSuccess, setAppointmentSuccess] = useState(false);

    const {isAuth, user} = useContext(AuthContext);




        async function appointmentSubmit(e) {
            e.preventDefault();
            console.log(subject, date, time);
            const jwt = localStorage.getItem('token');
            const id = jwt_decode(jwt);
            setError(false);
            toggleLoading(true);
            try {
                const result = await axios.post(`http://localhost:8081/appointments/${user.username}`, {
                subject: subject,
                appointmentDate: date,
                appointmentTime: time,
                id: id
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                }});

            setAppointments(result.data)
            setAppointmentSuccess(true)

        } catch (error) {
        console.error(error);
        setError(true)
    }
        toggleLoading(false);
    }






        return (

            <main className="outer-container">
                <h1>Maak hier een afspraak</h1>
                {isAuth ?
                        <form onSubmit={appointmentSubmit}>
                            <label htmlFor="subject">
                                Product:
                                <select className="product-selection"
                                        name="appointment-subject"
                                        id="subject"
                                        value={subject}
                                        onChange={(event) => setSubject(event.target.value)}
                                >
                                    <option value="new-passport-id">
                                        Passpoort/ID aanvragen
                                    </option>
                                    <option value="report-relocation">
                                        Verhuizing doorgeven
                                    </option>
                                    <option value="apply-for-benefits">
                                        Subsidie aanvragen
                                    </option>
                                    <option value="apply-for-surcharge">
                                        Toeslagen aanvragen(woon, energie etc)
                                    </option>
                                    <option value="parking">
                                        Parkeervergunning aanvragen
                                    </option>
                                </select>
                            </label>
                            <label htmlFor="time">
                                Time:
                                <select className="time-selection"
                                        name="appointment-time"
                                        id="time"
                                        value={time}
                                        onChange={(event) => setTime(event.target.value)}
                                >
                                    <option value="09:00:00">
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
                                </select>
                            </label>
                            <label htmlFor="date">
                                Date:
                                <select className="date-selection"
                                        name="appointment-date"
                                        id="date"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                >
                                    <option value="2023-02-08">
                                        2023-02-08
                                    </option>
                                    <option value="2023-02-09">
                                        2023-02-09
                                    </option>
                                    <option value="2023-02-10">
                                        2023-02-10
                                    </option>
                                    <option value="2023-02-13">
                                        2023-02-13
                                    </option>
                                    <option value="2023-02-14">
                                        2023-02-14
                                    </option>
                                    <option value="2023-02-15">
                                        2023-02-15
                                    </option>
                                    <option value="2023-02-16">
                                        2023-02-16
                                    </option>
                                    <option value="2023-02-17">
                                        2023-02-17
                                    </option>
                                    <option value="2023-02-18">
                                        2023-02-18
                                    </option>
                                </select>
                            </label>
                            <button className="button"
                                    type="submit">
                                Maak afspraak
                            </button>
                            {appointmentSuccess === true && <p>Afspraak is gemaakt.{loading}</p>}
                        </form>
                    :
                    <>
                    <h3>U dient eerst ingelogd te zijn, om een afspraak in te plannen. Klik <Link
                        to="/login">hier</Link> om in te loggen.</h3>
                    <h3>Of <Link to="/register">hier</Link> om u zich te
                    registreren, als u nog geen account heeft.</h3>
                    </>
                }
            </main>
        );

}

export default Appointment;
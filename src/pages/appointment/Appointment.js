import React, {useContext, useState} from 'react';
import axios from "axios";
import './Appointment.css';
import jwt_decode from "jwt-decode";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import Button from "../../component/button/Button";
import PopUp from "../../component/pop-up-message/PopUp";
import {useForm} from "react-hook-form";


function Appointment() {
    const { reset } = useForm();
    const [showPopUp, setShowPopUp] = useState(false);
    const [subject, setSubject] = useState("1001");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [appointments, setAppointments] = useState("")
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(false);


    const {isAuth, user} = useContext(AuthContext);




        async function appointmentSubmit(e) {
            e.preventDefault();
            console.log(subject, date, time);
            const jwt = localStorage.getItem('token');

            setError(false);
            toggleLoading(true);
            try {
                const result = await axios.post(`http://localhost:8081/appointments/${user.username}/${subject}`, {
                appointmentDate: date,
                appointmentTime: time,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`,
                }});

            setAppointments(result.data)
                reset();
                setShowPopUp(true);

        } catch (error) {
        console.error(error);
        setError(true)
    }
        toggleLoading(false);
    }


    function handleClose() {
            setShowPopUp(false);
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
                                    <option value="1001">
                                        Passpoort/ID aanvragen
                                    </option>
                                    <option value="1005">
                                        Verhuizing doorgeven
                                    </option>
                                    <option value="1004">
                                        Subsidie aanvragen
                                    </option>
                                    <option value="1004">
                                        Toeslagen aanvragen(woon, energie etc)
                                    </option>
                                    <option value="1002">
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
                                </select>
                            </label>
                            <Button
                                className="button"
                                type="submit"
                                children="Maak afspraak"
                            />
                            {showPopUp && (
                                <PopUp
                                    title="Uw afspraak is gemaakt!"
                                    onClose={handleClose}
                                    />
                                )}
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
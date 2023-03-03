import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Account.css';


function Account() {
    const [accountData, setAccountData] = useState({});
    const [deleteAppointment, setDeleteAppointment] = useState(false);
    const storedToken = localStorage.getItem('token');
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

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
                setAccountData(response.data);
            }
            catch (error) {
                console.error(error);
                toggleError(true);
            }

            toggleLoading(false);
        }
        void fetchPrivateData();
    }, [])

    return (
        <>
        <main className="outer-container">

            {Object.keys(accountData).length > 0 &&
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

                    <h3>Afspraken:
                        {user.appointments.map((appointment, index) => {
                            return <div key={index}> {appointment.subject + " "}
                        {user.appointments.map((appointment) => {
                            return appointment.appointmentDate + " " })}
                        {user.appointments.map((appointment) => {
                            return appointment.appointmentTime + " " })}
                            </div>
                        })}</h3>
                        <button type="button" className="button">Afsrpraak verwijderen</button>
                    </div>
                </section>
            }
        </main>
                </>
    );
}

export default Account;
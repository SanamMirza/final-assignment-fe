import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Account.css';

function Account() {
    const [accountData, setAccountData] = useState({});
    const storedToken = localStorage.getItem('token');
    const {user} = useContext(AuthContext);


    useEffect(()=>{


        async function fetchPrivateData() {

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
            }
        }
        void fetchPrivateData();
    }, [])

    return (
        <>
        <main className="outer-container">

            {Object.keys(accountData).length > 0 &&
                <section className="private-container">
                    <h1>Account pagina</h1>
                <h3>Welkom <span>{user.username}</span></h3>
                    <h3>Uw gegevens:</h3>
                    <h3>Voornaam: <span>{user.firstName}</span></h3>
                    <h3>Achternaam: <span>{user.lastName}</span></h3>
                    <h3>Adres: <span>{user.address}</span></h3>
                    <h3>Telefoonnummer: <span>{user.telephoneNumber}</span></h3>
                    <h3>Email: <span>{user.email}</span></h3>

                    <h3>Afspraken: <span>{user.appointments}</span></h3>
                </section>
            }
        </main>
                </>
    );
}

export default Account;
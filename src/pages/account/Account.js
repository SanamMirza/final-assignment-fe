import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


function Account() {
    const [accountData, setAccountData] = useState({});
    const {user} = useContext(AuthContext);



    useEffect(()=>{

        const storedToken = localStorage.getItem('token')

        async function fetchPrivateData() {

            try {
                const response = await axios.get('http://localhost:8081/accounts', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    },
                });
                setAccountData(response.data);
                console.log(response);
            }
            catch (error) {
                console.error(error);
            }
        }
        void fetchPrivateData();
    }, [])

    return (
        <>
        <div className="container">
    <h1>Account pagina</h1>
            <p>Welkom <span>{user.username}</span></p>
            {Object.keys(accountData).length > 0 &&
                <section>
                    <p>Uw gegevens:</p>
                    <p>Voornaam: <span>{accountData[0].firstName}</span></p>
                    <p>Achternaam: <span>{accountData[0].lastName}</span></p>
                    <p>Adres: <span>{accountData[0].address}</span></p>
                    <p>Telefoonnummer: <span>{accountData[0].telephoneNumber}</span></p>
                    <p>Email: <span>{accountData[0].emailAddress}</span></p>

            <p>Aangevraagde producten</p>
                    <p>Afspraken: <span>{accountData[0].appointments}</span></p>
                </section>
            }
        </div>
                </>
    );
}

export default Account;
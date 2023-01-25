import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import AuthContext from "../../context/AuthContext";


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
        <main className="container">
    <h1>Account</h1>
            <p>Welkom <span>{user}</span></p>
            <p>Aangevraagde producten{accountData}</p>

        </main>
    );
}

export default Account;
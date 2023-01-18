import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import AuthContext from "../../context/AuthContext";


function Account() {
    const [privateContent, setPrivateContent] = useState({});
    const {user : {username}} = useContext(AuthContext);


    useEffect(()=>{

        const storedToken = localStorage.getItem('token')

        async function fetchPrivateData() {

            try {
                const response = await axios.get('http://localhost:3000/account', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setPrivateContent(response.data)
                console.log(response)

            }
            catch (error) {
                console.error(error)
            }
        }
        void fetchPrivateData();
    }, [])

    return (
        <main className="container">
    <h1>Account</h1>
            {/*<p>Welkom <span>{username}</span></p>*/}
            <p>Aangevraagde producten{privateContent}</p>

        </main>
    );
}

export default Account;
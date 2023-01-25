import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext ({});

function AuthContextProvider ({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const decodedToken = jwt_decode(storedToken);

                void fetchUserData(storedToken, decodedToken.sub);
        } else {
            setAuth( {
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }, [])

    function login(jwt) {
        console.log("De gebruiker is ingelogd 🔓");
        localStorage.setItem('token', jwt);
        const decodedToken = jwt_decode(jwt);

        void fetchUserData(jwt, decodedToken.sub, "/account");
    }
        async function fetchUserData(jwt, id, redirect) {
            try {
                const response = await axios.get(`http://localhost:8081/users/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    }
                });
                setAuth({
                    isAuth: true,
                    user: {
                        email: response.data.email,
                        id: response.data.id,
                        username: response.data.username
                    },
                    status: "done"
                })
                if (redirect) {
                    navigate(redirect)
                }
                console.log(response)
            }
            catch (error) {
                console.error(error);
                setAuth({
                    ...auth,
                    status: "done"
                })
            }
        }


    function logout() {
        console.log("De gebruiker is uitgelogd 🔒")
        localStorage.removeItem('token')
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        })
        navigate("/")
    }

    const contextData ={
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status,
        login: login,
        logout: logout
    }

    return (
        <AuthContext.Provider value={contextData}>
            { auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
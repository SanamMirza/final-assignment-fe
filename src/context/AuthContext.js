import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";


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
            if (Math.floor(Date.now() / 1000) < decodedToken.exp) {
                console.log("De gebruiker is nog steeds ingelogd 🔓");
                void fetchUserData(storedToken, decodedToken.id);
            } else {
                console.log("De token is verlopen");
                localStorage.removeItem('token');
            }
        } else {
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            });
        }
    }, []);

    function login(jwt) {
        console.log("De gebruiker is ingelogd 🔓");
        localStorage.setItem('token', jwt);
        const decodedToken = jwt_decode(jwt);

        void fetchUserData(jwt, decodedToken.id, "/account");
    }
        async function fetchUserData(jwt, id, redirect) {
            try {
                const response = await axios.get('http://localhost:3000/', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    }
                });
                setAuth({
                    ...auth,
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
        console.log("de gebruiker is uitgelogd 🔒")
        localStorage.removeItem('token')
        setAuth({
            ...auth,
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

export default AuthContext;
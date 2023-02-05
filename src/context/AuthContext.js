import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext ({});

function AuthContextProvider ({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
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
                status: "done",
            });
        }
    }, [])

    function login(jwt) {
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
                },
            });
            setAuth({
                isAuth: true,
                user: {
                        username: response.data.username,
                        firstName: response.data.accountDto.firstName,
                        lastName: response.data.accountDto.lastName,
                        address: response.data.accountDto.address,
                        telephoneNumber: response.data.accountDto.telephoneNumber,
                        email: response.data.email,
                        appointments: response.data.accountDto.appointments,
                        id: response.data.id,
                    },
                status: "done",
            })
            if (redirect) {
                navigate(redirect)
            }
        }
        catch (error) {
            console.error(error);
            setAuth({
                ...auth,
                status: "done",
            });
        }
    }



    function logout() {
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
        logout: logout,
        fetchUserData,

    };

    return (
        <AuthContext.Provider value={contextData}>
            { auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
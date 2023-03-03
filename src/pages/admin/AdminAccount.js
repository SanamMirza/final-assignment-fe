import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './AdminAcoount.css';
import '../../assets/remove-rubbish-svgrepo-com.svg';
import jwt_decode from "jwt-decode";
import {FaPen} from "react-icons/fa";



function AdminAccount() {
    const [users, setUsers] = useState([]);
    // const [modifyAppointment, setModifyAppointment] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [showFoldOut, setShowFoldOut] = useState(false);
    const {isAuth, user} = useContext(AuthContext);
    const storedToken = localStorage.getItem('token');


    useEffect(() => {


        async function fetchUser() {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/accounts`);

                setUsers(result.data);
                console.log(result.data)
            } catch (error) {
                console.error(error);
                toggleError(true);
            }

            toggleLoading(false);
        }

        void fetchUser();
    }, [])


    async function deleteAppointment(idAppointment) {
        console.log(idAppointment)
        try {
            const result = await axios.delete(`http://localhost:8081/appointments/${idAppointment}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(result.data)
            console.log(`Appointment with id ${idAppointment} has been deleted`)
            setDeleteSuccess(true)
        } catch (error) {
            console.error(error);
        }
    }

    async function modifyAppointment(idAppointment) {
        console.log(idAppointment)
        try {
            const result = await axios.put(`http://localhost:8081/appointments/${idAppointment}`, {
                // appointmentDate: appointmentDate,
                // appointmentTime: appointmentTime,
                // subject: subject,

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${storedToken}`
                }
            })

            console.log(result.data)
            console.log(`Appointment with id ${idAppointment} has been modified`)
            setDeleteSuccess(true)
        } catch (error) {
            console.error(error);
        }
    }

    async function downloadDoc(fileName) {
        const jwt = localStorage.getItem('token');
        const decodedToken = jwt_decode(jwt);


        try {
            const response = await axios.get(`http://localhost:8081/docs/downloadFromDB/${fileName}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${jwt}`,
                    },
                })
            console.log(response.data)
            console.log(`download ${fileName} gelukt`)

        } catch (e) {
            console.error(e)
        }
    }



    // function handleFoldOut() {
    //     setShowFoldOut(!showFoldOut);
    // }


    return (
        <div>
            <h1>Adminpage</h1>
            <section>
                <h2>Users</h2>
                <h3>Overzicht van users</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Voornaam</th>
                        <th>Achternaam</th>
                        <th>Gebruikersnaam</th>
                        <th>Telefoonnummer</th>
                        <th>Adresgegevens</th>
                        <th>Afspraak</th>
                        <th className="table-date">Datum afspraak</th>
                        <th>Tijd afspraak</th>
                        <th>Verwijderen afspraak</th>
                        <th>Documenten</th>
                    </tr>
                    </thead>
                    <tbody>

                    {users.map((user, index) => {
                        return <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            {/*<td><button type="button"*/}
                            {/*            onClick={handleFoldOut}>Show More</button></td>*/}
                            {/*   <div className={showFoldOut ? "table-row" : "table-none"}>*/}
                            <td>{user.username}</td>
                            <td>{user.telephoneNumber}</td>
                            <td>{user.address}</td>
                            <td>{user.appointments.map((appointment, index) => {
                                return <p key={index}> {appointment.subject + " "}</p>
                            })} </td>
                            <td>{user.appointments.map((appointment, index) => {
                                return <p key={index}>{appointment.appointmentDate + " "}</p>
                            })} </td>
                            <td>{user.appointments.map((appointment, index) => {
                                return <p key={index}>{appointment.appointmentTime + " "}</p>
                            })} </td>
                            <td> {user.appointments.map((appointment, index) => {
                                return <button key={index} type="button" className="delete"
                                               onClick={(e) => deleteAppointment(appointment.id)}
                                > delete </button>
                            })} </td> <td><p><FaPen onClick={modifyAppointment}/></p></td>
                            <td> {user.fileUploads.map((fileUpload, index) => {
                                return <p key={index}> {fileUpload.fileName} </p>
                            })} {user.fileUploads.map((fileUpload, index) => { return <button key={index} type="button" className="delete" onClick={() => downloadDoc(fileUpload.fileName) }>download</button> })}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
                {deleteSuccess === true && <p>Afspraak is verwijderd.{loading}</p>}
            </section>
        </div>

    );

}


{/*<td>{user.appointments.map((appointment)=>{*/
}
{/*   return appointment.appointmentDate + " "*/
}
{/*   })}</td>*/
}
{/*<td>{user.appointments.map((appointment)=>{*/
}
{/*   return appointment.appointmentTime + " "*/
}
{/*   })}</td>*/
}
{/*<td>{user.appointments.map((appointment)=>{*/
}
{/*   return <button type="button" className="delete"*/
}
{/*       onClick={(e)=>deleteApp(e,appointment.id)}*/
}
{/*       > delete </button>*/
}
{/*   })}</td>*/  // <button key={index} type="button" className="delete" onClick={() => modifyAppointment(appointment.id)}>wijzigen</button> })}
}


export default AdminAccount;
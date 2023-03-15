import React, {Fragment, useContext, useEffect, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './AdminAcoount.css';
import '../../assets/remove-rubbish-svgrepo-com.svg';
import jwt_decode from "jwt-decode";
import {FaEdit, FaPen, FaTrash, FaTrashAlt} from "react-icons/fa";
import appointment from "../appointment/Appointment";




function AdminAccount() {
    const [users, setUsers] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);
    const {isAuth, user} = useContext(AuthContext);
    const storedToken = localStorage.getItem('token');



    useEffect(() => {


        async function fetchUser() {
            toggleError(false);
            toggleLoading(true);

            try {
                const result = await axios.get(`http://localhost:8081/accounts`);
                const filteredUsers = result.data.filter(user => user.authority !== "ADMIN");
                setUsers(filteredUsers);
                console.log(filteredUsers)

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
            console.log(`download ${fileName} successful`)

        } catch (e) {
            console.error(e)
        }
    }



    const toggleRow = (rowIndex) => {
        setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
    }



    return (
        <div className="admin">
            <div className="admin-container">
            <h1>Admin account</h1>
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
                        <th>Acties</th>
                        <th>Documenten</th>

                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.username}</td>
                            <td>{user.telephoneNumber}</td>
                            <td>{user.address}</td>
                            <td>
                            {user.appointments.map((appointment) => (
                                <div key={appointment.id}>{appointment.subject}</div>
                            ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <div key={appointment.id}>{appointment.appointmentDate}</div>
                                ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <div key={appointment.id}>{appointment.appointmentTime}</div>
                            ))}
                            </td>
                            <td>
                                {user.appointments.map((appointment) => (
                                    <div>
                                    <FaTrash onClick={() => deleteAppointment(appointment.id)} />
                                    <FaEdit onClick={() => modifyAppointment(appointment.id)} />
                                    </div>
                            ))}
                            </td>
                            <td>
                                {user.fileUploads.map((file) => (
                                    <div key={file.id}>{file.fileName}</div>
                                ))}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                {deleteSuccess === true && <p>Afspraak is verwijderd.{loading}</p>}
            </section>
        </div>
        </div>

    );

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

/*{users.map((user, index) => {
    return <tr key={index}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.username}</td>
        <td>{user.telephoneNumber}</td>
        <td>{user.address}</td>
        <td>{user.appointments.map((appointment, index) => {
            return <p key={index}>{appointment.subject + " "}</p>
        })}</td>
        <td>{user.appointments.map((appointment, index) => {
            return <p key={index}>{appointment.appointmentDate + " "}</p>
        })}</td>
        <td>{user.appointments.map((appointment, index) => {
            return <p key={index}>{appointment.appointmentTime + " "}</p>
        })}</td>
        <td> {user.appointments.map((appointment, index) => {
            return <button key={index} type="button" className="delete"
                           onClick={(e) => deleteAppointment(appointment.id)}
            > delete </button>
        })} </td>
        <td><p><FaPen onClick={modifyAppointment}/></p></td>
        <td> {user.fileUploads.map((fileUpload, index) => {
            return <p key={index}> {fileUpload.fileName} </p>
        })} {user.fileUploads.map((fileUpload, index) => {
            return <button key={index} type="button" className="delete"
                           onClick={() => downloadDoc(fileUpload.fileName)}>download</button>
        })}</td>
    </tr>
})}*/
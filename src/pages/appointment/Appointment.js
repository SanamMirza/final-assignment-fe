import React, {useEffect, useState} from 'react';
import axios from "axios";
import Calendar from "react-calendar";
import './Appointment.css';



function Appointment() {
    const [subjects, setSubjects] = useState('');
    const [dateState, setDateState] = useState(new Date());
    const [time, setTime] = useState('');
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState('');

    const changeDate = (e) => {
        setDateState(e)
    }

    useEffect(()=> {
    async function fetchAppointments(event) {
        try {
            setError('');
            toggleLoading(true);
            const result = await axios.get('http://localhost:3000/appointment');
            console.log(result.data);
        }
        catch(error) {
            console.error(error);
        }
        toggleLoading(false);
    }
    void fetchAppointments();
    }, []);

    return (
        <div>
            <h1>Maak hier een afspraak</h1>
            Afspraak:
            <select 
                name="appointment-subject" 
                id="subject"
                value={subjects}
                onChange={(event) => setSubjects(event.target.value)}
            >
                <option value="new-passport-id">
                    Passpoort/ID aanvragen
                </option>
                <option value="report-relocation">
                    Verhuizing doorgeven
                </option>
                <option value="apply-for-benefits">
                    Subsidie aanvragen
                </option>
                <option value="apply-for-surcharge">
                    Toeslagen aanvragen(woon, energie etc)
                </option>
                <option value="parking">
                    Parkeervergunning aanvragen
                </option>
            </select>
            <Calendar onChange={setDateState} value={dateState}/>
            <select
                name="appointment-date"
                id="date"
                value={dateState}
                onChange={changeDate}
            >
                <option value="dates">

                </option>

            </select>
                <button
                    type="submit">
                    Maak afspraak
                </button>

        </div>
    );
}

export default Appointment;
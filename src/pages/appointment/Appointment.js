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

    const handleChange = (e) => {
        const {value} = e.target;
        setSubjects ({
            subjects: "",
            time: ""
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subjects);
    }

    useEffect(()=> {
    async function fetchAppointments(event) {
        try {
            setError('');
            toggleLoading(true);
            const result = await axios.get('http://localhost:8081/appointments');
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
            <form onSubmit={handleSubmit}>
                  <label htmlFor="subject">
                      Product:
            <select className="product-selection"
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
                  </label>
                <label className="time-selection">
                    Time:
                    <input className="time" type="time"
                    name="time"
                    value={time}/>
                </label>
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
                <button className="button"
                    type="submit">
                    Maak afspraak
                </button>
        </form>
        </div>
    );
}

export default Appointment;
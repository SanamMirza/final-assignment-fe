import React from 'react';
import {Link} from "react-router-dom";
import './Paspoort.css';

function Paspoort() {
    return (
        <div className="passport-page">
            <h1>Paspoort aanvragen</h1>
            <p>Vraag een paspoort of identiteitskaart aan bij de gemeente waarin u woont.</p>
            <p>Bij de afspraak moet u zelf aanwezig zijn.</p>
                <p>Minderjarige kinderen moeten ook mee bij aanvragen en ophalen.</p>
                <p>U krijgt een bericht zodra uw reisdocument klaarligt om opgehaald te worden.</p>

            <h2>Kosten 2023</h2>
                <p>De kosten voor een Nederlands paspoort zijn:</p>
            <ul>
                <li><p>voor personen tot 18 jaar: € 58,85</p></li>
                <li><p>voor personen van 18 jaar en ouder: € 77,85</p></li>
            </ul>

                <p>De kosten voor een Nederlandse identiteitskaart zijn:</p>
            <ul>
                <li><p>voor personen tot 18 jaar: € 37,95</p></li>
                <li><p>voor personen van 18 jaar en ouder: € 70,35</p></li>
            </ul>


            <p>Wilt u met spoed een paspoort of identiteitskaart aanvragen?</p>
            <ul>
            <li><p>Dan betaalt u € 53,00 extra.</p></li>
            </ul>

            <p>Klik <Link to="/appointment">hier</Link> om een afspraak in te plannen.</p>
        </div>
    );
}

export default Paspoort;
import React from 'react';
import {Link} from "react-router-dom";

function Overzicht() {



    return (
        <div>
            <h1>Overzicht Producten en Diensten</h1>
            <h2>
                <ul>
                <li><Link to="/product/paspoort">Paspoort aanvragen</Link></li>
                    <li><Link to="/product/verhuizing">Verhuizing doorgeven</Link></li>
                    <li><Link to="/product/subsidie">Subsidie en toeslagen</Link></li>
                    <li><Link to="/product/parkeervergunning">Parkeervergunning aanvragen</Link></li>
                </ul>
            </h2>
        </div>
    );
}

export default Overzicht;
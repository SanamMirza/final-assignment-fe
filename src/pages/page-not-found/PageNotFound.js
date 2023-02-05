import React from 'react';
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h2>Oeps... Deze pagina bestaat niet</h2>
            <p>Ga terug naar de <Link to="/">homepage.</Link></p>
        </div>
    );
}

export default PageNotFound;

import React from 'react';
import './PopUp.css';

function PopUp({title, onClose}) {

    return (
        <div className="popup-message">
            <span className="popup-message-close" onClick={onClose}>
                x
            </span>
                  <h2 className="popup-message-title">{title}</h2>
        </div>
    )
}

export default PopUp;
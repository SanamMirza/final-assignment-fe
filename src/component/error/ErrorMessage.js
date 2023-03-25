import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({title, text, onClose}) {
    return (
        <div className="error-message">
            <span className="error-message-close" onClick={onClose}>
                x
            </span>
            <h2 className="error-message-title">{title}</h2>
            <h3 className="error-message-text">{text}</h3>
        </div>
    );
}

export default ErrorMessage;
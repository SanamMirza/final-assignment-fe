import React from 'react';
import './Button.css';

function Button({type, className, onClick, value, disabled, children}) {
    return (
        <button
        type={type}
        className={className}
        onClick={onClick}
        value={value}
        disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;
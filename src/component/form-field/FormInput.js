import React from 'react';
import './FormInput';

function FormInput({children, type, name, value, placeholder, clickHandler}) {
    return (
            <label htmlFor={name}>
                {children}
                <input
                    type={type}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={clickHandler}/>
            </label>
    );
}

export default FormInput;
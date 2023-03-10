import React from 'react';
import './FormInput';


function FormInput({inputLabel, type, inputId, placeholder, name, validationRules, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={type}
                    id={inputId}
                    name={name}
                    placeholder={placeholder}
                    {...register(inputId, validationRules)}/>
            </label>
            {errors[inputId] && <h6>{errors[inputId].message}</h6>}
        </>
    );
}

export default FormInput;
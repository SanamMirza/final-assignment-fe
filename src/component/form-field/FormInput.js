import React from 'react';
import './FormInput';


function FormInput({inputLabel, type, inputId, placeholder, name, validationRules, onChange, register, errors}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    type={type}
                    id={inputId}
                    placeholder={placeholder}
                    {...register(name, validationRules, onChange)}/>
            </label>
            {errors[inputId] && <h6>{errors[inputId].message}</h6>}
        </>
    );
}

export default FormInput;
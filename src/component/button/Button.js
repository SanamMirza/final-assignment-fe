import React from 'react';

function Button({children}) {
    return (
        <button
        type="submit"
        className="button"
        value="button"
        > {children}
        </button>
    );
}

export default Button;
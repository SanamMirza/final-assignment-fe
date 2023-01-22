import React, {createContext, useState} from 'react';

export const LanguageContext = createContext({});

function LanguageContext ({children}) {
    const [language, setLanguage] = useState('nl');

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;
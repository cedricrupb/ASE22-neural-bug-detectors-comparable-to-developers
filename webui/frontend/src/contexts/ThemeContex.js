import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkModeState] = useState(false);

    const toggleDarkMode = () => {
        setDarkModeState(prev => !prev);
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
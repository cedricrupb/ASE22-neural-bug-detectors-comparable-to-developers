import React, { createContext, useState } from 'react';

export const PageContext = createContext();

const PageContextProvider = ({ children }) => {
    const [heading, setHeadingState] = useState('');
    const [progress, setProgressState] = useState(0);
    const [progressVisible, setProgressVisibleState] = useState(true);

    const setHeading = (newHeading) => {
        setHeadingState(newHeading);
    };

    const setProgress = (newProgress) => {
        setProgressState(newProgress);
    };

    const setProgressVisible = (newProgressVisible) => {
        setProgressVisibleState(newProgressVisible);
    };

    return (
        <PageContext.Provider value={{ heading, setHeading, progress, setProgress, progressVisible, setProgressVisible }}>
            {children}
        </PageContext.Provider>
    );
};

export default PageContextProvider;
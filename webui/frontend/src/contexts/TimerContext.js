import React, { createContext } from 'react';
import { useTimer } from 'use-timer';

const timeLimit = 1200;
export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const { time, start, reset, status, advanceTime } = useTimer({
        endTime: timeLimit
    });

    const startTimer = (time) => {
        reset();
        start();
        if (time > timeLimit) {
            advanceTime(timeLimit);
        } else {
            advanceTime(time);
        }
    };

    const resetTimer = () => {
        reset();
    }

    return (
        <TimerContext.Provider value={{ startTimer, resetTimer, time, status }}>
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
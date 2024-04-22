// CurrentMonthContext.js
import React, { createContext, useContext, useState } from 'react';

const CurrentMonthContext = createContext();

export const useCurrentMonth = () => useContext(CurrentMonthContext);

export const CurrentMonthProvider = ({ children }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    return (
        <CurrentMonthContext.Provider value={{ currentMonth, setCurrentMonth }}>
            {children}
        </CurrentMonthContext.Provider>
    );
};
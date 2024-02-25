import React, { createContext, useContext, useState } from 'react';

const WorkoutsContext = createContext();

export const WorkoutsProvider = ({ children }) => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  return (
    <WorkoutsContext.Provider value={{ savedWorkouts, setSavedWorkouts }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export const useWorkouts = () => useContext(WorkoutsContext);
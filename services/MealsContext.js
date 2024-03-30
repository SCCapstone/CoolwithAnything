import React, { createContext, useContext, useState } from 'react';

const MealsContext = createContext();

export const MealsProvider = ({ children }) => {
  const [savedMeals, setSavedMeals] = useState([]);

  return (
    <MealsContext.Provider value={{ savedMeals, setSavedMeals }}>
      {children}
    </MealsContext.Provider>
  );
};

export const useMeals = () => useContext(MealsContext);
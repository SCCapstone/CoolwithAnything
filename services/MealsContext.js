import React, { createContext, useContext, useState } from 'react';

const MealsContext = createContext();

<<<<<<< HEAD
=======
export const useMeals = () => useContext(MealsContext);

>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a
export const MealsProvider = ({ children }) => {
  const [savedMeals, setSavedMeals] = useState([]);

  return (
    <MealsContext.Provider value={{ savedMeals, setSavedMeals }}>
      {children}
    </MealsContext.Provider>
  );
};
<<<<<<< HEAD

export const useMeals = () => useContext(MealsContext);
=======
>>>>>>> cf3c249a52852d8841d87cd23edbcb942b23a65a

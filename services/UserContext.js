// Desc: Context for user ID
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userID, setUserID] = useState(null);

  return (
    <UserContext.Provider value={{ userID, setUserID }}>
      {children}
    </UserContext.Provider>
  );
};

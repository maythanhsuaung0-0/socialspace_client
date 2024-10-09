// UserContext.tsx
"use client"
import React, { createContext, useState, useContext,useEffect } from 'react';
import http from '../app/http'
// Define the type for your user context
interface UserContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>({
  user: null,
  setUser: () => {},
});

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if(token){
        const userData = await http.post("/users/auth");
        console.log('userData',userData);
        setUser(userData.data.user);
      }
      else{
        console.log('no token');
      }
    }
    fetchUser();
}, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

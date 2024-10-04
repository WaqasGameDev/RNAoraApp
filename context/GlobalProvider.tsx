import { getCurrentUser } from "../lib/appwrite";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GlobalContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    user: any;
    SetUser: React.Dispatch<React.SetStateAction<any>>;
  }

  const GlobalContext = createContext<GlobalContextType | null>(null);

  export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
      throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
  };

interface GlobalProviderProps {
    children: ReactNode;
  }

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const[isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, SetUser] = useState<any>(null);
    const[isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        getCurrentUser()
        .then((currentUser)=>{
            if(currentUser){
                setIsLoggedIn(true);
                SetUser(null)
            }
            else{
                setIsLoggedIn(false);
                SetUser(currentUser)
            }
        })
        .catch((error)=>{
            console.error(error)
        })
        .finally(()=>{
            setIsLoading(false);
        })
    },[])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            isLoading,
            setIsLoading,
            user,
            SetUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
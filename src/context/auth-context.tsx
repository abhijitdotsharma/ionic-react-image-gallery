//create context
import React, { createContext, useContext, useState, ReactNode } from "react";

type Props = {
    children: ReactNode
}

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLocalStorage = (key: string, defaultValue: boolean) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const localStorageValue = localStorage.getItem(key);
            if(localStorageValue){
                return JSON.parse(localStorageValue)
            }else{
                localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch (error) {
            return defaultValue;
        }
    });

    const setValue = ( newValue: boolean) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue)
        } catch (error) {}
    };

    return [storedValue, setValue]
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const AuthProvider = ({children}: Props) => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage('not-unsplash', false)
    // if more details for user, object can be used,    
    // update useLocalStorage too
    // const [user, setUser] = useLocalStorage('', {.....})
    return(
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};
// AuthProvider used in index.tsx
// useAuth used when we need access to auth variables

